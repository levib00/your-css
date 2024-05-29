// @ts-nocheck
const checkDarkMode = async () => {
  const darkmodeObject = await browser.storage.local.get('darkMode');
  if (await darkmodeObject.darkMode) {
    const topContainer = document.getElementById('top-container');
    topContainer?.classList.add('dark-mode');
  }
};

const closeForm = () => {
  window.close();
};

const form = document.getElementById('import-form');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

form?.addEventListener('submit', (e) => e.preventDefault());

async function importAllButtonHandler() {
  const file: HTMLInputElement = (<HTMLInputElement>document.getElementById('file-input'));
  const allStyles = await browser.storage.local.get('styles');
  if (file && file.files) {
    const json = await file?.files[0].text();
    if (!json) {
      return '';
    }
    const parsedJSON = JSON.parse(json);

    browser.storage.local.set({ styles: { ...parsedJSON, ...allStyles.styles } });

    return closeForm();
  }
  return null;
}

saveButton?.addEventListener('click', importAllButtonHandler);
cancelButton?.addEventListener('click', closeForm);

window.onload = checkDarkMode;
