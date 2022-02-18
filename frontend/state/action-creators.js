import * as types from './action-types'
import axios from 'axios'

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise(value) { 
  return {type: types.MOVE_CLOCKWISE, payload: value}
}

export function moveCounterClockwise(value) {  
  return {type: types.MOVE_COUNTERCLOCKWISE, payload: value}
}

export function selectAnswer(answer_id) { 
  return {type:types.SET_SELECTED_ANSWER, payload: answer_id}
}

export function setMessage(message) { 
  return {type: types.SET_INFO_MESSAGE, payload: message}
}

export function setQuiz(question) { 
  return {type: types.SET_QUIZ_INTO_STATE, payload: question}
}

export function inputChange(value) { 
  return {type: types.INPUT_CHANGE, payload: value}
}

export function resetForm() { 
  return {type: types.RESET_FORM, payload: {}}
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get(`http://localhost:9000/api/quiz/next`)
    .then(res => {
      console.log(res)
      dispatch(setQuiz(res.data))
    })
    .catch(err => {
      console.log(err)
    })
  }
}
export function postAnswer() {
  return function (dispatch) {
    axios.post( `http://localhost:9000/api/quiz/answer`, { quiz_id, answer_id})
    .then(res => {
      console.log(res)
      dispatch(selectAnswer(null))
      dispatch(fetchQuiz())
      dispatch(setMessage(res.data.message))
    })
  }
}
export function postQuiz({
  question_text, 
  true_answer_text, 
  false_answer_text, 
}) {
  return function (dispatch) {
    console.log(question_text)
    axios.post(`http://localhost:9000/api/quiz/new`, {
      question_text, 
      true_answer_text, 
      false_answer_text, 
    })
    .then(res => {
      dispatch(setMessage(`"${res.data.question}"`))
      dispatch(resetForm)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
