## 기본 Template 컴포넌트 변경 (Class ->  Function)

### 이유
  - 프로젝트 진행시 추가할 컴포넌트들을 Function component로 통일하기 위해서 (참조하는 오픈소스의 기본은 class 컴포넌트)

### 과정
  - [How to convert a React Class Component to a Function Component](https://nimblewebdeveloper.com/blog/convert-react-class-to-function-component)

### 어려웠던 점
  - redux의 전역상태를 가져오는 부분을 변경하기.
    - 과정
      - [connect](https://react-redux.js.org/api/connect) -> [useSelector()](https://react-redux.js.org/api/hooks)  
