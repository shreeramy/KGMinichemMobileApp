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

export const filterItemAction = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'filterItemAction',
      payload
    })
  }

}
export const setOrderModeAction = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'setOrderModeAction',
      payload
    })
  }

}

export const setDeliveryModeAction = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'setDeliveryModeAction',
      payload
    })
  }

}
export const setInvoiceModeAction = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'setInvoiceModeAction',
      payload
    })
  }

}
export const setPaymentModeAction = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'setPaymentModeAction',
      payload
    })
  }

}