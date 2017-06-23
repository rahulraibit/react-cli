export function rand(range = 10) {
    return Math.floor((Math.random() * range));
}

let alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ";
let digits = "123456789";
let alphabetLen = alphabet.length;

export function randomCharacter() {
    return alphabet[rand(alphabet.length)];
}

export function randomDigit() {
    return digits[rand(digits.length)];
}


// Generate serial number
export function generateRandomCharacters(length = 8) {
    var s = '';
    for (let i = 0; i < length; i++) {
        s += randomCharacter();
    }
    return s;
}


export function generateRandomNumbers(length = 8) {
    var s = '';
    for (let i = 0; i < length; i++) {
        s += randomDigit();
    }
    return s;
}

export function generateRandomIP() {
    return generateRandomNumbers(3) + "."
        + generateRandomNumbers(3) + "."
        + generateRandomNumbers(3) + "."
        + generateRandomNumbers(3);
}

export function generateMacAddress() {
    return generateRandomCharacters(2) + ":" +
        generateRandomCharacters(2) + ":" +
        generateRandomCharacters(2) + ":" +
        generateRandomCharacters(2) + ":" +
        generateRandomCharacters(2) + ":" +
        generateRandomCharacters(2) + ":";
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// Generate GUID
export function guid() {
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}


export function toTicks(sec) {
    return (sec * 1000 * 10000) + 621355968000000000;
}

export function millisToTicks(milis) {
    return (milis * 10000) + 621355968000000000;
}

export function getDateInTicks(date) {
  if (!date) {
      date = new Date();
  }
  return millisToTicks(date.getTime());
}

export function incrementTime(val, hour) {
    return (parseInt(val, 10) + (10000 * 1000 * 60 * 60 * parseInt(hour, 10)));
}

export function generateFloatNumbers(len = 1) {
    return (Math.random()*10).toFixed(len);
}

export function pickRandomItemsFromArray(array, count, filterFunc) {
    let newArray = [];
    if (filterFunc) {
        array = array.filter(filterFunc);
    }

    // Copy original array index
    let remainingItemsArray = array.map((e, index) => { return index });

    for (let i = 0; i < count; i++) {
        // Pick rand item from remainingItemsArray;
        let randIndex = rand(remainingItemsArray.length);

        // Pick the index value of the original array
        let selIndex = remainingItemsArray[randIndex];

        // Get the item from original array and push to the new array
        let item = array.slice(selIndex, selIndex + 1);
        if (item.length > 0) {
            newArray.push(item[0]);
        }

        // Remove the considered random index
        remainingItemsArray.splice(randIndex, 1);
    }

    return newArray;
}


export function nullToEmptyArray(arr) {
    return (!Array.isArray(arr)) ? [] : arr;
}