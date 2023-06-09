export function convertStringToArray(str) {
    const stringArray = str.split(",");
    const numberArray = stringArray.map((item) => parseInt(item, 10));
    return numberArray;
  }