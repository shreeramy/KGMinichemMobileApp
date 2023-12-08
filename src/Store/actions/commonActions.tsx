import _ from 'lodash'

export const updateIsLogin = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'updateIsLogin',
      payload
    })
  }
}
export const profileToken = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'profileToken',
      payload
    })
  }
  
} 
export const userId = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'userId',
      payload
    })
  }
  
} 


