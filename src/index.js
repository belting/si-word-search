'use strict';

import Direction from './direction';
import grid from './grid';
import wordList from './word-list';

const ROW_COUNT = grid.length;
const COLUMN_COUNT = grid[0].length;

// Hashes words by first letter
let hashWords = words => {
  let hash = {};

  words.forEach(word => {
    let firstLetter = word.charAt(0).toUpperCase();

    if (hash[firstLetter] === undefined) {
      hash[firstLetter] = [];
    }

    hash[firstLetter].push(word);
  });

  return hash;
};

// Recursively searches for partial words
let search = (partial, rowIndex, colIndex, direction) => {
  // If there are no additional letters, then we have found the word
  if (partial.length === 0) {
    return true;
  }

  let nextRowIndex = rowIndex;
  let nextColIndex = colIndex;

  // Verify that the next grid location is valid
  switch (direction) {
    case Direction.LR:
      nextColIndex++;
      if (nextColIndex >= COLUMN_COUNT) {
        return false;
      }
      break;
    case Direction.RL:
      nextColIndex--;
      if (nextColIndex < 0) {
        return false;
      }
      break;
    case Direction.U:
      nextRowIndex--;
      if (nextRowIndex < 0) {
        return false;
      }
      break;
    case Direction.D:
      nextRowIndex++;
      if (nextRowIndex >= ROW_COUNT) {
        return false;
      }
      break;
    case Direction.DUL:
      nextRowIndex--;
      nextColIndex--;
      if (nextRowIndex < 0 || nextColIndex < 0) {
        return false;
      }
      break;
    case Direction.DUR:
      nextRowIndex--;
      nextColIndex++;
      if (nextRowIndex < 0 || nextColIndex >= COLUMN_COUNT) {
        return false;
      }
      break;
    case Direction.DDL:
      nextRowIndex++;
      nextColIndex--;
      if (nextRowIndex >= ROW_COUNT || nextColIndex < 0) {
        return false;
      }
      break;
    case Direction.DDR:
      nextRowIndex++;
      nextColIndex++;
      if (nextRowIndex >= ROW_COUNT || nextColIndex >= COLUMN_COUNT) {
        return false;
      }
      break;
  }

  // Verify that the letter is found
  if (grid[nextRowIndex][nextColIndex] !== partial.charAt(0)) {
    return false;
  }

  // Search for remaining letters
  return search(partial.slice(1), nextRowIndex, nextColIndex, direction);
};

// Solves the word search
let solve = () => {
  // Build word hash
  let wordHash = hashWords(wordList);

  // Iterate through rows
  grid.forEach((row, rowIndex) => {
    // Iterate through columns
    row.forEach((letter, colIndex) => {
      // Get list of words beginning with current letter
      let words = wordHash[letter];
      if (words === undefined || words.length === 0) {
        return;
      }
      // Iterate through words
      for (let wordIndex = words.length - 1; wordIndex >= 0; wordIndex--) {
        let word = words[wordIndex];
        // Iterate through directions
        Object.keys(Direction).forEach(direction => {
          // Search for word in grid after removing whitespace and converting to uppercase
          let normalizedWord = word.replace(/\s+/g, '').toUpperCase();
          let found = search(normalizedWord.slice(1), rowIndex, colIndex, Direction[direction]);

          if (found) {
            // Remove word from hash once found
            wordHash[letter].splice(wordHash[letter].indexOf(word), 1);

            // Print results to console
            console.log(`Found "${word}" at row ${rowIndex}, column ${colIndex} in ${direction} direction`);
          }
        });
      }
    });
  });

  // List words not found
  Object.keys(wordHash).forEach(letter => {
    wordHash[letter]
      .filter(words => words.length > 0)
      .forEach(word => console.log(`"${word}" not found`))
  });
};

// Solve word search
solve();
