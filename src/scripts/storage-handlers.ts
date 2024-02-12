// @ts-nocheck
export const saveToStorage = (newObject : {[key: string] : string}) => {
  browser.storage.local.set(newObject)
}

export const getFromStorage = () => {
  return browser.storage.local.get('styles')
}
