import { createSlice } from '@reduxjs/toolkit';
import { Reducer } from 'react';
import { RootState } from '../../state/store';

export interface TimerState {
  seconds: number,
  minutes: number,
  isTimerActive: boolean,
}

const initialState: TimerState = {
  seconds: 0,
  minutes: 25,
  isTimerActive: false,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    decrementTimer: (state) => {
      if (state.seconds === 0) {
        if (state.minutes === 0) {
          state.minutes = 0;
          state.seconds = 0;
        } else {
          state.minutes--;
          state.seconds = 59;
        }
      } else {
        state.seconds--;
      }
    },
  },
});

export const selectTime = (state: RootState) => ({
  seconds: state.timer.seconds,
  minutes: state.timer.minutes,
});

export const { decrementTimer } = timerSlice.actions;

export default timerSlice.reducer;
