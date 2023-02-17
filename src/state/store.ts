import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import timerReducer from '../features/timer/timer.state';
import pagerReducer from '../features/pager/pager.state';
import tasksReducer from '../features/tasks/tasks.state';

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    pager: pagerReducer,
    tasks: tasksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
