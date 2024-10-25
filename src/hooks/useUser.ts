import { useTypedSelector } from './useTypedSelector'

export const useUser = () => useTypedSelector(state => state.user.user)
