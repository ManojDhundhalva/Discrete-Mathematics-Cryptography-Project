var keyChoice = [1, 2, 9, 16];
var n = keyChoice.length;
function shiftKey(bit28, keyChoice, index) {
    var shift = '0'.repeat(bit28.length);
    var timeShift = 2;

    for (var i = 0; i < n; i++) {
        if (keyChoice[i] == index) {
            timeShift = 1;
            break;
        }
    }

    for (var i = 0; i < bit28.length; i++) {
        shift = shift.substr(0, i) + bit28[(i + timeShift) % bit28.length] + shift.substr(i + 1);
    }
    // console.log('hello');

    return shift;
}

// var bit28 = '1010101010101010101010101010';
// var index = 2;
// var shiftedKey = shiftKey(bit28, keyChoice, index);
// console.log(shiftedKey);

function subString(l, r, bit) {
    return (bit.substring(l, r + 1));
}
function binaryToDecimal(binary) {
    let decimal = 0;
    let temp = 0;

    while (binary) {
        if (binary % 10) {
            decimal += 1 << (binary % 10) * temp;
        }
        temp++;
        binary = Math.floor(binary / 10);
    }

    return decimal;
}
function decimalToBinary(decimal) {
    let bit8 = '0'.repeat(8);
    let i = 7;

    while (decimal) {
        if (decimal & 1) {
            bit8 = replaceCharAt(bit8, i, '1');
        }
        i--;
        decimal = Math.floor(decimal / 2);
    }

    return bit8;
}

// function replaceCharAt(str, index, replacement) {
//     return str.substr(0, index) + replacement + str.substr(index + 1);
// }

function binaryToDecimal(binary) {
    var decimal = 0;
    var temp = 0;

    for (var i = binary.length - 1; i >= 0; i--) {
        if (binary[i] - '0') {
            decimal += 1 << ((binary[i] - '0') * temp);
        }
        temp++;
    }

    return decimal;
}

// var binary = '101010';
// var decimal = binaryToDecimal(binary);
// console.log(decimal);


function GenerateKey(key, keyValueBit48) {

    let leftKey = key.substring(0, Math.floor(key.length / 2));
    let rightKey = key.substring(Math.floor(key.length / 2));

    for (let i = 0; i < 16; i++) {
        let leftKeySub = shiftKey(leftKey, keyChoice, i, n);
        let rightKeySub = shiftKey(rightKey, keyChoice, i, n);

        keyValueBit48[i] = PC2(leftKeySub + rightKeySub);
        console.log(`key :  ${keyValueBit48[i]}`);
        leftKey = leftKeySub;
        rightKey = rightKeySub;
    }
}
function expansionBox(bit32) {
    let bit48 = '0'.repeat(48);

    let i = 0, j = 0;
    while (i < bit32.length) {
        if (i === 0) {
            bit48 = replaceCharAt(bit48, j++, bit32[bit32.length - 1]);
        } else {
            bit48 = replaceCharAt(bit48, j++, bit32[i - 1]);
        }
        bit48 = replaceCharAt(bit48, j++, bit32[i++]);
        bit48 = replaceCharAt(bit48, j++, bit32[i++]);
        bit48 = replaceCharAt(bit48, j++, bit32[i++]);
        bit48 = replaceCharAt(bit48, j++, bit32[i++]);

        if (i === bit32.length) {
            bit48 = replaceCharAt(bit48, j, bit32[0]);
        } else {
            bit48 = replaceCharAt(bit48, j++, bit32[i]);
        }
    }

    return bit48;
}

