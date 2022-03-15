import { calculateAnswer, getInputData, mode } from './utils.js';

// Format guards one time for each puzzle solution
export const createGuards = (guardList) => {
  if (guardList.length === 0 || !Array.isArray(guardList)) return [];
  // format the data into usable objects
  const guardShiftObjects = [];
  let guardId = 0;
  guardList
    .sort((a, b) => {
      // sorting the input into time order:
      const dateA = new Date(a.split(']')[0].substring(1));
      const dateB = new Date(b.split(']')[0].substring(1));
      return dateA - dateB;
    })
    .forEach((shiftString, i) => {
      // find guard number, times asleep
      // if the string contains a guard number, set the current guard to this number
      if (shiftString.match(/#\d/g)) {
        guardId = Number(
          shiftString
            .split(' ')
            .filter((str) => str.match(/#\d/g))[0]
            .substring(1)
        );
        // if no guard object exists, create one
        if (
          guardShiftObjects.filter((guardObj) => guardObj.guardId === guardId)
            .length === 0
        ) {
          guardShiftObjects.push({ guardId });
        }
      }
      // Find the matching guard object for the current guard id, and add the times slept to a key on this object
      guardShiftObjects.forEach((guardObj) => {
        if (guardObj.guardId === guardId) {
          // Create a time object with date string & asleep flag
          const timeObj = {
            asleep: '',
            formattedDate: shiftString.split(']')[0].substring(1)
          };
          // add asleep flags, deal with erroneous data
          if (!shiftString.match(/#\d/) && shiftString.length > 0) {
            if (shiftString.match(/asleep/g)) {
              timeObj.asleep = true;
            } else if (shiftString.match(/wakes/g)) {
              timeObj.asleep = false;
            }
            // if the guard already has sleeping time, push the time object to array, otherwise create the array property
            if (guardObj.hasOwnProperty('sleepingTimes')) {
              guardObj.sleepingTimes.push(timeObj);
            } else {
              guardObj.sleepingTimes = [timeObj];
            }
          }
        }
      });
    });
  // map over each guard and replace the times slept with length of time slept and most common minutes slept/ frequency of most common properties
  const guardsSleepingInfo = guardShiftObjects.map((obj) => {
    const newObj = { guardId: obj.guardId, timeSlept: 0 };
    let timeStart = '';
    let timeStop = '';
    let allTimes = [];
    // loop through times slept objects
    if (obj.sleepingTimes) {
      obj.sleepingTimes.forEach((timeObj) => {
        if (timeObj.asleep) {
          timeStart = new Date(timeObj.formattedDate).getMinutes();
        } else {
          timeStop = new Date(timeObj.formattedDate).getMinutes();
        }
        // when we have both a start and end time
        if (timeStart !== '' && timeStop !== '') {
          // add all the times slept together and assign to key
          newObj.timeSlept += timeStop - timeStart;
          // add mins to array to find most common
          for (let i = timeStart; i < timeStop; i++) {
            allTimes.push(i);
          }
          // reset start/stop times
          timeStart = '';
          timeStop = '';
        }
      });
    }
    // Some guards don't sleep, so prevent empty array errors with ternary, use mode function to find the mode & frequency of mode for times slept
    allTimes.length > 0
      ? (newObj.mostSlept = mode(allTimes))
      : (newObj.mostSlept = [0, 0]);
    // return updated guard object
    return newObj;
  });

  return guardsSleepingInfo;
};

// Calculate which guard slept the longest
export const findLaziestGuard = (guardsSleepingInfo) => {
  if (guardsSleepingInfo.length === 0 || !Array.isArray(guardsSleepingInfo))
    return {};
  // compare guard a to guard b, and return the guard with the largest timeSlept value to become the next a until all guards have been checked
  return guardsSleepingInfo.reduce((a, b) => {
    return a.timeSlept > b.timeSlept ? a : b;
  });
};

// Calculate which guard slept the most often at a specific time
export const findMostPredictableGuard = (guardsSleepingInfo) => {
  if (guardsSleepingInfo.length === 0 || !Array.isArray(guardsSleepingInfo))
    return {};
  // compare guard a to guard b, and return the guard with the largest frequency of most common time slept value to become the next a until all guards have been checked
  return guardsSleepingInfo.reduce((a, b) => {
    return a.mostSlept[1] > b.mostSlept[1] ? a : b;
  });
};

// Multiply the guard ID by the most common minute slept, return as nicely readable objects
export const findFinalAnswer = () => {
  return getInputData('./data/input.txt').then((data) => {
    const guardsSleepingInfo = createGuards(data);
    const solution1 = findLaziestGuard(guardsSleepingInfo);
    const solution2 = findMostPredictableGuard(guardsSleepingInfo);
    const answer = {
      laziest: {
        guardId: solution1.guardId,
        minutesSlept: solution1.timeSlept,
        mostCommonSleep: solution2.mostSlept,
        totalAnswer: calculateAnswer(solution1.guardId, solution1.mostSlept[0])
      },
      mostPredictable: {
        guardId: solution2.guardId,
        mostCommonSleep: solution2.mostSlept,
        totalAnswer: calculateAnswer(solution2.guardId, solution2.mostSlept[0])
      }
    };
    return answer;
  });
};

// Run file with node to see puzzle answers
findFinalAnswer().then((answer) => console.log(answer));
