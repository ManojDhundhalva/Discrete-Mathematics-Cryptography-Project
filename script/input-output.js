function GiveEncryption() {
    let plainTextObject = document.querySelector('.js-plainText-input');
    let plainTEXT = plainTextObject.value;

    let keyObject = document.querySelector('.js-key-input');
    let keyTEXT = keyObject.value;


    // const inputPlainTextArea = document.getElementById('input-Plain-TextArea-id');
    // const inputTextarea = document.getElementById('inputTextarea');
    // const errorMessage = document.getElementById('errorMessage');

    // console.log(`hhhhhhhhhhhhhh : ${plainTextObject.length}`);
    // inputTextarea.addEventListener('input', function () {
    //     const inputValue = inputTextarea.value;
    //     const inputPlainValue = inputPlainTextArea.value;
    //     let inputPlainTEXTSize = Math.ceil(inputPlainValue.length / 8) * 8 - Math.ceil((inputPlainValue.length) / 8);

    //     if (inputValue.length > (Math.ceil(inputPlainTEXTSize / 7)) * 7) {
    //         errorMessage.textContent = 'Input must be 7 characters only.';
    //     } else {
    //         errorMessage.textContent = '';
    //     }
    // });

    console.log(plainTEXT);
    console.log(keyTEXT);
    document.querySelector('.js-plainText-output').value = TakeEncrypt(plainTEXT, keyTEXT);
}

function GiveDecryption() {
    let cipherTextObject = document.querySelector('.js-cipherText-input');
    let cipherTEXT = cipherTextObject.value;

    console.log(`cipherTEXT : ${cipherTEXT}`);
    let keyObject = document.querySelector('.js-key-input-1');
    let keyTEXT = keyObject.value;

    console.log(cipherTEXT);
    console.log(keyTEXT);

    document.querySelector('.js-cipherText-output').value = TakeDecryption(cipherTEXT, keyTEXT);;
}