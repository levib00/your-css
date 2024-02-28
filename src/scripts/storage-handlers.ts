// @ts-nocheck
export const saveToStorage = (newObject : {[key: string] : {isActive?: boolean, css?: string}}) => {
  browser.storage.local.set(newObject)
}

export const getFromStorage = () => {
  return browser.storage.local.get('styles')
}
