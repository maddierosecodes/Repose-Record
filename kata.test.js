import { laziestGuard, calculateAnswer } from './kata';
import { getInputData } from './getInput';
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
  it.only('should continue to return the above three properties when passed unordered data', () => {
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

describe('calculateAnswer', () => {
  it('should return a number', () => {
    expect(typeof calculateAnswer({ guardId: 0, minuteAsleep: 0 })).toBe(
      'number'
    );
    expect(calculateAnswer({ guardId: 0, minuteAsleep: 0 })).toBe(0);
  });
  it('should return the number of minutes asleep * the guard id', () => {
    return getInputData('./example.js').then((data) => {
      expect(calculateAnswer(data)).toBe(240);
    });
  });
});