function sBox(bit48) {
    const sBoxMatrix = [
        ["0010", "1100", "0100", "0001", "0111", "1010", "1011", "0110", "1000", "0101", "0011", "1111", "1101", "0000", "1110", "1001"],
        ["1110", "1011", "0010", "1100", "0100", "0111", "1101", "0001", "0101", "0000", "1111", "1010", "0011", "1001", "1000", "0110"],
        ["0100", "0010", "0001", "1011", "1010", "1101", "0111", "1000", "1111", "1001", "1100", "0101", "0110", "0011", "0000", "1110"],
        ["1011", "1000", "1100", "0111", "0001", "1110", "0010", "1101", "0110", "1111", "0000", "1001", "1010", "0100", "0101", "0011"]
    ];

    let bit32 = '';
    // console.log(`${bit32}`);
    for (let i = 0; i < bit48.length; i += 6) {
        let row = 0;
        if (bit48[i] === '0' && bit48[i + 5] === '0') {
            row = 0;
        } else if (bit48[i] === '0' && bit48[i + 5] === '1') {
            row = 1;
        } else if (bit48[i] === '1' && bit48[i + 5] === '0') {
            row = 2;
        } else if (bit48[i] === '1' && bit48[i + 5] === '1') {
            row = 3;
        }

        const column = binaryToDecimal(bit48.substring(i + 1, i + 5));
        bit32 += sBoxMatrix[row][column];
    }

    return bit32;
}

// Example usage
// const bit48 = "110111101010011011110100110110101010111111111010"; // Replace with your 48-bit input
// const result = sBox(bit48);
// console.log("Result:", result);

function PC2(bit56) {
    const sBoxPC2 = [
        [
            "101101", "001100", "010111", "000010", "110101", "100111", "010000", "011100",
            "000111", "111010", "100000", "000001", "111100", "000101", "110011", "010010",
            "011111", "010110", "000111", "000011", "101011", "100011", "000110", "111000",
            "000100", "110000", "011011", "111101", "000110", "110001", "010011", "011010",
            "000100", "101001", "101110", "000111", "011110", "110111", "010101", "111001",
            "101000", "011000", "000101", "100100", "110010", "100110", "000000", "101010",
            "010100", "111011", "000100", "011101", "000101", "111110", "100010", "101100",
            "010001", "111111", "110110", "011001", "101111", "100001", "100101", "110100"
        ],
        [
            "001001", "010011", "010000", "100111", "000001", "101101", "001100", "100000",
            "110010", "100010", "110110", "001111", "101001", "111010", "011011", "111101",
            "010100", "000011", "010001", "000100", "011000", "011101", "000110", "001101",
            "011111", "001000", "100011", "110001", "010110", "011010", "010111", "000111",
            "111110", "100010", "100100", "101100", "000111", "100101", "011001", "010010",
            "110111", "101110", "101111", "101000", "011110", "101101", "000101", "101011",
            "110100", "111111", "111000", "111001", "101100", "010101", "101010", "010011",
            "011100", "001011", "000001", "000010", "011001", "001100", "001001", "000011"
        ]
    ];

    let bit48 = '';
    for (let i = 0; i < bit56.length; i += 7) {
        const row = binaryToDecimal(bit56[i]);

        const column = binaryToDecimal(bit56.substring(i + 1, i + 7));

        bit48 += sBoxPC2[row][column];
    }

    return bit48;
}

// Example usage
// const bit56 = "01110010101011010100101111000101101111011011001101011100"; // Replace with your 56-bit input
// const result = PC2(bit56);
// console.log("Result:", result);

function createInitialPermutation(bit64) {
    const initialPermutation = [
        58, 50, 42, 34, 26, 18, 10, 2,
        60, 52, 44, 36, 28, 20, 12, 4,
        62, 54, 46, 38, 30, 22, 14, 6,
        0, 56, 48, 40, 32, 24, 16, 8,
        57, 49, 41, 33, 25, 17, 9, 1,
        59, 51, 43, 35, 27, 19, 11, 3,
        61, 53, 45, 37, 29, 21, 13, 5,
        63, 55, 47, 39, 31, 23, 15, 7
    ];

    let initialString = '';
    for (let i = 0; i < bit64.length; i++) {
        initialString += bit64[initialPermutation[i]];
    }

    return initialString;
}

// Example usage
// const bit64 = "1101001110011000101010100011011110100100001100001101100010011011"; // Replace with your actual 64-bit input
// const result = createInitialPermutation(bit64);
// console.log("Result:", result);

