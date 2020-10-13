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
  import * as Api from "../apis/studyInfos";
  
  function* mainStudyWorkflow() {

    const currentDate = yield select(state => state.currentDate);   

    try {        
      const [studyResp] = yield all([
        call(() => Api.requestStudiesInRange(currentDate.startStr, currentDate.endStr))
      ]);

      yield put(
        Actions.selectMainStudies()(studyResp)
      );
    } catch (e) {
        throw new Error(e);
    }

  }

  function* startMain() {
    yield takeLatest(getType(Actions.startMain()), mainStudyWorkflow);
  }
  
  export default function* () {
    yield fork(startMain);
  }