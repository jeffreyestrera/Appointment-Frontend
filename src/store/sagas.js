import { all, fork } from "redux-saga/effects"

import Patient from "./Patient/saga"

export default function* rootSaga() {
  yield all([
    fork(Patient),
  ])
}