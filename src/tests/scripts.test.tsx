
import { getStyleValue } from '../../public/scripts/your-css'

describe("your-css style", () => {

  const stylesMock = {
    domain1: {
      isActive: true,
      css: 'css'
    },
    domain2: {
      isActive: false,
      css: 'css'
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