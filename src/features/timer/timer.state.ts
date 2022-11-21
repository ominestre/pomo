import { createSlice } from '@reduxjs/toolkit';
import { Reducer } from 'react';
import { RootState } from '../../state/store';

export interface TimerState {
  seconds: number,
  minutes: number,
  isTimerActive: boolean,
}

export const initialState: TimerState = {
  seconds: 0,
  minutes: 25,
  isTimerActive: false,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => ({ ...state, isTimerActive: true }),
  },
});

export const selectTime = (state: RootState) => ({
  seconds: state.timer.seconds,
  minutes: state.timer.minutes,
});

export const { startTimer } = timerSlice.actions;

export default timerSlice.reducer;
