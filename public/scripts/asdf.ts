const checkDarkMode = async () => {
  if (await browser.storage.local.get('darkMode')) {
    const topContainer = document.getElementById('top-container');
    topContainer?.classList.add('dark-mode');
  }
};

const form = document.getElementById('import-form');
const saveButton = document.getElementById('save-button');

form?.addEventListener('submit', (e) => e.preventDefault());

const importCss = async () => {
  const file: HTMLInputElement = (<HTMLInputElement>document.getElementById('file-input'));
  const website: HTMLInputElement = (<HTMLInputElement>document.getElementById('website-input'));
  const isActive: HTMLInputElement = (<HTMLInputElement>document.getElementById('active-checkbox'));

  if (file && website && isActive && file.files) {
    const css = await file.files[0].text();
    const newListing = {
      [website.value]: {
        css,
        isActive: isActive.checked,
      },
    };

    const existingData = await browser.storage.local.get('styles');
    const stylesObject = existingData.styles || {};
    const mergedObject = { ...stylesObject, ...newListing };

    browser.storage.local.set({ styles: mergedObject });
  }
};

saveButton?.addEventListener('click', importCss);

window.onload = checkDarkMode;
