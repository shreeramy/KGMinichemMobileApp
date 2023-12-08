import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import common from './reducers/common'

const AppReducers = combineReducers({ common })

const rootReducer = (state: any, action: any) => {
  return AppReducers(state, action)
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

// eslint-disable-next-line no-undef
export type commonState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
