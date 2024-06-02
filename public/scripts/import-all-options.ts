const checkDarkMode = async (): Promise<void> => {
  try {
    const { darkMode } = await browser.storage.local.get('darkMode');
    if (darkMode) {
      document.getElementById('top-container')?.classList.add('dark-mode');
    }
  } catch (error) {
    console.error('Error checking dark mode:', error);
  }
};

const closeForm = (): void => {
  window.close();
};

const form = document.getElementById('import-form');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

form?.addEventListener('submit', (e) => e.preventDefault());

const importAllButtonHandler = async (): Promise<void> => {
  try {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    const { styles } = await browser.storage.local.get('styles');
    const allStyles = styles || {};

    if (fileInput?.files?.length) {
      const json = await fileInput.files[0].text();
      if (!json) return;

      const parsedJSON = JSON.parse(json);
      const mergedStyles = { ...allStyles, ...parsedJSON };
      
      await browser.storage.local.set({ styles: mergedStyles });
      closeForm();
    }
  } catch (error) {
    console.error('Error importing styles:', error);
  }
};

saveButton?.addEventListener('click', importAllButtonHandler);
cancelButton?.addEventListener('click', closeForm);

window.onload = checkDarkMode;

export {};