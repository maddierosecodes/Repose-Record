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
    expect(laziestGuard([])).toEqual({ guardId: 0, minuteAsleep: 0 });
  });
  it('should return the guardId for the guard who spends the most minutes asleep when passed data which is already ordered by time', () => {
    return getInputData('./exampleInput.txt').then((data) => {
      expect(laziestGuard(data)).toEqual(
        expect.objectContaining({ guardId: 10 })
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
  it.skip('should return the number of minutes asleep * the guard id', () => {
    return getInputData('./example.js').then((data) => {
      expect(calculateAnswer(data)).toBe('?');
    });
  });
});
