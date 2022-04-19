import {
  GET_PATIENTS_FAIL,
  GET_PATIENTS_SUCCESS
} from "./actionTypes"

const INIT_STATE = {
  patients: [],
  error: {},
}

const Patients = (state = INIT_STATE, action) => {
  switch(action.type){
    case GET_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: action.payload,
      }
    case GET_PATIENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default Patients