function createFunctionPermutation(bit32) {
    const FunctionPermutation = [
        31, 30, 29, 28, 27, 26, 25, 24,
        23, 22, 21, 20, 19, 18, 17, 16,
        15, 14, 13, 12, 11, 10, 9, 8,
        7, 6, 5, 4, 3, 2, 1, 0
    ];

    let FunctionString = '';
    for (let i = 0; i < bit32.length; i++) {
        FunctionString += bit32[FunctionPermutation[i]];
    }

    return FunctionString;
}

// Example usage
// const bit32 = "11001111101011110001010100000101"; // Replace with your actual 32-bit input
// const result = createFunctionPermutation(bit32);
// console.log("Result:", result);

function createFinalPermutation(bit64) {
    const finalPermutation = [
        40, 8, 48, 16, 56, 24, 0, 32,
        39, 7, 47, 15, 55, 23, 63, 31,
        38, 6, 46, 14, 54, 22, 62, 30,
        37, 5, 45, 13, 53, 21, 61, 29,
        36, 4, 44, 12, 52, 20, 60, 28,
        35, 3, 43, 11, 51, 19, 59, 27,
        34, 2, 42, 10, 50, 18, 58, 26,
        33, 1, 41, 9, 49, 17, 57, 25
    ];

    let FinalString = '';
    for (let i = 0; i < bit64.length; i++) {
        FinalString += bit64[finalPermutation[i]];
    }

    return FinalString;
}

// Example usage
// const bit64 = "1100101000010110101011110000111101110000101010101010101010101010"; // Replace with your actual 64-bit input
// const result = createFinalPermutation(bit64);
// console.log("Result:", result);

function Function(bit32, key) {
    const bit48 = expansionBox(bit32);
    // console.log(`bit48 : ${bit48}`);
    let result48 = '';
    for (let i = 0; i < 48; i++) {
        result48 += (parseInt(bit48[i]) ^ parseInt(key[i]));
    }
    // console.log(`result48 : ${result48}`);
    const newBit32 = sBox(result48);
    // console.log(`newBit32 : ${newBit32}`);
    const permuteBit32 = createFunctionPermutation(newBit32);

    return permuteBit32;
}

// Example usage
// const bit32 = "01100110101010111100001111011100"; // Replace with your actual 32-bit input
// const key = "010110100011010010101010101010110011011000101101"; // Replace with your actual key
// const result = Function(bit32, key);
// console.log("Result:", result);

function Round(plaintext, key, keyValueBit48) {
    let left = plaintext.substring(0, plaintext.length / 2);
    let right = plaintext.substring(plaintext.length / 2);

    for (let i = 0; i < 16; i++) {
        // console.log(`left : ${left}`);
        // console.log(`right : ${right}`);

        const keyBit48 = keyValueBit48[i];
        const functionResult = Function(right, keyBit48);
        // console.log(`${functionResult}`);
        let result = '';

        // for (let i = 0; i < 32; i++)
        // {
        //     result[i] = ((left[i] - '0') ^ (functionResult[i] - '0')) + '0';
        // }
        for (let j = 0; j < 32; j++) {
            result += (parseInt(left[j]) ^ parseInt(functionResult[j]));
        }

        left = right;
        right = result;
    }
    // console.log(`left : ${left}`);
    // console.log(`right : ${right}`);
    return left + right;
}

// Example usage
// const plaintext = "1100110010101011100001111011100"; // Replace with your actual plaintext
// const key = "010110100011010010101010101010110011011000101101"; // Replace with your actual key
// const result = Round(plaintext, key);
// console.log("Result:", result);

function textToBinary(text) {
    let binary = '';
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const binaryCharCode = charCode.toString(2).padStart(8, '0');
        binary += binaryCharCode;
    }
    return binary;
}

// Example usage
// const text = "Hello, world!"; // Replace with your actual text
// const result = textToBinary(text);
// console.log("Result:", result);

