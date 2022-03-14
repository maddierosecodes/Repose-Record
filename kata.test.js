import { laziestGuard, mostPredictableGuard } from './kata';
import { getInputData } from './getInput';
import { calculateAnswer, mode, calculateAnswer2 } from './utils';
import { expect } from '@jest/globals';

describe('getInput', () => {
  it('should return an array of strings of guard records', () => {
    return getInputData('./exampleInput.txt').then((data) => {
      expect(Array.isArray(data)).toBe(true);
      expect(data[0]).toBe('[1518-11-01 00:00] Guard #10 begins shift');
      expect(data.length).toBe(17);
    });
  });
});

describe('calculateAnswer', () => {
  it('should return a number', () => {
    expect(typeof calculateAnswer({ guardId: 0, mostSlept: 0 })).toBe('number');
    expect(calculateAnswer({ guardId: 0, mostSlept: 0 })).toBe(0);
  });
  it('should return the number of minutes asleep * the guard id', () => {
    return getInputData('./exampleInput.txt').then((data) => {
      expect(calculateAnswer(laziestGuard(data))).toBe(240);
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
    expect(typeof calculateAnswer2({ guardId: 0, mostSlept: 0 })).toBe(
      'number'
    );
    expect(calculateAnswer2({ guardId: 0, mostSlept: [0, 0] })).toBe(0);
  });
  it('should return the number of minutes asleep * the guard id', () => {
    return getInputData('./exampleInput.txt').then((data) => {
      expect(calculateAnswer2(mostPredictableGuard(data))).toBe(4455);
    });
  });
});

describe('laziestGuard', () => {
  it('should return an object with two properties when passed an empty array: a key of guardId with an integer of 0 & a key of minuteAsleep with an integer of 0', () => {
    expect(laziestGuard([])).toEqual({
      guardId: 0,
      timeSlept: 0,
      mostSlept: 0
    });
  });
  it('should return the guardId for the guard who spends the most minutes asleep when passed data which is already ordered by time', () => {
    return getInputData('./exampleInput.txt').then((data) => {
      expect(laziestGuard(data)).toEqual(
        expect.objectContaining({ guardId: 10 })
      );
    });
  });
  it('should return the minutes slept for the guard who spends the most minutes asleep when passed data which is already ordered by time', () => {
    return getInputData('./exampleInput.txt').then((data) => {
      expect(laziestGuard(data)).toEqual(
        expect.objectContaining({ timeSlept: 50 })
      );
    });
  });
  it('should return the most common minute slept for the guard who spends the most minutes asleep when passed data which is already ordered by time', () => {
    return getInputData('./exampleInput.txt').then((data) => {
      expect(laziestGuard(data)).toEqual(
        expect.objectContaining({ mostSlept: 24 })
      );
    });
  });
  it('should continue to return the correct mostSlept, timeSlept & guardId properties when passed unordered data', () => {
    return getInputData('./input.txt').then((data) => {
      expect(laziestGuard(data)).toEqual(
        expect.objectContaining({
          mostSlept: 36,
          timeSlept: 513,
          guardId: 1993
        })
      );
    });
  });
});

describe('mostPredictableGuard', () => {
  it('should return a guard object containing the guard id and an array showing the most common minute slept and the number of times slept', () => {
    return getInputData('./input.txt').then((data) => {
      expect(mostPredictableGuard(data)).toEqual(
        expect.objectContaining({ mostSlept: [50, 19], guardId: 2137 })
      );
    });
  });
});
