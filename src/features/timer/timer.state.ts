import { createSlice } from '@reduxjs/toolkit';
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
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => ({ ...state, isTimerActive: true }),

    stopTimer: (state) => ({ ...state, isTimerActive: false }),

    decrementTimer: (state) => {
      if (state.seconds === 0) {
        if (state.minutes === 0) {
          return { ...state, seconds: 0, minutes: 0 };
        }

        return { ...state, seconds: 59, minutes: state.minutes - 1 };
      }

      return { ...state, seconds: state.seconds - 1 };
    },

    resetTimer: (state) => ({
      ...state,
      minutes: initialState.minutes,
      seconds: initialState.seconds,
    }),
  },
});

export const selectTime = (state: RootState) => ({
  seconds: state.timer.seconds,
  minutes: state.timer.minutes,
});

export const selectIsTimerActive = (state: RootState) => state.timer.isTimerActive;

export const {
  startTimer,
  stopTimer,
  decrementTimer,
  resetTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
