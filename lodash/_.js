

let _ = {

  // Numbers

  clamp: function (num, lower, upper) {
    const lowerClampedValue = Math.max(num, lower);
    return Math.min(lowerClampedValue, upper);
  },

  inRange: function (num, start, end) {

    if (end === undefined) {
      [end, start] = [start, 0];
    }

    if (start > end) {
      [end, start] = [start, end];
    }
    return (num >= start && num < end);
  },

  // Strings

  words: function (strings) {
    return strings.split(' ');
  },

  pad: function (string, length) {

    const sl = string.length

    if (length <= sl) {
      return string;
    }

    const diff = length - sl;
    const startPaddingLength = Math.floor( diff / 2);
    const endPaddingLength = diff - startPaddingLength;

    return ' '.repeat(startPaddingLength) + string + ' '.repeat(endPaddingLength);
  },

  // Objects

  has: function (obj, key) {
     return obj[key] !== undefined;
  },

  invert: function (obj) {
    const _invert = (invObj, k) => {
      invObj[obj[k]] = k;
      return invObj;
    }
    return Object.keys(obj).reduce(_invert, {})
  },

  findKey: function (obj, predicate) {
    for ( let [k, v] of Object.entries(obj) ) {
      if (predicate(v)) {
        return k;
      }
    }
  },

  // Arrays

  drop: function (arr, n) {
    n = n === undefined ? 1 : n;
    return arr.slice(n);
  },

  dropWhile: function (arr, predicate) {
    const dropNumber = arr.findIndex( (ele, idx) => !predicate(ele, idx, arr));
    return this.drop(arr, dropNumber);
  },

  chunk: function (array, size) {
    size = size === undefined ? 1 : size;
    let arrayChunks = [];

    for (let ii = 0; ii < array.length; ii += size) {
      let arrayChunk = array.slice(ii, ii + size);
      arrayChunks.push(arrayChunk)
    }

    return arrayChunks;
  }
};

// Do not write or modify code below this line.
module.exports = _;