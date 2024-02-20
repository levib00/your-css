
import { getStyleValue } from '../../public/scripts/your-css'

describe("your-css style", () => {

  const stylesMock = {
    domain1: {
      active: true,
      styles: 'css'
    },
    domain2: {
      active: false,
      styles: 'css'
    }
  }

  test('Active style returns css', () => {
    const mock111 = getStyleValue(stylesMock.domain1)
    expect(mock111).toBe('css')
  });
  test('Inactive style returns null', () => {
    const mock111 = getStyleValue(stylesMock.domain2)
    expect(mock111).toBeNull()
  });

})