import { styles } from '../objects/styles'
export const saveToStorage = (newObject : {[key: string] : {isActive?: boolean, css?: string}}) => {
  // @ts-ignore
  browser.storage.local.set(newObject)
}

export const getFromStorage = () => {
  return browser.storage.local.get('styles')

export const populateSpecialStyles = (newStyles: {[key: string] : {isActive?: boolean, css?: string, undeleteable?: boolean, displayName?: string}}) => {
  if (!newStyles.___toggleAll) {
    newStyles.___toggleAll = styles.___toggleAll
  }
  newStyles.___toggleAll.undeleteable = true
  newStyles.___toggleAll.displayName = 'toggle all'
  if (!newStyles.__global) {
    newStyles.__global = styles.__global
  }
  newStyles.__global.undeleteable = true
  newStyles.__global.displayName = 'global styles'
  if (!newStyles._extension) {
    newStyles._extension = styles._extension
  }
  newStyles._extension.undeleteable = true
  newStyles._extension.displayName = 'extension styles'
  return newStyles
}
