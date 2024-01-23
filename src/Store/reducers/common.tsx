const initialState = {
  profile_Token: '',
  user_id: '',
  filterItems: [],
  orderModeData: [],
  deliveryModeData: [],
  invoiceModeData: [],
  paymentModeData: []

}

export default function common(state = initialState, action: any = {}) {
  switch (action.type) {
    case 'profileToken': {
      return {
        ...state,
        profile_Token: action.payload
      }
    }
    case 'userId': {
      return {
        ...state,
        user_id: action.payload
      }
    }

    case 'filterItemAction': {
      return {
        ...state,
        filterItems: action.payload
      }
    }

    case 'setOrderModeAction': {
      return {
        ...state,
        orderModeData: action.payload
      }
    }

    case 'setDeliveryModeAction': {
      return {
        ...state,
        deliveryModeData: action.payload
      }
    }

    case 'setInvoiceModeAction': {
      return {
        ...state,
        invoiceModeData: action.payload
      }
    }

    case 'setPaymentModeAction': {
      return {
        ...state,
        paymentModeData: action.payload
      }
    }

    default:
      return state
  }
}
