const checkDarkMode = async () => {
  try {
    const { darkMode } = await browser.storage.local.get('darkMode');
    if (darkMode) {
      const topContainer = document.getElementById('top-container');
      topContainer?.classList.add('dark-mode');
    }
  } catch (error) {
    console.error('Error checking dark mode:', error);
  }
};

const closeForm = () => {
  window.close();
};

const fillInputs = async () => {
  try {
    const website = document.getElementById('website-input') as HTMLInputElement;
    const isActive = document.getElementById('active-checkbox') as HTMLInputElement;

    const { temp } = await browser.storage.local.get('temp');
    if (temp) {
      website.value = temp.displayName || temp.website;
      isActive.checked = temp.isActive;

      if (temp.undeleteable) {
        website.readOnly = true;
      }
    }
  } catch (error) {
    console.error('Error filling inputs:', error);
  }
};

const pageLoad = () => {
  checkDarkMode();
  fillInputs();
};

const form = document.getElementById('import-form');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

form?.addEventListener('submit', (e) => e.preventDefault());

const importButtonHandler = async () => {
  try {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    const websiteInput = document.getElementById('website-input') as HTMLInputElement;
    const isActiveInput = document.getElementById('active-checkbox') as HTMLInputElement;

    const { temp } = await browser.storage.local.get('temp');
    if (!fileInput.files?.length || !temp) return;

    const css = await fileInput.files[0].text();
    const savedName = temp.undeleteable ? temp.website : websiteInput.value;

    const newListing: { [key: string]: { css: string; isActive: boolean; undeleteable?: boolean; displayName?: string } } = {
      [savedName]: {
        css: temp.css ? temp.css.concat(css) : css,
        isActive: isActiveInput.checked,
        ...(temp.undeleteable && { undeleteable: temp.undeleteable, displayName: temp.displayName }),
      },
    };

    const { styles } = await browser.storage.local.get('styles');
    const stylesObject = styles || {};
    const mergedObject = { ...stylesObject, ...newListing };

    await browser.storage.local.set({ styles: mergedObject });

    closeForm();
  } catch (error) {
    console.error('Error handling import button click:', error);
  }
};

saveButton?.addEventListener('click', importButtonHandler);
cancelButton?.addEventListener('click', closeForm);

window.onload = pageLoad;

export {};
