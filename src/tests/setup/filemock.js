const mockStorageGet = jest.fn().mockResolvedValue({});
const mockStorageRemove = jest.fn();
const mockStorageSet = jest.fn();
const mockTabQuery = jest.fn().mockResolvedValue([{ url: 'https://example.com/' }]);
global.browser = {
  tabs: {
    query: mockTabQuery,
  },
  storage: {
    local: {
      get: mockStorageGet,
      remove: mockStorageRemove,
      set: mockStorageSet,
    },
  },
};
URL.revokeObjectURL = jest.fn();
