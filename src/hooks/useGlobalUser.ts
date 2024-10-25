import { useTypedSelector } from './useTypedSelector'

export const useGlobalUser = () => useTypedSelector(state => state.user)
