import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { ReduxDispatch, ReduxState } from './index';

export const useAppDispatch: () => ReduxDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;
