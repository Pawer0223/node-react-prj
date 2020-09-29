## redux-saga적용하기

### 이유
- 우아한 테크러닝 강의를 들으며 saga가 적용된 어플리케이션을보고 편해보여서 !
- 최초 redux로만 했을 때, 연속해서 api를 호출해야하는 경우가 있었는데 saga를 적용하면 훨씬 가독성도 좋고 작업 순서의 제어도 가능할것이라고 생각해서 !

### 과정
- 강의에서 진행한 실습 코드의 구조를 기반으로.
  - [참조 1](https://codesandbox.io/s/ordermonitor04-forked-rc5y6?file=/src/sagas/index.ts:0-696)
  - [참조 2](https://codesandbox.io/s/ordermonitor08-forked-ir1u1?file=/src/actions/index.ts:9-21)

### 어려웠던 점
- action객체 생성을 `typesafe-actions`의 createAction을 사용하면서 삽질 함...
  - 반드시 resolve함수가 호출되어야 하는줄 착각했다...
    - createAction메서드의 2번째 인자 값은 함수이다.
      - 이 함수의 return된 값이 payload속성의 값으로 저장된다.
      - [참조](https://github.com/piotrwitek/typesafe-actions#createaction)
