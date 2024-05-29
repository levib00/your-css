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

const fillInputs = async () => {
  const website: HTMLInputElement = (<HTMLInputElement>document.getElementById('website-input'));
  const isActive: HTMLInputElement = (<HTMLInputElement>document.getElementById('active-checkbox'));

  const temp = await browser.storage.local.get('temp');
  const storageObject = await temp.temp;

  if (storageObject) {
    website.value = await storageObject.displayName || storageObject.website;
    isActive.checked = await storageObject.isActive;
  }

  if (storageObject.undeleteable) {
    website.readOnly = true;
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
  const file: HTMLInputElement = (<HTMLInputElement>document.getElementById('file-input'));
  const website: HTMLInputElement = (<HTMLInputElement>document.getElementById('website-input'));
  const isActive: HTMLInputElement = (<HTMLInputElement>document.getElementById('active-checkbox'));

  const temp = await browser.storage.local.get('temp');
  const storageObject = await temp.temp;

  if (file && website && isActive && file.files) {
    const css = await file.files[0].text();
    const savedName = storageObject.undeleteable ? storageObject.website : website.value;
    let newListing;
    if (storageObject.undeleteable) {
      newListing = {
        [savedName]: {
          css: await storageObject.css.concat(css) || css,
          isActive: isActive.checked,
          undeleteable: storageObject.undeleteable,
          displayName: storageObject.displayName,
        },
      };
    } else {
      newListing = {
        [savedName]: {
          css: await storageObject.css.concat(css) || css,
          isActive: isActive.checked,
        },
      };
    }

    const existingData = await browser.storage.local.get('styles');
    const stylesObject = existingData.styles || {};
    const mergedObject = { ...stylesObject, ...newListing };

    browser.storage.local.set({ styles: mergedObject });

    closeForm();
  }
};

saveButton?.addEventListener('click', importButtonHandler);
cancelButton?.addEventListener('click', closeForm);

window.onload = pageLoad;
