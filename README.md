# CodeSquad-test

### 단계별로 루빅스 큐브 구현

- 단계별로 루빅스 큐브를 구현한다.
- 할 수 있는 단계까지만 구현한다.
- 단계별로 지정된 코딩 요구사항을 적용한다.
- 단계별로 구현한 코드 동작에 대해 README.md에 정리한다.
- 특별히 명시되지 않은 부분은 자유롭게 구현한다.

### 실행 방법

index.html을 웹브라우저를 통해 실행 시킨다.

## Stpe-1 단어 밀어내기 구현하기

- 입력: 사용자로부터 단어 하나, 정수 숫자 하나( -100 <= N < 100) , L 또는 R을 입력받는다. L 또는 R은 대소문자 모두 입력 가능하다.
- 주어진 단어를 L이면 주어진 숫자 갯수만큼 왼쪽으로, R이면 오른쪽으로 밀어낸다.
- 밀려나간 단어는 반대쪽으로 채워진다.

### 시작

- init 함수에서 입력창에 pressEnter 함수 이벤트를 건다.
- pressEnter 함수는 입력창의 값을 받아 유효성 검사 함수인 validateInputValue 함수로 전달 한다.

### 유효성 검사

- validateInputValue 함수와 함꼐 validateInteger, validateCommand 함수로 유효성 감사를 시작한다.
  > - 공백일 때,
  > - 입력 항목이 3가지 이상 일 때,
  > - -100 이상 100 미만의 정수가 아닐 때(validateInteger),
  > - 명령문이 r,l,R,L이 아닐 때(validateCommand), 경고창을 띄우게 된다.
- 모든 유효성 검사가 통과되면 값을 shovTheWord 함수로 전달 한다.

### 문자 재조합

- validateInputValue에서 넘어온 값으로 문자 재조합을 시작한다.
- 입력 받은 숫자가 음수인지 양수인지 확인하여 명령을 반환해주는 checkCommand 함수가 실행 된다.
- 반환 된 명령으로 입력 받은 숫자만큼 단어를 밀어 낸 후 showResult 함수로 값을 전달 한다.

### 결과 출력

- showResult 함수에서는 dom을 이용하여 입력 받은 값을 브라우저 화면에 띄워주게 된다.

## Stpe-2 평면 큐브 구현하기

- 2차원 배열을 아래 명령에 따라 동작하는 프로그램을 구현 한다.
  > - U 가장 윗줄을 왼쪽으로 한 칸 밀기 RRW -> RWR
  > - U' 가장 윗줄을 오른쪽으로 한 칸 밀기 RRW -> WRR
  > - R 가장 오른쪽 줄을 위로 한 칸 밀기 WWB -> WBW
  > - R' 가장 오른쪽 줄을 아래로 한 칸 밀기 WWB -> BWW
  > - L 가장 왼쪽 줄을 아래로 한 칸 밀기 RGG -> GRG (L의 경우 R과 방향이 반대임을 주의한다.)
  > - L' 가장 왼쪽 줄을 위로 한 칸 밀기 RGG -> GGR
  > - B 가장 아랫줄을 오른쪽으로 한 칸 밀기 GBB -> BGB (B의 경우도 U와 방향이 반대임을 주의한다.)
  > - B' 가장 아랫줄을 왼쪽으로 한 칸 밀기 GBB -> BBG
  > - Q Bye~를 출력하고 프로그램을 종료한다.

### 시작

- init 함수에서 2차원 배열을 만든다.
- init 함수에서 입력창에 pressEnter 함수 이벤트를 건다.
- pressEnter 함수는 입력창의 값을 받아 유효성 검사 함수인 validateInputValue 함수로 전달 한다.

### 유효성 검사