function binaryToHex(binary) {
    const map = new Map();
    map.set("0000", '0');
    map.set("0001", '1');
    map.set("0010", '2');
    map.set("0011", '3');
    map.set("0100", '4');
    map.set("0101", '5');
    map.set("0110", '6');
    map.set("0111", '7');
    map.set("1000", '8');
    map.set("1001", '9');
    map.set("1010", 'A');
    map.set("1011", 'B');
    map.set("1100", 'C');
    map.set("1101", 'D');
    map.set("1110", 'E');
    map.set("1111", 'F');

    let hex = '';
    for (let i = 0; i < binary.length; i += 4) {
        const subBinary = binary.substring(i, i + 4);
        hex += map.get(subBinary);
    }
    return hex;
}

// Example usage
// const binary = "101010111100"; // Replace with your actual binary
// const result = binaryToHex(binary);
// console.log("Result:", result);

function HexToBinary(Hex) {
    const map = new Map();
    map.set('0', "0000");
    map.set('1', "0001");
    map.set('2', "0010");
    map.set('3', "0011");
    map.set('4', "0100");
    map.set('5', "0101");
    map.set('6', "0110");
    map.set('7', "0111");
    map.set('8', "1000");
    map.set('9', "1001");
    map.set('A', "1010");
    map.set('B', "1011");
    map.set('C', "1100");
    map.set('D', "1101");
    map.set('E', "1110");
    map.set('F', "1111");

    let binary = '';
    for (let i = 0; i < Hex.length; i++) {
        binary += map.get(Hex[i]);
    }
    return binary;
}

// Example usage
// const hex = "2AF"; // Replace with your actual hexadecimal
// const result = HexToBinary(hex);
// console.log("Result:", result);

function Encryption(plainText, key) {
    const plainTextBinary = textToBinary(plainText);
    // console.log(plainTextBinary);
    key = textToBinary(key);

    let keyValueBit48 = [];
    GenerateKey(key, keyValueBit48);

    const initText = createInitialPermutation(plainTextBinary);
    const completeRound = Round(initText, key, keyValueBit48);
    const encrypt = createFinalPermutation(completeRound);
    // console.log(`encrypt : ${encrypt}`);
    const hex = binaryToHex(encrypt);

    return hex;
}

// Example usage
// const plainText = "Hello, World!"; // Replace with your actual plain text
// const key = "SecretKey"; // Replace with your actual key
// const result = Encryption(plainText, key);
// console.log("Result:", result);

/************************************************************************/

function AntiFinalPermutation(bit64) {
    const finalPermutation = [
        40, 8, 48, 16, 56, 24, 0, 32,
        39, 7, 47, 15, 55, 23, 63, 31,
        38, 6, 46, 14, 54, 22, 62, 30,
        37, 5, 45, 13, 53, 21, 61, 29,
        36, 4, 44, 12, 52, 20, 60, 28,
        35, 3, 43, 11, 51, 19, 59, 27,
        34, 2, 42, 10, 50, 18, 58, 26,
        33, 1, 41, 9, 49, 17, 57, 25
    ];

    let AntiFinalString = '0'.repeat(bit64.length);

    for (let i = 0; i < bit64.length; i++) {
        AntiFinalString = replaceCharAt(AntiFinalString, finalPermutation[i], bit64[i]);
    }

    return AntiFinalString;
}

// function replaceCharAt(string, index, replacement) {
//     return string.substring(0, index) + replacement + string.substring(index + 1);
// }


// Example usage
// const bit64 = "0101010101010101"; // Replace with your actual bit64 value
// const result = AntiFinalPermutation(bit64);
// console.log("Result:", result);

function GenerateLeft(operand, output) {
    let left = '';
    for (let i = 0; i < operand.length; i++) {
        if (operand[i] === '1' && output[i] === '1') {
            left += '0';
        } else if (operand[i] === '0' && output[i] === '1') {
            left += '1';
        } else if (operand[i] === '1' && output[i] === '0') {
            left += '1';
        } else if (operand[i] === '0' && output[i] === '0') {
            left += '0';
        }
    }
    return left;
}

