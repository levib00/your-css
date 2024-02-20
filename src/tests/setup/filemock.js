const mockStorageGet = jest.fn().mockResolvedValue({ key: 'mockedValue' });
global.browser = {
  storage: {
    local: {
      get: mockStorageGet
    }
  }
};