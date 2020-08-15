  ## Back
    
   - express
      - node.js를 빠르고 편하게 사용하기위한 웹 프레임워크
      - [(참조)](https://ithub.tistory.com/32)
    
   - mongoose
      - MongoDB를 다루기 위한 ODM(Object-Document-Mapper). 
      - 소스에서 Document를 객체지향 개념으로 사용하고자 하는 목적으로 만들었다. 
      - [(참조)](https://fabxoe.tistory.com/50)
    
   - nodemon
      - server에서 소스코드 변경 시, 재기동하지 않아도 가능하도록
    
   - cors
      - cors(Cross-Origin Resource Sharing) 해결하기위해 다운
      - ```cors_origin``` 변수에 접근 허용을 위한 ip기입, 해당 변수 참조하여 index.js에 cors설정
  
  ## Client
   - create-react-app
      - react 사용하려고 다운
   - react-router-dom
      - 페이지 이동시 react-router-dom 사용하려고 다운
   - axios
      - 비동기 통신
  
  ## Common
    
   - concurrently
      - back & client 서버 동시 수행 시키기
      - root package.json의 script에 ```"dev": "concurrently \"npm run backend\" \"npm run start --prefix client\""``` 추가
