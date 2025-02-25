global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      media: "",
      onchange: null,
      addListener: jest.fn(), // Устарело, но некоторые библиотеки могут использовать
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  };