// Example usage
// const operand = '11001100'; // Replace with your actual operand value
// const output = '10101010'; // Replace with your actual output value
// const result = GenerateLeft(operand, output);
// console.log("Result:", result);

function AntiRound(cipherText, key, keyValueBit48) {
    let left = cipherText.substring(0, cipherText.length / 2);
    let right = cipherText.substring(cipherText.length / 2);

    for (let i = 15; i >= 0; i--) {

        // console.log(`left : ${left}`);
        // console.log(`right : ${right}`);

        const AntiFunctionResult32 = Function(left, keyValueBit48[i]);
        const PreLeft = GenerateLeft(AntiFunctionResult32, right);

        right = left;
        left = PreLeft;
    }
    // console.log(`left : ${left}`);
    // console.log(`right : ${right}`);
    return left + right;
}

// Example usage
// const cipherText = '1100110010101010'; // Replace with your actual cipherText value
// const key = '0011001100110011'; // Replace with your actual key value
// const result = AntiRound(cipherText, key);
// console.log("Result:", result);

function AntiInitalPermutation(bit64) {
    const AntiInitPermutation = [
        58, 50, 42, 34, 26, 18, 10, 2,
        60, 52, 44, 36, 28, 20, 12, 4,
        62, 54, 46, 38, 30, 22, 14, 6,
        0, 56, 48, 40, 32, 24, 16, 8,
        57, 49, 41, 33, 25, 17, 9, 1,
        59, 51, 43, 35, 27, 19, 11, 3,
        61, 53, 45, 37, 29, 21, 13, 5,
        63, 55, 47, 39, 31, 23, 15, 7
    ];

    let AntiInitialString = '0'.repeat(bit64.length);

    for (let i = 0; i < bit64.length; i++) {
        AntiInitialString = replaceCharAt(AntiInitialString, AntiInitPermutation[i], bit64[i]);
    }

    return AntiInitialString;
}

function replaceCharAt(string, index, replacement) {
    return string.substring(0, index) + replacement + string.substring(index + 1);
}


// Example usage
// const bit64 = '0101011101010101'; // Replace with your actual bit64 value
// const result = AntiInitialPermutation(bit64);
// console.log("Result:", result);

function binaryToText(binary) {
    let text = '';
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.substr(i, 8);
        const decimal = parseInt(byte, 2);
        text += String.fromCharCode(decimal);
    }
    return text;
}

// Example usage
// const binary = '0110100001100101011011000110110001101111'; // Replace with your actual binary value
// const result = binaryToText(binary);
// console.log("Result:", result);

function Decryption(cipherText, key) {
    const cipherTextBinary = HexToBinary(cipherText);
    // console.log(`${cipherTextBinary}`);
    key = textToBinary(key);

    let keyValueBit48 = [];
    GenerateKey(key, keyValueBit48);

    // let keyValueBit48 [];
    
    // GenerateKey(key, keyValueBit48);
    // console.log(keyValueBit48);

    const AntiFinalString = AntiFinalPermutation(cipherTextBinary);
    // console.log(`${AntiFinalString}`);

    const AntiCompleRound = AntiRound(AntiFinalString, key, keyValueBit48);
    const AntiInitString = AntiInitalPermutation(AntiCompleRound);
    const decrypt = binaryToText(AntiInitString);

    return decrypt;
}

// Example usage
// const cipherText = '2C957F23'; // Replace with your actual cipher text
// const key = '1A3F5C7E'; // Replace with your actual key
// const result = Decryption(cipherText, key);
// console.log("Result:", result);


function completePlainText(plainText, part) {
    let newPlainText = '0'.repeat(part * 8);
    let j = newPlainText.length - 1;

    for (let i = plainText.length - 1; i >= 0; i--, j--) {
        newPlainText = newPlainText.substr(0, j) + plainText[i] + newPlainText.substr(j + 1);
    }

    return newPlainText;
}


