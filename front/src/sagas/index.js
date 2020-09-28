import {
    all,
    fork,
    take,
    select,
    delay,
    put,
    call,
    takeLatest
  } from "redux-saga/effects";
  import { getType } from "typesafe-actions";
  import * as Actions from "../actions";
  import * as Api from "../apis/orders";
  
  function* mainStudyWorkflow() {

        yield take(getType(Actions.startMain()));

        const currentDate = yield select(state => state.currentDate);
        console.log('this is saga inner !! ');
        console.log(currentDate)
    
  
        try {        
          const [studyResp] = yield all([
            call(() => Api.requestStudiesInRange(currentDate.startStr, currentDate.endStr))
          ]);

          console.log('here')
          console.log(JSON.stringify(studyResp));

          console.log('## 1 ##')
          console.log(Actions.selectMainStudies());

          console.log('## 2 ##')
          console.log(Actions.selectMainStudies()(studyResp));

          console.log('## 3 ##')

          const result = Actions.selectMainStudies()().payload;
          console.log(typeof result)
          console.log(result);
          




          yield put(
            Actions.selectMainStudies()(studyResp)
          );
        } catch (e) {
            throw new Error(e);
        }
  
        const { mainStudyList } = yield select(state => state.mainStudyList);
        console.log('### mainStudyList');
        console.log(JSON.stringify(mainStudyList));        
  }
  
  export default function* () {
    yield fork(mainStudyWorkflow);
  }