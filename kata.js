import { getInputData } from './getInput.js';
import { mode } from 'mathjs';
import { allowedNodeEnvironmentFlags } from 'process';

// #1 Find the guard that has the most minutes asleep & what minute that guard slept the most
export const laziestGuard = (guardList) => {
  if (guardList.length === 0) return { guardId: 0, timeSlept: 0, mostSlept: 0 };

  // sorting the input into time order:
  guardList.sort((a, b) => {
    const dateA = new Date(a.split(']')[0].substring(1));
    const dateB = new Date(b.split(']')[0].substring(1));

    return dateA - dateB;
  });

  // format the data into usable objects
  // declare an array to store the objects
  const guardShiftObjects = [];
  // declare an array to store arrays
  let guardId = 0;
  // loop through guardList
  guardList.forEach((shiftString, i) => {
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
    guardShiftObjects.forEach((guardObj, j) => {
      if (guardObj.guardId === guardId) {
        let type = '';
        // format date into usable form
        const formattedDate = shiftString.split(']')[0].substring(1);

        if (shiftString.match(/#\d/)) {
          type = 'start';
        } else if (shiftString.match(/asleep/g)) {
          type = 'sleeping';
        } else if (shiftString.match(/wakes/g)) {
          type = 'awake';
        }
        if (guardObj.hasOwnProperty('sleepingTimes')) {
          guardObj.sleepingTimes.push({ type, formattedDate });
        } else {
          guardObj.sleepingTimes = [{ type, formattedDate }];
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
    obj.sleepingTimes.forEach((timeObj) => {
      if (timeObj.type === 'sleeping') {
        timeStart = new Date(timeObj.formattedDate).getMinutes();
      } else if (timeObj.type === 'awake') {
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
        timeStart = '';
        timeStop = '';
      }
    });
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

// # Calculate the minute asleep * guardId
export const calculateAnswer = (guardObj) => {
  return guardObj.guardId * guardObj.mostSlept;
};

// Run File to see Answer
getInputData('./input.txt').then((data) => {
  console.log(calculateAnswer(laziestGuard(data)));
});
