import fs from 'fs/promises';

export const getInputData = (file) => {
  return fs.readFile(file, 'utf-8').then((text) => text.split('\n'));
};

export const inputData = getInputData('./input.txt');
