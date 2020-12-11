// 파일을 읽을 때 input 박스에 이벤트를 건다.
function init() {
  const inputValue = document.querySelector('#inputValue');
  inputValue.addEventListener('keypress', pressEnter);
}

// enter 클릭 시 입력값에 대한 유효성검사 함수 실행.
function pressEnter(e) {
  if (e.keyCode === 13) {
    validateInputValue(e.target.value);
  }
}

// 입력값에 대한 유효성 검사
function validateInputValue(value) {
  const valueArr = value.split(' ');
  const [word, integer, command] = valueArr;

  if (valueArr.length > 3) {
    alert('올바른 값을 입력해 주세요.');
    return;
  }

  if (validateInteger(integer) && validateCommand(command)) {
    let result = shoveTheWord(word, integer, command);
    showResult(result);
  } else {
    alert('올바른 값을 입력해 주세요.');
  }
}

// 숫자에 대한 유효성 검사
function validateInteger(integer) {
  const int = Number(integer);
  return -100 <= int && int < 100 && Number.isInteger(int);
}

// 명령에 대한 유효성 검사
function validateCommand(cmd) {
  return cmd.toUpperCase() === 'L' || cmd.toUpperCase() === 'R';
}

// 단어를 밀어내는 함수
function shoveTheWord(word, int, cmd) {
  let wordArr = word.split('');
  cmd = checkCommand(cmd, int);

  if (cmd === 'L') {
    for (let i = 0; i < Math.abs(int); i++) {
      let char = wordArr.shift();
      wordArr.push(char);
    }
  } else if (cmd == 'R') {
    for (let i = 0; i < Math.abs(int); i++) {
      let char = wordArr.pop();
      wordArr.unshift(char);
    }
  }

  return wordArr.join('');
}

// 음수인지 양수인지를 확인 후 cmd 반환
function checkCommand(cmd, int) {
  cmd = cmd.toUpperCase();

  if (int < 0) {
    if (cmd === 'L') {
      cmd = 'R';
    } else if (cmd === 'R') {
      cmd = 'L';
    }
  }

  return cmd;
}

// dom을 이용한 결과 출력
function showResult(result) {
  const outputValue = document.querySelector('#outputValue');
  const newResult = document.createElement('li');
  newResult.classList.add('result');
  newResult.textContent = result;
  outputValue.insertBefore(newResult, outputValue.firstChild);
}

init();
