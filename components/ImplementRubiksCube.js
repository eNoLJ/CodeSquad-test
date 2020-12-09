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
    [color, color, color],
    [color, color, color],
    [color, color, color],
  ];
}

// 파일을 읽을 때 input 박스에 이벤트를 건다.
function init() {
  window.rubiksCube = {
    U: makeOneSideCube('W'),
    L: makeOneSideCube('G'),
    F: makeOneSideCube('R'),
    R: makeOneSideCube('B'),
    B: makeOneSideCube('O'),
    D: makeOneSideCube('Y'),
  };

  const inputValue = document.querySelector('#inputValue');
  inputValue.addEventListener('keypress', pressEnter);
}

init();
