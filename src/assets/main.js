let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    
    //add functionality to guess function here
    if (answer.value === '' || attempt.value === '') {
        setHiddenFields(answer, attempt)
    }

    if (!validateInput(input.value)) {
        return;
    }
    attempt.value++;

    if (getResults(input.value, answer.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else {
        if (Number(attempt.value) === 10) {
            setMessage('You Lose! :(');
            showAnswer(false);
            showReplay();
        } else {
            setMessage('Incorrect, try again.');
        }
    }
}

function calcRandomValue() {
    return Math.floor(Math.random() * 9999);
}

function padValue(value, n) {
    let result = value.toString();
    while (result.length < n) {
        result = '0'+ result;
    }
    return result;
}

//implement new functions here
function setHiddenFields() {
    answer.value = padValue(calcRandomValue(), 4);
    attempt.value = 0;
}

function setMessage(message) {
    document.querySelector('#message').innerHTML = message;
}

function validateInput(value) {
    if (value.length === 4) return true;
    else return (setMessage('Guesses must be exactly 4 characters long.'), false);
}

function getResults(value) {
    let code = answer.value;
    let charCount = [...value].reduce((ac, c, i) => (ac += (c === code.charAt(i) ? 1 : 0), ac), 0);
    if (charCount != code.length) {
        return false;
    }
    return true;
}

function showAnswer(isWin) {
    let label = document.querySelector('#code strong');
    label.innerHTML = answer.value;
    label.classList.add(isWin ? 'success' : 'failure');
}

function showReplay() {
    document.querySelector('#guessing-div').style.display = 'none';
    document.querySelector('#replay-div').style.display = 'block';
}