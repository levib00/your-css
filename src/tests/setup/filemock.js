const mockStorageGet = jest.fn().mockResolvedValue({ key: 'mockedValue' });
const mockStorageRemove = jest.fn()
global.browser = {
  storage: {
    local: {
      get: mockStorageGet,
      remove: mockStorageRemove
    }
  }
};