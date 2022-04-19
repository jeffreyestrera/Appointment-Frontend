import {
  GET_PATIENTS,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAIL
} from "./actionTypes"

export const getPatients = () =>({
  type: GET_PATIENTS,
});

export const getPatientsSuccess = patients =>({
  type: GET_PATIENTS_SUCCESS,
  payload: patients,
});

export const getPatientsFail = error =>({
  type: GET_PATIENTS_FAIL,
  payload: error,
});