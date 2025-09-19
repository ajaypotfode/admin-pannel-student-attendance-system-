import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'


const ReduxHook = () => {
    const useAppDispatch = useDispatch.withTypes<AppDispatch>();
    const useAppSelector = useSelector.withTypes<RootState>();

    return {
        useAppDispatch,
        useAppSelector
    }
}

export const { useAppDispatch, useAppSelector } = ReduxHook();

export default ReduxHook