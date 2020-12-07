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

function makeFlatCube(line, char) {
  let copyFlatCube = flatCube.slice();

  if (char === 'U') {
    copyFlatCube[0] = line;
  } else if (char === 'R') {
    for (let i = 0; i < copyFlatCube.length; i++) {
      // 구현
    }
  } else if (char === 'L') {
    //구현
  } else if (char === 'B') {
    copyFlatCube[2] = line;
  }

  flatCube = copyFlatCube;
  //   console.log(flatCube);
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
      // 큐브 초기화 후 이벤트 종료 그리고 안내
      return;
    }

    let result = pushLine(line, length);
    makeFlatCube(result, char[0]);
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
  inputValue.onkeypress = function (e) {
    pressEnter(e);
  };
}

init();
