// Returns an array of 5 statuses: 'correct' | 'present' | 'absent'
// Two-pass algorithm so duplicate letters are handled correctly.
export function evaluateGuess(guess, solution) {
  const result = Array(5).fill("absent");
  const remaining = {};

  // Pass 1: greens, and count the unmatched solution letters
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = "correct";
    } else {
      remaining[solution[i]] = (remaining[solution[i]] || 0) + 1;
    }
  }

  // Pass 2: yellows
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    const letter = guess[i];
    if (remaining[letter] > 0) {
      result[i] = "present";
      remaining[letter]--;
    }
  }

  return result;
}