- validateInputValue 함수와 함꼐 validateChar 함수로 유효성 감사를 시작한다.
  > - 공백일 때,
  > - 첫번째 자리가 올바른 명령 문자가 아닐 때,
  > - 입력 받은 문자가 명령 문자가 아닐 때(validateChar),
  > - "'"가 연속으로 입력 될 때,
  > - Q 다음에 문자가 입력 될 때, 경고창을 띄우게 된다.
- 모든 유효성 검사가 통과되면 값을 recombinantString 함수로 전달 한다.

### 평면 큐브 재조합

- validateInputValue 함수에서 넘어온 값으로 평면 큐브 재조합을 시작한다.
- recombinantString 함수에서 명령 문자와 "'"를 구분하여 재조합해 반환 한다.
- pushFlatCube 함수에서 2차원 배열로 되어 있는 평면 큐브를 명령에 따라 pushLine, makeFlatCube 함수를 이용하여 밀어낸다.
- pushLine 함수는 입력 받은 값을 재조합 후 반환 한다.
- makeFlatCube 함수에서는 실직적으로 큐브를 만들어 2차원 배열에 적용 한다.
- 재조합이 완료 된 배열을 showResult 함수로 전달 한다.

### 결과 출력

- showResult 함수에서는 cubeToString 함수와 dom을 이용하여 입력 받은 값을 브라우저 화면에 띄워주게 된다.
- cubeToString 함수는 배열을 문자열로 만들어 반환 한다.
- 한번에 여러 명령이 입력 될 시 0.5초 간격으로 브라우저에 출력 된다.

### 이벤트 삭제

- Q가 입력 될 시 deleteEvent 함수가 실행되며 이는 입력창에 걸려 있던 이벤트를 삭제하게 된다.

## Stpe-3 루빅스 큐브 구현하기

- 참고 링크를 참고해서 루빅스 큐브를 구현한다.
- 큐브는 W, B, G, Y, O, R의 6가지 색깔을 가지고 있다.
- 입력: 각 조작법을 한 줄로 입력받는다.
- 출력: 큐브의 6면을 펼친 상태로 출력한다.
- Q를 입력받으면 프로그램을 종료하고, 조작 받은 명령의 갯수를 출력시킨다
  > - 레드(R)를 기준으로 입력한다.
  > - F – 앞 (Front)
  > - R – 오른쪽 (Right)
  > - U – 위 (Up)
  > - B – 뒤 (Back)
  > - L – 왼쪽 (Left)
  > - D – 아랫쪽 (Down)
  > - 명령 뒤에 "'"가 있다면 반대 방향으로 회전
  > - 명령 뒤에 2가 있다면 2번 회전(주의: 조작 갯수는 1이 올라 간다. ex)R2)

### 시작

- init 함수에서 makeOneSideCube 함수를 이용하여 각 면에 대한 객체를 만든다. 객체의 값들은 2차원 배열로 되어있다.
- makeOneSideCube 함수는 색을 입력 받아 2차원 배열로 만들어 반환 한다.
- init 함수에서 입력창에 pressEnter 함수 이벤트를 건다.
- pressEnter 함수는 입력창의 값을 받아 유효성 검사 함수인 validateInputValue 함수로 전달 한다.

### 유효성 검사

- validateInputValue 함수와 함꼐 validateChar 함수로 유효성 감사를 시작한다.
  > - 공백일 때,
  > - 첫번째 자리가 올바른 명령 문자가 아닐 때,
  > - 입력 받은 문자가 명령 문자가 아닐 때(validateChar),
  > - - “’”일 경우 전 문자가 올바른 명령문자가 아니거나 다음 문자가 숫자일 때,
  > - - 숫자 2일 경우 전 문자가 명령문자가 아닐 때,
  > - Q 다음에 문자가 입력 될 때, 경고창을 띄우게 된다.
- 모든 유효성 검사가 통과되면 값을 recombinantString 함수로 전달 한다.

### 루빅스 큐브 재조합

