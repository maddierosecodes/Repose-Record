import { inputData } from './getInput';

// #1 Find the guard that has the most minutes asleep & what minute that guard slept the most
export const laziestGuard = (guardList) => {
  // declare an output Obj
  const outputObj = { guardId: 0, minuteAsleep: 0 };
  // format the data into usable objects

  // calculate which guard has been asleep longest
  // assign guard to output Obj
  // return output Obj
  return outputObj;
};

// # Calculate the minute asleep * guardId
export const calculateAnswer = (guardObj) => {
  return guardObj.guardId * guardObj.minuteAsleep;
};

// Run File to see Answer
// calculateAnswer(guardObject);
// const guardObject = laziestGuard(inputData);
