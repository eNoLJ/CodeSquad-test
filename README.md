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
- deleteEvent 함수는 Q가 입력 될 시 걸려 있던 이벤트를 삭제 한다.
