import fs from 'fs/promises';

// Read Data from Files & format into array
export const getInputData = (file) => {
  return fs
    .readFile(file, 'utf-8')
    .then((text) => text.split('\n'))
    .catch((err) => {
      console.log(err);
    });
};

// Return the multiple of two numbers
export const calculateAnswer = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') return 0;
  return a * b;
};

// Calculate the mode & number of times item occurs in list
export const mode = (numbers) => {
  if (numbers.length === 0 || !Array.isArray(numbers)) return [];
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
