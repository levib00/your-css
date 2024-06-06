import { defaultStyles } from '../objects/styles';
import { assembleCssForExport } from '../scripts/import-export-css';

describe('Import/export css', () => {
  test('css url is created if object is passed', () => {
    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(assembleCssForExport(defaultStyles, null)).toBe('url');
  });

  test('css url is created if css string is passed', () => {
    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(assembleCssForExport(null, 'css')).toBe('url');
  });

  test('no url is created if no css or object is given', () => {
    global.URL.createObjectURL = jest.fn(() => 'url');
    expect(assembleCssForExport(null, null)).toBeFalsy();
  });
});