function completeKey(key, part) {
    let newKey = '0'.repeat(part * 7);
    let j = newKey.length - 1;

    for (let i = key.length - 1; i >= 0; i--, j--) {
        newKey = newKey.substr(0, j) + key[i] + newKey.substr(j + 1);
    }

    return newKey;
}

//new
function TakeEncrypt(plainText, key) {
    let keyPart = Math.ceil(key.length / 7);
    let plainTextPart = Math.ceil(plainText.length / 8);
    let part = Math.max(keyPart, plainTextPart);

    plainText = completePlainText(plainText, part);
    key = completeKey(key, part);

    let cipher = '';
    for (let i = plainText.length - 1, k = key.length - 1; i >= 0 && k >= 0; i--, k--) {
        let temp = '0'.repeat(8);
        for (let j = 7; j >= 0 && i >= 0; j--, i--) {
            temp = temp.substring(0, j) + plainText[i] + temp.substring(j + 1);
        }
        i++;

        let tempKey = '0'.repeat(7);
        for (let q = 6; q >= 0 && k >= 0; q--, k--) {
            tempKey = tempKey.substring(0, q) + key[k] + tempKey.substring(q + 1);
        }
        k++;

        // Assuming there's an Encryption function
        temp = Encryption(temp, tempKey);
        cipher = temp + cipher;
    }

    return cipher;
}

//old
// function TakeEncrypt(PlainText, key) {
//     let cipher = '';
//     for (let i = PlainText.length - 1, k = key.length - 1; i >= 0, k >= 0; i--, k--) {
//         let temp = '00000000';
//         for (let j = 7; j >= 0 && i >= 0; j--, i--) {
//             temp = temp.substring(0, j) + PlainText[i] + temp.substring(j + 1);
//             console.log(`tttemp : ${temp}`);
//         }
//         i++;

//         let tempKey = '0000000';
//         for (let q = 6; q >= 0 && k >= 0; q--, k--) {
//             tempKey = tempKey.substring(0, q) + key[k] + tempKey.substring(q + 1);
//             console.log('tempkey:', tempKey);
//         }
//         k++;
//         console.log(`tttemp : ${temp}`);
//         temp = Encryption(temp, tempKey);
//         console.log('tempEn:', temp);
//         cipher = temp + cipher;
//     }
//     console.log(cipher);
//     return cipher;
// }

// function TakeEncrypt(PlainText, key) {
//     let cipher = '';
//     for (let i = PlainText.length - 1; i >= 0; i--) {
//         let temp = '00000000';
//         for (let j = 7; j >= 0 && i >= 0; j--, i--) {
//             temp = temp.substring(0, j) + PlainText[i] + temp.substring(j + 1);
//         }
//         i++;
//         // console.log('temp:', temp);
//         temp = Encryption(temp, key);
//         // console.log('tempEn:', temp);
//         cipher = temp + cipher;
//     }
//     return cipher;
// }



// Example usage
// const PlainText = 'Hello, World!'; // Replace with your actual plain text
// const key = '1A3F5C7E'; // Replace with your actual key
// const result = TakeEncrypt(PlainText, key);
// console.log('Result:', result);

/*****************************************************/
// function TakeDecryption(cipherText, key) {
//     let PlainText = '';

//     // console.log(`cipher1 : ${cipherText}`);
//     // cipherText = HexToBinary(cipherText);
//     // console.log(`cipher2 : ${cipherText.length}`);
//     // int keyBlocksize = (((cipherText.size() / 16) * 8) - (cipherText.size() / 16)) / 7;
//     // string keyBlock[keyBlocksize];

//     // cout << "keyBlocksize : " << keyBlocksize << '\n';
//     // int q = keyBlocksize - 1;
//     // for (int k = key.size() - 1; k >= 0; k--)
//     // {
//     //     string tempKey(7, '0');
//     //     for (int q = 6; q >= 0 && k >= 0; q--, k--)
//     //     {
//     //         tempKey[q] = key[k];
//     //     }
//     //     k++;
//     //     keyBlock[q] = tempKey;
//     //     cout << "keyBlock : " << keyBlock[q] << '\n';
//     //     q--;
//     // }
//     // for (int i = 0, k = 0; i < cipherText.size(); i += 16, k++)
//     // {
//     //     string cipher = subString(i, i + 15, cipherText);
//     //     PlainText += Decryption(cipher, keyBlock[k]);
//     // }


