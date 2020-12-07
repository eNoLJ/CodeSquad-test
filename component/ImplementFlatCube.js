// Q 입력 시 dom으로 종료 출력
function showEnd() {
  const outputValue = document.querySelector('#outputValue');
  const newResult = document.createElement('li');
  newResult.classList.add('result');
  newResult.textContent = 'Bye~';
  outputValue.insertBefore(newResult, outputValue.firstChild);
}

// dom을 이용한 결과 출력
function showResult(char) {
  const result = char + '<br>' + flatCube[0] + '<br>' + flatCube[1] + '<br>' + flatCube[2] + '<br>';
  const outputValue = document.querySelector('#outputValue');
  const newResult = document.createElement('li');
  newResult.classList.add('result');
  newResult.innerHTML = result;
  outputValue.insertBefore(newResult, outputValue.firstChild);
}

// 플랫 큐브 적용
function makeFlatCube(line, char) {
  let copyFlatCube = flatCube.slice();

  if (char[0] === 'U') {
    copyFlatCube[0] = line;
  } else if (char[0] === 'R') {
    for (let i = 0; i < copyFlatCube.length; i++) {
      let copyLine = copyFlatCube[i].slice();
      copyLine[2] = line[i];
      copyFlatCube[i] = copyLine;
    }
  } else if (char[0] === 'L') {
    for (let i = 0; i < copyFlatCube.length; i++) {
      let copyLine = copyFlatCube[i].slice();
      copyLine[0] = line[i];
      copyFlatCube[i] = copyLine;
    }
  } else if (char[0] === 'B') {
    copyFlatCube[2] = line;
  }

  flatCube = copyFlatCube;
  showResult(char);
}

// 한줄 밀기
function pushLine(value, length) {
  if (length === 1) {
    let char = value.shift();
    value.push(char);
  } else if (length === 2) {
    let char = value.pop();
    value.unshift(char);
  }
  return value;
}

// 큐브 밀기
function pushFlatCube(value) {
  for (let i = 0; i < value.length; i++) {
    let char = value[i].toUpperCase();
    let length = value[i].length;
    let line;

    if (char[0] === 'U') {
      line = flatCube[0].slice();
    } else if (char[0] === 'R') {
      line = flatCube.map(el => el[2]);
    } else if (char[0] === 'L') {
      line = flatCube.map(el => el[0]);
      length = length === 1 ? 2 : 1;
    } else if (char[0] === 'B') {
      line = flatCube[2].slice();
      length = length === 1 ? 2 : 1;
    } else if (char[0] === 'Q') {
      const inputValue = document.querySelector('#inputValue');
      inputValue.removeEventListener('keypress', pressEnter);
      showEnd();
      return;
    }

    let result = pushLine(line, length);
    makeFlatCube(result, char);
  }
}

// 알파벳에 대한 유효성 검사
function validateChar(char) {
  char = char.toUpperCase();
  return char === 'U' || char === 'R' || char === 'L' || char === 'B' || char === 'Q';
}

// 입력값에 대한 유효성 검사
function validateInputValue(value) {
  let valueArr = [];

  if (!validateChar(value[0])) {
    alert('올바른 값을 입력해 주세요.');
    return false;
  }

  for (let i = 0; i < value.length; i++) {
    if (!validateChar(value[i]) && !(value[i] === "'" && value[i - 1] !== "'")) {
      alert('올바른 값을 입력해 주세요.');
      return false;
    }
    if (value[i] === "'") {
      valueArr[valueArr.length - 1] = valueArr[valueArr.length - 1] + "'";
    } else {
      valueArr.push(value[i]);
    }
  }

  pushFlatCube(valueArr);
}

// enter 클릭 시 입력값에 대한 유효성검사 함수 실행.
function pressEnter(e) {
  if (e.keyCode === 13) {
    validateInputValue(e.target.value);
  }
}

// 파일을 읽을 때 input 박스에 이벤트를 건다.
function init() {
  window.flatCube = [
    ['R', 'R', 'W'],
    ['G', 'C', 'W'],
    ['G', 'B', 'B'],
  ];
  const inputValue = document.querySelector('#inputValue');
  inputValue.addEventListener('keypress', pressEnter);
}

init();
