import { takeEvery, put, call } from "redux-saga/effects"

import {
  GET_PATIENTS
} from "./actionTypes"

import {
  getPatients,
  getPatientsFail,
  getPatientsSuccess
} from "./actions"

import {
  GetPatients
} from "../_Api/Patient"

function* fetchPatients(){
  try {
    const response = yield call(GetPatients)
    yield put(getPatientsSuccess(response))
  } catch (error) {
    yield put(getPatientsFail(error))
  }
}

function* PatientsSaga() {
  yield takeEvery(GET_PATIENTS, fetchPatients)
}

export default PatientsSaga