//     for (let i = 0; i < cipherText.length; i += 16) {
//         const cipher = cipherText.substring(i, i + 16);
//         PlainText += Decryption(cipher, key);
//     }
//     let plainText = '';
//     let cnt = 1;
//     for (let i = 0; i < PlainText.length; i++) {
//         if (PlainText[i] === '0' && cnt) {
//             continue;
//         } else {
//             plainText += PlainText[i];
//             cnt = 0;
//         }
//     }
//     return plainText;
// }

//new
function TakeDecryption(cipherText, key) {
    let part = Math.floor(cipherText.length / 16);
    key = completeKey(key, part);

    let PlainText = '';
    let keyBlocksize = (((cipherText.length / 16) * 8) - Math.floor(cipherText.length / 16)) / 7;
    let keyBlock = new Array(keyBlocksize);

    let q = keyBlocksize - 1;
    for (let k = key.length - 1; k >= 0; k--) {
        let tempKey = '0'.repeat(7);
        for (let q = 6; q >= 0 && k >= 0; q--, k--) {
            tempKey = tempKey.substring(0, q) + key[k] + tempKey.substring(q + 1);
        }
        k++;
        keyBlock[q] = tempKey;
        q--;
    }

    for (let i = 0, k = 0; i < cipherText.length; i += 16, k++) {
        let cipher = subString(i, i + 15, cipherText);
        PlainText += Decryption(cipher, keyBlock[k]);
    }

    let plainText = '';
    let cnt = 1;
    for (let i = 0; i < PlainText.length; i++) {
        if (PlainText[i] === '0' && cnt) {
            continue;
        } else {
            plainText += PlainText[i];
            cnt = 0;
        }
    }

    return plainText;
}

//old
// function TakeDecryption(cipherText, key) {
//     let plainText = '';
//     const keyBlockSize = (((cipherText.length / 16) * 8) - (cipherText.length / 16)) / 7;
//     const keyBlock = [];

//     console.log('keyBlockSize :', keyBlockSize);
//     let q = keyBlockSize - 1;

//     for (let k = key.length - 1; k >= 0; k--) {
//         let tempKey = '0000000';
//         let qTemp = 6;

//         while (qTemp >= 0 && k >= 0) {
//             tempKey = tempKey.substring(0, qTemp) + key[k] + tempKey.substring(qTemp + 1);
//             qTemp--;
//             k--;
//         }
//         k++;

//         keyBlock[q] = tempKey;
//         console.log('keyBlock :', keyBlock[q]);
//         q--;
//     }

//     for (let i = 0, k = 0; i < cipherText.length; i += 16, k++) {
//         const cipher = cipherText.substring(i, i + 16);
//         plainText += Decryption(cipher, keyBlock[k]);
//     }

//     let finalPlainText = '';
//     let cnt = 1;

//     for (let i = 0; i < plainText.length; i++) {
//         if (plainText[i] === '0' && cnt) {
//             continue;
//         } else {
//             finalPlainText += plainText[i];
//             cnt = 0;
//         }
//     }

//     return finalPlainText;
// }



let cipher = TakeEncrypt('MyNameIsMyNameIs', 'My5NameMy5Name');
// console.log(`cipher : ${cipher} ${cipher.length}`);
// console.log('/*****************************************/');
console.log(`cipher : ${cipher}`);
let plain = TakeDecryption(cipher, 'My5NameMy5Name');
console.log(`plain : ${plain}`);
        // Example usage
        // const cipherText = '2C4E6A3C6C404274'; // Replace with your actual cipher text
        // const key = '1A3F5C7E'; // Replace with your actual key
        // const result = TakeDecryption(cipherText, key);
        // console.log('Result:', result);

        // console.log(binaryToDecimal('1111'));