const initialState = {
  profile_Token:'',
  user_id:''
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


    default:
      return state
  }
}
