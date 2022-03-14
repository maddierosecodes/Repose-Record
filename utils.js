//  Calculate the minute asleep * guardId
export const calculateAnswer = (guardObj) => {
  return guardObj.guardId * guardObj.mostSlept;
};

//  Calculate the minute asleep * guardId
export const calculateAnswer2 = (guardObj) => {
	
  return guardObj.guardId * guardObj.mostSlept[0];
};

// Calculate the mode & number of times item occurs in list
export const mode = (numbers) => {
  const modes = [];
  const count = [];
  let number = 0;
  let maxIndex = 0;

  for (let i = 0; i < numbers.length; i += 1) {
    number = numbers[i];
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  }

  for (const prop in count) {
    if (count[prop] === maxIndex) {
      modes.push(Number(prop));
    }
  }

  return [modes[0], maxIndex];
};
