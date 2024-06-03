(() => {
  const getFromStorage = async (domain: string | undefined) => {
    try {
      const { styles } = await browser.storage.local.get('styles');
      if (!styles) return {};

      const domainStyles = domain ? styles[domain] : undefined;
      const toggleAllStyles = styles.___toggleAll;
      const globalStyles = styles.__global;

      return { domain: domainStyles, ___toggleAll: toggleAllStyles, __global: globalStyles };
    } catch (error) {
      console.error('Error getting styles from storage:', error);
      return {};
    }
  };

  const createStyleElement = (css: string): HTMLStyleElement => {
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(css));
    return styleElement;
  };

  const getStyleValue = (styles: {
    domain?: { isActive?: boolean, css?: string },
    ___toggleAll?: { isActive?: boolean, css?: string },
    __global?: { isActive?: boolean, css?: string },
  }): string => {
    if (!styles) return '';

    const { domain: domainStyles, ___toggleAll: toggleAllStyles, __global: globalStyles } = styles;
    let css = '';

    if ((!domainStyles?.isActive && !globalStyles?.isActive) || (toggleAllStyles && !toggleAllStyles.isActive)) {
      return '';
    }

    if (globalStyles?.isActive && globalStyles.css) {
      css += globalStyles.css;
    }

    if (domainStyles?.isActive && domainStyles.css) {
      css += domainStyles.css;
    }

    return css;
  };

  (async () => {
    const url = new URL(window.location.href);
    const domain = url.hostname;

    try {
      const stylesFromStorage = await getFromStorage(domain);
      const css = getStyleValue(stylesFromStorage);

      const styleElement = createStyleElement(css);
      document.head.appendChild(styleElement);
    } catch (error) {
      console.error('Error initializing styles:', error);
    }
  })();
})();