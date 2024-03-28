// import { getStyleValue } from '../public/scripts/your-css'
import { setStyles, styles } from '../objects/styles';
import { assembleCssForExport, parseCssFile, parseJsonFile } from '../scripts/import-export-css';

describe('Import/export css', () => {
  test('css url is created if object is passed', () => {
    const stylesMockGlobal = {
      domain1: {
        isActive: true,
        css: 'css',
      },
      domain2: {
        isActive: false,
        css: 'css',
      },
      ___toggleAll: {
        isActive: true,
        css: '',
      },
      __global: {
        isActive: true,
        css: 'global',
      },
    };

    setStyles(stylesMockGlobal);
    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(assembleCssForExport(styles, null)).toBe('url');
  });

  test('css url is created if css string is passed', () => {
    const stylesMockGlobal = {
      domain1: {
        isActive: true,
        css: 'css',
      },
      domain2: {
        isActive: false,
        css: 'css',
      },
      ___toggleAll: {
        isActive: true,
        css: '',
      },
      __global: {
        isActive: true,
        css: 'global',
      },
    };

    setStyles(stylesMockGlobal);
    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(assembleCssForExport(null, 'css')).toBe('url');
  });

  test('no url is created if no css or object is given', () => {
    const stylesMockGlobal = {
      domain1: {
        isActive: true,
        css: 'css',
      },
      domain2: {
        isActive: false,
        css: 'css',
      },
      ___toggleAll: {
        isActive: true,
        css: '',
      },
      __global: {
        isActive: true,
        css: 'global',
      },
    };

    setStyles(stylesMockGlobal);
    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(assembleCssForExport(null, null)).toBeFalsy();
  });

  test('css is parsed if file is passed', async () => {
    const fileMock = {
      text: jest.fn(async () => 'css'),
      lastModified: 0,
      name: '',
      webkitRelativePath: '',
      size: 0,
      type: '',
      arrayBuffer: jest.fn(),
      slice: jest.fn(),
      stream: jest.fn(),
    };

    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(await parseCssFile(fileMock)).toBe('css');
  });

  test('parse css returns undefined if not passed a file', async () => {
    expect(await parseCssFile(undefined)).toBeFalsy();
  });

  test('css is parsed if file is passed', async () => {
    const jsonMock = `{
      "test": {
        "domain": "data",
        "isActive": true
      },
      "test2": {
        "domain2": "data2",
        "isActive": true
      },
      "___toggleAll":{
        "isActive":true,
        "css":"",
        "undeleteable":true,
        "displayName":"toggle all"
      },
      "__global":{
        "isActive":false,
        "css":"global",
        "undeleteable":true,
        "displayName":"global styles"
      },
      "_extension":{
        "isActive":false,
        "css":"",
        "undeleteable":true,
        "displayName":"extension styles"
      }
    }`;

    const fileMock = {
      text: jest.fn(async () => jsonMock),
      lastModified: 0,
      name: '',
      webkitRelativePath: '',
      size: 0,
      type: '',
      arrayBuffer: jest.fn(),
      slice: jest.fn(),
      stream: jest.fn(),
    };

    const stylesMockGlobal = {
      domain1: {
        isActive: true,
        css: 'css',
      },
      domain2: {
        isActive: false,
        css: 'css',
      },
      ___toggleAll: {
        isActive: true,
        css: '',
        undeleteable: true,
        displayName: 'toggle all',
      },
      __global: {
        isActive: true,
        css: 'global',
        undeleteable: true,
        displayName: 'global styles',
      },
      _extension: {
        isActive: false,
        css: '',
        undeleteable: true,
        displayName: 'extension styles',
      },
    };

    setStyles(stylesMockGlobal);

    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(await parseJsonFile(fileMock, styles)).toStrictEqual({
      domain1: {
        isActive: true,
        css: 'css',
      },
      domain2: {
        isActive: false,
        css: 'css',
      },
      ___toggleAll: {
        isActive: true,
        css: '',
        displayName: 'toggle all',
        undeleteable: true,
      },
      __global: {
        isActive: true,
        css: 'global',
        displayName: 'global styles',
        undeleteable: true,
      },
      _extension: {
        isActive: false,
        css: '',
        undeleteable: true,
        displayName: 'extension styles',
      },
      test: {
        domain: 'data',
        isActive: true,
      },
      test2: {
        domain2: 'data2',
        isActive: true,
      },
    });
  });

  test('parse json returns undefined if not passed a file', async () => {
    expect(await parseJsonFile(undefined, styles)).toBeFalsy();
  });
});
