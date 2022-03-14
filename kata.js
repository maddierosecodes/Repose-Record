import { getInputData } from './getInput.js';
import { calculateAnswer, calculateAnswer2, mode } from './utils.js';

// #1 Find the guard that has the most minutes asleep & what minute that guard slept the most
export const laziestGuard = (guardList) => {
  if (guardList.length === 0) return { guardId: 0, timeSlept: 0, mostSlept: 0 };
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
      // if the string contains a guard number, set the current guard to this number & if no guard object exists, create one
      if (shiftString.match(/#\d/g)) {
        guardId = Number(
          shiftString
            .split(' ')
            .filter((str) => str.match(/#\d/g))[0]
            .substring(1)
        );
        if (
          guardShiftObjects.filter((guardObj) => guardObj.guardId === guardId)
            .length === 0
        ) {
          guardShiftObjects.push({ guardId });
        }
      }
      // Find the matching guard object for this guard id, and add the times slept to a key on this object
      guardShiftObjects.forEach((guardObj) => {
        if (guardObj.guardId === guardId) {
          let asleep = '';
          // format date into usable form
          const formattedDate = shiftString.split(']')[0].substring(1);
          // add sleeping flags
          if (!shiftString.match(/#\d/) && shiftString.length > 0) {
            if (shiftString.match(/asleep/g)) {
              asleep = true;
            } else if (shiftString.match(/wakes/g)) {
              asleep = false;
            }
            if (guardObj.hasOwnProperty('sleepingTimes')) {
              guardObj.sleepingTimes.push({ asleep, formattedDate });
            } else {
              guardObj.sleepingTimes = [{ asleep, formattedDate }];
            }
          }
        }
      });
    });
  // map over each guard and replace the times slept with length of time slept and most common minutes slept properties
  const guardsSleepingInfo = guardShiftObjects.map((obj) => {
    const newObj = {};
    newObj.guardId = obj.guardId;
    newObj.timeSlept = 0;
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
    allTimes.length > 0
      ? (newObj.mostSlept = mode(allTimes)[0])
      : (newObj.mostSlept = 0);
    // return new obj
    return newObj;
  });
  // calculate which guard has been asleep longest
  return guardsSleepingInfo.reduce((a, b) => {
    return a.timeSlept > b.timeSlept ? a : b;
  });
};

// #2 Find the guard that has the most commonly occurring minute asleep
export const mostPredictableGuard = (guardList) => {
  if (guardList.length === 0) return { guardId: 0, timeSlept: 0, mostSlept: 0 };
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
      // if the string contains a guard number, set the current guard to this number & if no guard object exists, create one
      if (shiftString.match(/#\d/g)) {
        guardId = Number(
          shiftString
            .split(' ')
            .filter((str) => str.match(/#\d/g))[0]
            .substring(1)
        );
        if (
          guardShiftObjects.filter((guardObj) => guardObj.guardId === guardId)
            .length === 0
        ) {
          guardShiftObjects.push({ guardId });
        }
      }
      // Find the matching guard object for this guard id, and add the times slept to a key on this object
      guardShiftObjects.forEach((guardObj) => {
        if (guardObj.guardId === guardId) {
          let asleep = '';
          // format date into usable form
          const formattedDate = shiftString.split(']')[0].substring(1);
          // add sleeping flags
          if (!shiftString.match(/#\d/) && shiftString.length > 0) {
            if (shiftString.match(/asleep/g)) {
              asleep = true;
            } else if (shiftString.match(/wakes/g)) {
              asleep = false;
            }
            if (guardObj.hasOwnProperty('sleepingTimes')) {
              guardObj.sleepingTimes.push({ asleep, formattedDate });
            } else {
              guardObj.sleepingTimes = [{ asleep, formattedDate }];
            }
          }
        }
      });
    });
  // map over each guard and replace the times slept with length of time slept and most common minutes slept properties
  const guardsSleepingInfo = guardShiftObjects.map((obj) => {
    const newObj = {};
    newObj.guardId = obj.guardId;
    newObj.timeSlept = 0;
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
    allTimes.length > 0
      ? (newObj.mostSlept = mode(allTimes))
      : (newObj.mostSlept = [0, 0]);
    // return new obj
    return newObj;
  });
  // calculate which guard sleeps most often at a particular time
  return guardsSleepingInfo.reduce((a, b) => {
    return a.mostSlept[1] > b.mostSlept[1] ? a : b;
  });
};

// Run File to see Answers
getInputData('./input.txt').then((data) => {
  console.log(calculateAnswer(laziestGuard(data)), 'answer 1');
  console.log(calculateAnswer2(mostPredictableGuard(data), 'answer 2'));
});
