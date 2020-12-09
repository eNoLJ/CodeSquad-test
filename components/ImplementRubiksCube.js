import consoleCube from '../helper/RubiksCubeConsoleOutput.js';

// 플랫 큐브 적용
function makeRubiksCube(line, char) {
  let copyFlatCube = flatCube.slice();

  if (char === 'U') {
    copyFlatCube[0] = line;
  } else if (char === 'R') {
    for (let i = 0; i < copyFlatCube.length; i++) {
      let copyLine = copyFlatCube[i].slice();
      copyLine[2] = line[i];
      copyFlatCube[i] = copyLine;
    }
  } else if (char === 'L') {
    for (let i = 0; i < copyFlatCube.length; i++) {
      let copyLine = copyFlatCube[i].slice();
      copyLine[0] = line[i];
      copyFlatCube[i] = copyLine;
    }
  } else if (char === 'B') {
    copyFlatCube[2] = line;
  }

  flatCube = copyFlatCube;
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
function pushRubiksCube(value) {
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
      //   deleteEvent();
      setTimeout(() => showResult(char), 500 * i);
      return;
    }

    let result = pushLine(line, length);
    makeRubiksCube(result, char[0]);
    setTimeout(() => showResult(char), 500 * i);
  }
}

// 위로는 체크

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
// U L F R B D 숫자 ' Q
function validateInputValue(value) {
  if (!validateChar(value[0])) {
    alert('올바른 값을 입력해 주세요.1');
    return;
  }

  for (let i = 0; i < value.length; i++) {
    if (value[i] === "'" && !validateChar(value[i - 1])) {
      alert('올바른 값을 입력해 주세요.2');
      return;
    } else if (!validateChar(value[i]) && !Number(value[i]) && value[i] !== "'") {
      alert('올바른 값을 입력해 주세요.3');
      return;
    } else if (value[i].toUpperCase() === 'Q' && value[i + 1] === "'") {
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
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
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
  // [
  //   [color, color, color],
  //   [color, color, color],
  //   [color, color, color],
  // ];
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

/*
U -> W 회전, <- G <- R <- B <- O 변경 Y
L -> G 회전, W -> R -> Y -> O -> 변경 B
F -> R 회전, W -> B -> Y -> G -> 변경 O
R -> B 회전, <- W <- R <- Y <- O 변경 G
B -> O 회전, <- W <- B <- Y <- G 변경 R
D -> Y 회전, G -> R -> B -> O -> 변경 W

0,0 -> 0,2 2,0
0,1 -> 1,2 1,0
0,2 -> 2,2 0,0

1,0 -> 0,1 2,1
1,1 -> 1,1 1,1
1,2 -> 2,1 0,1

2,0 -> 0,0 2,2
2,1 -> 1,0 1,2
2,2 -> 2,0 0,2
*/

// U L F'

function turnCube(char) {
  let charUpperCase = char[0].toUpperCase();
  let oneSide = rubiksCube[convertChar(charUpperCase)];

  if (char.length === 1) {
    rubiksCube[charUpperCase] = turnClock(oneSide);
  } else {
    rubiksCube[charUpperCase] = turnCounterClock(oneSide);
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

  if (charUpperCase === 'U') {
    moveUpDown(char, copyCube);
  } else if (charUpperCase === 'L') {
    moveLeftRight(char, copyCube);
  } else if (charUpperCase === 'F') {
    rubiksCube.up[2][0] = copyCube.left[2][2];
    rubiksCube.up[2][1] = copyCube.left[1][2];
    rubiksCube.up[2][2] = copyCube.left[0][2];

    rubiksCube.right[0][0] = copyCube.up[2][0];
    rubiksCube.right[1][0] = copyCube.up[2][1];
    rubiksCube.right[2][0] = copyCube.up[2][2];

    rubiksCube.down[0][0] = copyCube.right[2][0];
    rubiksCube.down[0][1] = copyCube.right[1][0];
    rubiksCube.down[0][2] = copyCube.right[0][0];

    rubiksCube.left[0][2] = copyCube.down[0][0];
    rubiksCube.left[1][2] = copyCube.down[0][1];
    rubiksCube.left[2][2] = copyCube.down[0][2];
  } else if (charUpperCase === 'R') {
    moveLeftRight(char, copyCube);
  } else if (charUpperCase === 'B') {
    rubiksCube.up[0][0] = copyCube.right[0][2];
    rubiksCube.up[0][1] = copyCube.right[1][2];
    rubiksCube.up[0][2] = copyCube.right[2][2];

    rubiksCube.right[0][2] = copyCube.down[2][2];
    rubiksCube.right[1][2] = copyCube.down[2][1];
    rubiksCube.right[2][2] = copyCube.down[2][0];

    rubiksCube.down[2][0] = copyCube.left[0][0];
    rubiksCube.down[2][1] = copyCube.left[1][0];
    rubiksCube.down[2][2] = copyCube.left[2][0];

    rubiksCube.left[0][0] = copyCube.up[0][2];
    rubiksCube.left[1][0] = copyCube.up[0][1];
    rubiksCube.left[2][0] = copyCube.up[0][0];
  } else if (charUpperCase === 'D') {
    moveUpDown(char, copyCube);
  }

  consoleCube(rubiksCube);
}

function moveUpDown(char, cube) {
  let idx;
  let order = ['left', 'front', 'right', 'back'];

  char[0].toUpperCase() === 'U' ? (idx = 0) : (idx = 2);
  char[0].toUpperCase() === 'D' || char[1] === "'" ? (order = order.reverse()) : null;

  for (let i = 0; i < order.length; i++) {
    if (i !== order.length - 1) {
      rubiksCube[order[i]][idx] = cube[order[i + 1]][idx];
    } else {
      rubiksCube[order[i]][idx] = cube[order[0]][idx];
    }
  }
}

function moveLeftRight(char, cube) {
  let idx = [0, 2];
  let order = oderHelper(char);

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

function oderHelper(char) {
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

function moveLeftRightHelper(idx, order, cube, i, j) {
  if (i === 0 || i === 1) {
    rubiksCube[order[i]][j][idx[0]] = cube[order[i + 1]][j][idx[0]];
  } else if (i === 2) {
    rubiksCube[order[i]][j][idx[0]] = cube[order[i + 1]][Math.abs(j - 2)][idx[1]];
  } else {
    rubiksCube[order[i]][j][idx[1]] = cube[order[0]][Math.abs(j - 2)][idx[0]];
  }
}

/*
U -> W 회전, <- G <- R <- B <- O 변경 Y

L -> G 회전, W -> R -> Y -> O -> 변경 B
F -> R 회전, W -> B -> Y -> G -> 변경 O
R -> B 회전, <- W <- R <- Y <- O 변경 G
B -> O 회전, <- W <- B <- Y <- G 변경 R

D -> Y 회전, G -> R -> B -> O -> 변경 W
*/

turnCube('r');
// turnCube('d');

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
