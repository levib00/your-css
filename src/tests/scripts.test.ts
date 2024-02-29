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