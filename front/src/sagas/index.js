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
  
  export default function* () {
    yield fork(mainStudyWorkflow);
  }