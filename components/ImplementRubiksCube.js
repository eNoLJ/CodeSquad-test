import consoleCube from '../helper/RubiksCubeConsoleOutput.js';

// 입력받은 명령에 따라 루빅스 큐브 밀기 밀기
function pushRubiksCube(value) {
  console.log(value);
  for (let i = 0; i < value.length; i++) {
    if (value[i].toUpperCase() === 'Q') {
      // deleteEvent();
      return;
    } else if (Number(value[i][1]) === 2) {
      turnCube(value[i]);
    }
    turnCube(value[i]);
    return;
    // setTimeout(() => showResult(char), 500 * i);
  }
}

// 입력 받은 문자열 재조합
function recombinantString(value) {
  return value.split('').reduce((acc, cur) => {
    if (cur === "'" || Number(cur)) {
      acc[acc.length - 1] += cur;
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
}

// 알파벳에 대한 유효성 검사
function validateChar(char) {
  char = char.toUpperCase();
  return (
    char === 'U' ||
    char === 'L' ||
    char === 'F' ||
    char === 'R' ||
    char === 'B' ||
    char === 'D' ||
    char === 'Q'
  );
}

// 입력값에 대한 유효성 검사
function validateInputValue(value) {
  if (!validateChar(value[0])) {
    alert('올바른 값을 입력해 주세요.1');
    return;
  }

  for (let i = 0; i < value.length; i++) {
    if (!validateChar(value[i]) && value[i] !== "'" && Number(value[i]) !== 2) {
      alert('올바른 값을 입력해 주세요.2');
      return;
    } else if (value[i] === "'" && (!validateChar(value[i - 1]) || Number(value[i + 1]))) {
      alert('올바른 값을 입력해 주세요.3');
      return;
    } else if (Number(value[i]) === 2 && !validateChar(value[i - 1])) {
      alert('올바른 값을 입력해 주세요.4');
      return;
    }
  }

  pushRubiksCube(recombinantString(value));
}

// enter 클릭 시 입력값에 대한 유효성검사 함수 실행.
function pressEnter(e) {
  if (e.keyCode === 13) {
    validateInputValue(e.target.value);
    e.target.value = '';
  }
}

function makeOneSideCube(color) {
  return [
    [color, color, color],
    [color, color, color],
    [color, color, color],
  ];

  // [
  //   ['a', 'b', 'c'],
  //   ['a', 'b', 'c'],
  //   ['a', 'b', 'c'],
  // ];
  // [
  //   ['a', 'a', 'a'],
  //   ['b', 'b', 'b'],
  //   ['c', 'c', 'c'],
  // ];
  //   [
  //     ['a', 'b', 'c'],
  //     ['d', 'e', 'f'],
  //     ['g', 'h', 'i'],
  //   ];
  //   [
  //     [color, color, color],
  //     [color, color, color],
  //     [color, color, color],
  //   ];
}

// 파일을 읽을 때 input 박스에 이벤트를 건다.
function init() {
  window.rubiksCube = {
    up: makeOneSideCube('W'),
    left: makeOneSideCube('G'),
    front: makeOneSideCube('R'),
    right: makeOneSideCube('B'),
    back: makeOneSideCube('O'),
    down: makeOneSideCube('Y'),
  };

  const inputValue = document.querySelector('#inputValue');
  inputValue.addEventListener('keypress', pressEnter);
}

init();

function turnCube(char) {
  let charUpperCase = char[0].toUpperCase();
  let oneSide = rubiksCube[convertChar(charUpperCase)];

  if (char.length === 1) {
    rubiksCube[convertChar(charUpperCase)] = turnClock(oneSide);
  } else {
    rubiksCube[convertChar(charUpperCase)] = turnCounterClock(oneSide);
  }

  moveSide(char);
}

function convertChar(char) {
  let result;

  if (char === 'U') {
    result = 'up';
  } else if (char === 'L') {
    result = 'left';
  } else if (char === 'F') {
    result = 'front';
  } else if (char === 'R') {
    result = 'right';
  } else if (char === 'B') {
    result = 'back';
  } else if (char === 'D') {
    result = 'down';
  }

  return result;
}

function turnClock(side) {
  let copySide = [[], [], []];

  for (let i = 0; i < side.length; i++) {
    for (let j = 0; j < side[i].length; j++) {
      copySide[j][2 - i] = side[i][j];
    }
  }

  return copySide;
}

function turnCounterClock(side) {
  let copySide = [[], [], []];

  for (let i = 0; i < side.length; i++) {
    for (let j = 0; j < side[i].length; j++) {
      copySide[2 - j][i] = side[i][j];
    }
  }

  return copySide;
}

function moveSide(char) {
  let charUpperCase = char[0].toUpperCase();
  let copyCube = JSON.parse(JSON.stringify(rubiksCube));

  if (charUpperCase === 'U' || charUpperCase === 'D') {
    moveUpDown(char, copyCube);
  } else if (charUpperCase === 'L' || charUpperCase === 'R') {
    moveLeftRight(char, copyCube);
  } else if (charUpperCase === 'F' || charUpperCase === 'B') {
    moveFrontBack(char, copyCube);
  }

  consoleCube(rubiksCube);
}

function moveUpDown(char, cube) {
  let idx = char[0].toUpperCase() === 'U' ? 0 : 2;
  let order = ['left', 'front', 'right', 'back'];

  if (
    (char[0].toUpperCase() === 'U' && char[1] === "'") ||
    (char[0].toUpperCase() === 'D' && char[1] !== "'")
  ) {
    order = order.reverse();
  }

  for (let i = 0; i < order.length; i++) {
    rubiksCube[order[i]][idx] = cube[order[(i + 1) % 4]][idx];
  }
}

function moveLeftRight(char, cube) {
  let idx = [0, 2];
  let order = leftRightOderHelper(char);

  if (char[0].toUpperCase() === 'R') {
    idx[0] = 2;
    idx[1] = 0;
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      moveLeftRightHelper(idx, order, cube, i, j);
    }
  }
}

function leftRightOderHelper(char) {
  let order = ['down', 'front', 'up', 'back'];
  let side;

  if (
    (char[0].toUpperCase() === 'R' && char[1] !== "'") ||
    (char[0].toUpperCase() === 'L' && char[1] === "'")
  ) {
    side = order.pop();
    order = order.reverse();
    order.push(side);
  }

  return order;
}

function moveLeftRightHelper(index, order, cube, i, j) {
  let idx = index.slice();
  if (i === 0 || i === 1) {
    rubiksCube[order[i]][j][idx[0]] = cube[order[(i + 1) % 4]][j][idx[0]];
  } else {
    if (i === 3) {
      idx = idx.reverse();
    }
    rubiksCube[order[i]][j][idx[0]] = cube[order[(i + 1) % 4]][Math.abs(j - 2)][idx[1]];
  }
}

function moveFrontBack(char, cube) {
  let idx = [0, 2];
  let apostrophe = false;
  let order = frontBackOderHelper(char);

  if (
    (char[0].toUpperCase() === 'F' && char[1] === "'") ||
    (char[0].toUpperCase() === 'B' && char[1] !== "'")
  ) {
    apostrophe = true;
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      moveFrontBackHelper(idx, order, cube, i, j, apostrophe);
    }
  }
}

// turnCube('f'); ["up", "right", "down", "left"]
// turnCube("f'"); ["left", "up", "right", "down"]
// turnCube('b'); ["right", "down", "left", "up"]
// turnCube("b'"); ["down", "right", "up", "left"]

function frontBackOderHelper(char) {
  let order;

  if (char[0].toUpperCase() === 'F' && char[1] !== "'") {
    order = ['up', 'left', 'down', 'right'];
  } else if (char[0].toUpperCase() === 'F' && char[1] === "'") {
    order = ['left', 'up', 'right', 'down'];
  } else if (char[0].toUpperCase() === 'B' && char[1] !== "'") {
    order = ['right', 'down', 'left', 'up'];
  } else if (char[0].toUpperCase() === 'B' && char[1] === "'") {
    order = ['down', 'right', 'up', 'left'];
  }

  return order;
}

function moveFrontBackHelper(index, order, cube, i, j, apostrophe) {
  let idx = index.slice();

  if (i === 2 || i === 3) {
    idx = idx.reverse();
  }

  if (i === 0 || i === 2) {
    if (!apostrophe) {
      rubiksCube[order[i]][idx[1]][j] = cube[order[(i + 1) % 4]][Math.abs(j - 2)][idx[1]];
    } else {
      rubiksCube[order[i]][Math.abs(j - 2)][idx[1]] = cube[order[(i + 1) % 4]][idx[1]][j];
    }
  } else if (i === 1 || i === 3) {
    if (!apostrophe) {
      rubiksCube[order[i]][j][idx[1]] = cube[order[(i + 1) % 4]][idx[0]][j];
    } else {
      rubiksCube[order[i]][idx[1]][j] = cube[order[(i + 1) % 4]][j][idx[0]];
    }
  }
}

// turnCube('f');

// 숫자에 따른 회전
// q 입력 시 구현
// dom 구현
// 경과 시간 구현
// 총 조작 갯수 구현
// 셔플 기능
// 맞출 시 축하 안내
// 공백 엔터 처리

// if (char === 'U') {
//   rubiksCube.left[0] = copyCube.front[0];
//   rubiksCube.front[0] = copyCube.right[0];
//   rubiksCube.right[0] = copyCube.back[0];
//   rubiksCube.back[0] = copyCube.left[0];
// } else if (char === 'L') {
//   rubiksCube.up[0][0] = copyCube.back[2][2];
//   rubiksCube.up[1][0] = copyCube.back[1][2];
//   rubiksCube.up[2][0] = copyCube.back[0][2];

//   rubiksCube.back[0][2] = copyCube.down[2][0];
//   rubiksCube.back[1][2] = copyCube.down[1][0];
//   rubiksCube.back[2][2] = copyCube.down[0][0];

//   rubiksCube.down[0][0] = copyCube.front[0][0];
//   rubiksCube.down[1][0] = copyCube.front[1][0];
//   rubiksCube.down[2][0] = copyCube.front[2][0];

//   rubiksCube.front[0][0] = copyCube.up[0][0];
//   rubiksCube.front[1][0] = copyCube.up[1][0];
//   rubiksCube.front[2][0] = copyCube.up[2][0];
// } else if (char === 'F') {
//   rubiksCube.up[2][0] = copyCube.left[2][2];
//   rubiksCube.up[2][1] = copyCube.left[1][2];
//   rubiksCube.up[2][2] = copyCube.left[0][2];

//   rubiksCube.right[0][0] = copyCube.up[2][0];
//   rubiksCube.right[1][0] = copyCube.up[2][1];
//   rubiksCube.right[2][0] = copyCube.up[2][2];

//   rubiksCube.down[0][0] = copyCube.right[2][0];
//   rubiksCube.down[0][1] = copyCube.right[1][0];
//   rubiksCube.down[0][2] = copyCube.right[0][0];

//   rubiksCube.left[0][2] = copyCube.down[0][0];
//   rubiksCube.left[1][2] = copyCube.down[0][1];
//   rubiksCube.left[2][2] = copyCube.down[0][2];
// } else if (char === 'R') {
//   rubiksCube.up[0][2] = copyCube.front[0][2];
//   rubiksCube.up[1][2] = copyCube.front[1][2];
//   rubiksCube.up[2][2] = copyCube.front[2][2];

//   rubiksCube.front[0][2] = copyCube.down[0][2];
//   rubiksCube.front[1][2] = copyCube.down[1][2];
//   rubiksCube.front[2][2] = copyCube.down[2][2];

//   rubiksCube.down[0][2] = copyCube.back[2][0];
//   rubiksCube.down[1][2] = copyCube.back[1][0];
//   rubiksCube.down[2][2] = copyCube.back[0][0];

//   rubiksCube.back[0][0] = copyCube.up[2][2];
//   rubiksCube.back[1][0] = copyCube.up[1][2];
//   rubiksCube.back[2][0] = copyCube.up[0][2];
// } else if (char === 'B') {
//   rubiksCube.up[0][0] = copyCube.right[0][2];
//   rubiksCube.up[0][1] = copyCube.right[1][2];
//   rubiksCube.up[0][2] = copyCube.right[2][2];

//   rubiksCube.right[0][2] = copyCube.down[2][2];
//   rubiksCube.right[1][2] = copyCube.down[2][1];
//   rubiksCube.right[2][2] = copyCube.down[2][0];

//   rubiksCube.down[2][0] = copyCube.left[0][0];
//   rubiksCube.down[2][1] = copyCube.left[1][0];
//   rubiksCube.down[2][2] = copyCube.left[2][0];

//   rubiksCube.left[0][0] = copyCube.up[0][2];
//   rubiksCube.left[1][0] = copyCube.up[0][1];
//   rubiksCube.left[2][0] = copyCube.up[0][0];
// } else if (char === 'D') {
//   rubiksCube.left[2] = copyCube.back[2];
//   rubiksCube.front[2] = copyCube.left[2];
//   rubiksCube.right[2] = copyCube.front[2];
//   rubiksCube.back[2] = copyCube.right[2];
// }
