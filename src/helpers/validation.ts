const allowedChars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export function containsSpecialChars(value: string) {
  for (const char of value) {
    if (!allowedChars.includes(char.toLowerCase())) {
      return true;
    }
  }
  return false;
}