- validateInputValue 함수에서 넘어온 값으로 평면 큐브 재조합을 시작한다.
- recombinantString 함수에서 명령 문자와 "'"와 2를 구분하여 재조합해 반환 한다.
- pushRubiksCube 함수에서 객체의 각면을 명령에 따라 turnCube 함수를 이용하여 객체를 재조합 한다.
- turnCube 함수에서는 convertChar, turnClock, turnCounterClock,moveSide 함수를 이용하여 큐브를 회전 시킨다.
- convertChar 함수는 입력 받은 문자를 객체명으로 바꿔서 반환 한다.
- turnClock 함수는 입력받은 해당 면을 시계 방향으로 회전 시킨다.
- turnCounterClock 함수는 입력받은 해당 면을 반시계 방향으로 회전 시킨다.
- moveSide 함수는 입력받은 면 주위에 사면을 moveUpDown, moveLeftRight, moveFrontBack 함수를 이용하여 재조합 한다.
- moveUpDown 함수는 u, d가 입력 될 시 left, front, right, back 면을 재조합 한다.
- moveLeftRight 함수는 l, r이 입력 될 시 leftRightOderHelper, moveLeftRightHelper 함수를 이용하여 down, front, up, back 면을 재조합 한다.
- leftRightOderHelper 함수는 order 변수의 순서를 바꿔 반환 한다.
- moveLeftRightHelper 함수는 실질적으로 면을 바꿔준다.
- moveFrontBack 함수는 f, b가 입력 될 시 frontBackOderHelper, moveFrontBackHelper 함수를 이용하여 up, left, down, right 면을 재조합 한다.
- frontBackOderHelper 함수는 order 변수의 순서를 바꿔 반환 한다.
- moveFrontBackHelper 함수는 실질적으로 면을 바꿔준다.
- 큐브 재조합이 완료 되면 showResult 함수를 실행 시킨다.

### 결과 출력

- showResult 함수에서는 cubeToString 함수를 이용하여 입력 받은 값을 브라우저 화면에 띄워주게 된다.
- cubeToString 함수는 lineToString, blankOutput, makeDom 함수를 이용하여 객체의 면들을 전개도로로 만들어 반환 한다.
- lineToString 함수는 한 면의 한 줄을 문자열로 전환하여 반환 한다.
- blankOutput 함수는 입력 받은 숫자만큼 공백을 만들어 반환 한다.
- makeDom 함수는 타겟 태그, 만들 태그, 만들 클래스이름, 넣을 내용을 입력 받아 타겟태그의 첫번째 노드로 삽입 한다.
- 한번에 여러 명령이 입력 될 시 0.5초 간격으로 브라우저에 출력 된다.

### 이벤트 삭제

- Q가 입력 될 시 deleteEvent 함수가 실행되며 이는 입력창과 버튼에 걸려 있던 모든 이벤트를 삭제하게 된다.

### 랜덤 섞기

- clickShuffleButton 함수는 changeInitialCube, shuffleCube 함수를 이용하여 1 ~ 99 사이의 정수를 입력 후 섞기 버튼 클릭 시 받은 숫자만큼 무작위로 큐브를 재조합 한다.
- changeInitialCube 함수는 섞기 버튼 클릭 시 초기상태를 변경한다.
- shuffleCube 함수는 입력받은 숫자만큼 랜덤으로 큐브를 섞게 된다.
- clickRandomShuffleButton 함수는 랜덤섞기 버튼 클릭 시 20번 큐브가 섞이게 된다.

### 경과시간 출력

- fineElapseTime 함수는 현재 시간을 체크하여 기존 시간(처음 커맨드 입력 시간)에서 경과한 시간을 반환 한다.

### 축하 메세지 띄우기

- clearMessage 함수는 checkCube 함수에서 반환된 boolean 값을 체크하여 큐브 전면이 맞추어졌는지 판단 후 축하 메세지를 띄우게 된다.
- checkCube 함수는 checkSide 함수를 이용하여 한면의 색이 모두 같은지 확인 후 boolean값을 반환 한다.
