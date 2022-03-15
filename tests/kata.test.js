import {
  findLaziestGuard,
  findMostPredictableGuard,
  createGuards,
  findFinalAnswer
} from '../kata';
import { getInputData } from '../utils.js';

describe('createGuards', () => {
  it('should return an array', () => {
    expect(createGuards([])).toEqual([]);
    expect(createGuards(0)).toEqual([]);
  });
  it('should return a formatted list of guards when passed a list of guards shifts ordered by time', () => {
    return getInputData('./data/exampleInput.txt').then((data) => {
      expect(createGuards(data)).toEqual(
        expect.arrayContaining([
          { guardId: 10, timeSlept: 50, mostSlept: [24, 2] }
        ])
      );
      expect(createGuards(data).length).toBe(2);
    });
  });
  it('should return a formatted list of guards when passed a list of guards shifts NOT ordered', () => {
    return getInputData('./data/input.txt').then((data) => {
      expect(createGuards(data)).toEqual(
        expect.arrayContaining([
          { guardId: 2399, timeSlept: 413, mostSlept: [33, 13] }
        ])
      );
      expect(createGuards(data).length).toBe(23);
    });
  });
});

describe('findLaziestGuard', () => {
  it('should return an object', () => {
    expect(findLaziestGuard([])).toEqual({});
    expect(findLaziestGuard(0)).toEqual({});
  });
  it('should return the guardId for the guard who spends the most minutes asleep', () => {
    return getInputData('./data/exampleInput.txt').then((data) => {
      const formattedData = createGuards(data);
      expect(findLaziestGuard(formattedData)).toEqual(
        expect.objectContaining({ guardId: 10 })
      );
    });
  });
  it('should return the minutes slept for the guard who spends the most minutes asleep', () => {
    return getInputData('./data/exampleInput.txt').then((data) => {
      const formattedData = createGuards(data);
      expect(findLaziestGuard(formattedData)).toEqual(
        expect.objectContaining({ timeSlept: 50 })
      );
    });
  });
  it('should return the most common minute slept for the guard who spends the most minutes asleep', () => {
    return getInputData('./data/exampleInput.txt').then((data) => {
      const formattedData = createGuards(data);
      expect(findLaziestGuard(formattedData)).toEqual(
        expect.objectContaining({ mostSlept: [24, 2] })
      );
    });
  });
});

describe('findMostPredictableGuard', () => {
  it('should return an object', () => {
    expect(findMostPredictableGuard([])).toEqual({});
    expect(findMostPredictableGuard(0)).toEqual({});
  });
  it('should return a guard object containing the guard id and an array showing the most common minute slept and the number of times slept for the guard who sleeps most often at a given minute', () => {
    return getInputData('./data/input.txt').then((data) => {
      const formattedData = createGuards(data);
      expect(findMostPredictableGuard(formattedData)).toEqual(
        expect.objectContaining({ mostSlept: [50, 19], guardId: 2137 })
      );
    });
  });
});

describe('findFinalAnswer', () => {
  it('should return the guard who slept the most on a key of laziest with values representing the guardID, minutesSlept and total Answer', () => {
    return findFinalAnswer().then((answer) => {
      expect(answer.laziest).toEqual({
        guardId: 1993,
        minutesSlept: 513,
        mostCommonSleep: [50, 19],
        totalAnswer: 71748
      });
    });
  });
  it('should return the guard who slept the most predictably on a key of mostPredictable with values representing the guardID, most common time slept & frequency and total Answer', () => {
    return findFinalAnswer().then((answer) => {
      expect(answer.mostPredictable).toEqual({
        guardId: 2137,
        mostCommonSleep: [50, 19],
        totalAnswer: 106850
      });
    });
  });
});
