function sampleForEach(items: number[], callback: (a: number) => number) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

test('mock callback', () => {
  const mockCallback = jest.fn((x) => 42 + x);
  sampleForEach([0, 1], mockCallback);

  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

test('mock return values', () => {
  const filterTestFn = jest.fn();

  // Make the mock return `true` for the first call,
  // and `false` for the second call
  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

  const result = [11, 12].filter((num) => filterTestFn(num));
  expect(result).toEqual([11]);

  expect(filterTestFn.mock.calls[0][0]).toBe(11); // 11
  expect(filterTestFn.mock.calls[1][0]).toBe(12); // 12

  // The mock function was called at least once
  expect(filterTestFn).toHaveBeenCalled();

  // The mock function was called at least once with the specified args
  expect(filterTestFn).toHaveBeenCalledWith(11);

  // The last call to the mock function was called with the specified args
  expect(filterTestFn).toHaveBeenLastCalledWith(12);

  // All calls and the name of the mock is written as a snapshot
  expect(filterTestFn).toMatchSnapshot();
});

test('mock complex function return', () => {
  const myMockFn = jest
    .fn(() => 'default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call')
    .mockName('complex return');

  expect(myMockFn()).toBe('first call');
  expect(myMockFn()).toBe('second call');
  expect(myMockFn()).toBe('default');
});
