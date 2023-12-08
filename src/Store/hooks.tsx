import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { commonState, AppDispatch } from './store'

export const useAppSelector: TypedUseSelectorHook<commonState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
