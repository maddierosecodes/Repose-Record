import { calculateAnswer, mode, getInputData } from '../utils';

describe('getInput', () => {
  it('should return an array of strings of guard records', () => {
    return getInputData('./data/exampleInput.txt').then((data) => {
      expect(Array.isArray(data)).toBe(true);
      expect(data[0]).toBe('[1518-11-01 00:00] Guard #10 begins shift');
      expect(data.length).toBe(17);
    });
  });
});

describe('mode', () => {
  it('should return the most commonly occurring item from an array', () => {
    expect(mode([1, 1, 2, 3])[0]).toBe(1);
  });
  it('should return the count of most commonly occuring item in array', () => {
    expect(mode([1, 1, 2, 3])[1]).toBe(2);
  });
});

describe('calculateAnswer', () => {
  it('should return a number', () => {
    expect(typeof calculateAnswer({ guardId: 0, mostSlept: 0 })).toBe('number');
    expect(calculateAnswer(0, 0)).toBe(0);
  });
  it('should return the multiple of two numbers', () => {
    expect(calculateAnswer(12, 12)).toBe(144);
  });
});
