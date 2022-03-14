import { laziestGuard, mostPredictableGuard } from '../kata';
import { getInputData } from '../data/getInput';

describe('laziestGuard', () => {
  it('should return an object with two properties when passed an empty array: a key of guardId with an integer of 0 & a key of minuteAsleep with an integer of 0', () => {
    expect(laziestGuard([])).toEqual({
      guardId: 0,
      timeSlept: 0,
      mostSlept: 0
    });
  });
  it('should return the guardId for the guard who spends the most minutes asleep when passed data which is already ordered by time', () => {
    return getInputData('./data/exampleInput.txt').then((data) => {
      expect(laziestGuard(data)).toEqual(
        expect.objectContaining({ guardId: 10 })
      );
    });
  });
  it('should return the minutes slept for the guard who spends the most minutes asleep when passed data which is already ordered by time', () => {
    return getInputData('./data/exampleInput.txt').then((data) => {
      expect(laziestGuard(data)).toEqual(
        expect.objectContaining({ timeSlept: 50 })
      );
    });
  });
  it('should return the most common minute slept for the guard who spends the most minutes asleep when passed data which is already ordered by time', () => {
    return getInputData('./data/exampleInput.txt').then((data) => {
      expect(laziestGuard(data)).toEqual(
        expect.objectContaining({ mostSlept: 24 })
      );
    });
  });
  it('should continue to return the correct mostSlept, timeSlept & guardId properties when passed unordered data', () => {
    return getInputData('./data/input.txt').then((data) => {
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
    return getInputData('./data/input.txt').then((data) => {
      expect(mostPredictableGuard(data)).toEqual(
        expect.objectContaining({ mostSlept: [50, 19], guardId: 2137 })
      );
    });
  });
});

// # TODO: add tests for final solutions
