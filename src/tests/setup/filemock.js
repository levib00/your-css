const mockStorageGet = jest.fn().mockResolvedValue({});
const mockStorageRemove = jest.fn();
global.browser = {
  tabs: {
    query: jest.fn(),
  },
  storage: {
    local: {
      get: mockStorageGet,
      remove: mockStorageRemove,
    },
  },
};
