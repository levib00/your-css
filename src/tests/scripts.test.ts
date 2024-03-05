import { getStyleValue } from '../../public/scripts/your-css'
import { setStyles, styles } from '../objects/styles';
import { assembleCssForExport, parseCssFile, parseJsonFile } from '../scripts/import-export-css';

describe("your-css style", () => {

  const stylesMock = {
    domain1: {
      isActive: true,
      css: 'css'
    },
    domain2: {
      isActive: false,
      css: 'css'
    },
    _toggleAll: {
      isActive: true,
      css: ''
    },
    _global: {
      isActive: false,
      css: 'global'
    }
  }

  beforeEach(() => {
    setStyles(stylesMock)
  })

  test('Active style returns css', () => {
    const mock111 = getStyleValue(stylesMock.domain1)
    expect(mock111).toBe('css')
  });

  test('Inactive style returns null', () => {
    const mock111 = getStyleValue(stylesMock.domain2)
    expect(mock111).toBe('')
  });

  test('allStyles inactive returns null', () => {
    const stylesMockNotActive = {
      domain1: {
        isActive: true,
        css: 'css'
      },
      domain2: {
        isActive: false,
        css: 'css'
      },
      _toggleAll: {
        isActive: false,
        css: ''
      }
    }

    setStyles(stylesMockNotActive)
    const mock111 = getStyleValue(stylesMock.domain1)
    expect(mock111).toBe('')
  });

  test('returns global styles and domain style', () => {
    const stylesMockGlobal = {
      domain1: {
        isActive: true,
        css: 'css'
      },
      domain2: {
        isActive: false,
        css: 'css'
      },
      _toggleAll: {
        isActive: true,
        css: ''
      },
      _global: {
        isActive: true,
        css: 'global'
      }
    }

    setStyles(stylesMockGlobal)
    const mock111 = getStyleValue(stylesMock.domain1)
    expect(mock111).toBe('globalcss')
  });

  test('returns global styles without domain if domain is inactive', () => {
    const stylesMockGlobal = {
      domain1: {
        isActive: true,
        css: 'css'
      },
      domain2: {
        isActive: false,
        css: 'css'
      },
      _toggleAll: {
        isActive: true,
        css: ''
      },
      _global: {
        isActive: true,
        css: 'global'
      }
    }

    setStyles(stylesMockGlobal)
    const mock111 = getStyleValue(stylesMock.domain2)
    expect(mock111).toBe('global')
  });
})

describe('Import/export css', () => {
  test('css url is created if object is passed', () => {
    const stylesMockGlobal = {
      domain1: {
        isActive: true,
        css: 'css'
      },
      domain2: {
        isActive: false,
        css: 'css'
      },
      _toggleAll: {
        isActive: true,
        css: ''
      },
      _global: {
        isActive: true,
        css: 'global'
      }
    }

    setStyles(stylesMockGlobal)
    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(assembleCssForExport( styles, null)).toBe('url')
  })

  test('css url is created if css string is passed', () => {
    const stylesMockGlobal = {
      domain1: {
        isActive: true,
        css: 'css'
      },
      domain2: {
        isActive: false,
        css: 'css'
      },
      _toggleAll: {
        isActive: true,
        css: ''
      },
      _global: {
        isActive: true,
        css: 'global'
      }
    }

    setStyles(stylesMockGlobal)
    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(assembleCssForExport( null, 'css')).toBe('url')
  })

  test('no url is created if no css or object is given', () => {
    const stylesMockGlobal = {
      domain1: {
        isActive: true,
        css: 'css'
      },
      domain2: {
        isActive: false,
        css: 'css'
      },
      _toggleAll: {
        isActive: true,
        css: ''
      },
      _global: {
        isActive: true,
        css: 'global'
      }
    }

    setStyles(stylesMockGlobal)
    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(assembleCssForExport( null, null)).toBeFalsy()
  })

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
      stream: jest.fn()
    }

    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(await parseCssFile(fileMock)).toBe('css')
  })

  test('parse css returns undefined if not passed a file', async () => {
    expect(await parseCssFile(undefined)).toBeFalsy()
  })

  test('css is parsed if file is passed', async () => {

    const jsonMock = '{ "test": {"domain": "data","isActive": true}, "test2": {"domain2": "data2", "isActive": true}}'

    const fileMock = {
      text: jest.fn(async () => jsonMock),
      lastModified: 0,
      name: '',
      webkitRelativePath: '',
      size: 0,
      type: '',
      arrayBuffer: jest.fn(),
      slice: jest.fn(),
      stream: jest.fn()
    }

    const stylesMockGlobal = {
      domain1: {
        isActive: true,
        css: 'css'
      },
      domain2: {
        isActive: false,
        css: 'css'
      },
      _toggleAll: {
        isActive: true,
        css: ''
      },
      _global: {
        isActive: true,
        css: 'global'
      }
    }

    

    setStyles(stylesMockGlobal)

    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(await parseJsonFile(fileMock, styles)).toStrictEqual({
      domain1: {
        isActive: true,
        css: 'css'
      },
      domain2: {
        isActive: false,
        css: 'css'
      },
      _toggleAll: {
        isActive: true,
        css: ''
      },
      _global: {
        isActive: true,
        css: 'global'
      },
      test: {
        domain: "data",
        isActive: true
      },
      test2: {
        domain2:"data2",
        isActive: true
      }
    })
  })

  test('parse json returns undefined if not passed a file', async () => {
    expect(await parseJsonFile(undefined, styles)).toBeFalsy()
  })
})
