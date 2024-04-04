export interface IStyle {
  [key: string] : {
    isActive?: boolean,
    css?: string
    undeleteable?: boolean
    displayName?: string
  }
}

export const defaultStyles: IStyle = {
  ___toggleAll: {
    isActive: true,
    css: '',
    undeleteable: true,
    displayName: 'toggle all',
  },
  __global: {
    isActive: false,
    css: '',
    undeleteable: true,
    displayName: 'global styles',
  },
  _extension: {
    isActive: false,
    css: '',
    undeleteable: true,
    displayName: 'extension styles',
  },
};
