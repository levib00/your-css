
import { getStyleValue } from '../../public/scripts/your-css'
import { setStyles } from '../objects/styles';

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
      isActive: false,
      css: ''
    }
  }

  beforeEach(() => {
    setStyles(stylesMock)
  })

  test('Active style returns css', () => {
    const stylesMockIsActive = {
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
      }
    }

    setStyles(stylesMockIsActive)
    const mock111 = getStyleValue(stylesMock.domain1)
    expect(mock111).toBe('css')
  });

  test('Inactive style returns null', () => {
    const mock111 = getStyleValue(stylesMock.domain2)
    expect(mock111).toBeNull()
  });

  test('Inactive style returns null', () => {
    const mock111 = getStyleValue(stylesMock.domain1)
    expect(mock111).toBeNull()
  });
})