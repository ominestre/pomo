import { createSlice } from '@reduxjs/toolkit';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

type IntervalTimer = ReturnType<typeof setInterval>;

interface SessionLengths {
  work: number,
  shortBreak: number,
  longBreak: number,
}

interface StartTimerPayload {
  payload: IntervalTimer,
  [key: string]: any,
}

export interface TimerState {
  minutes: number,
  seconds: number,
  isTimerActive: boolean,
  intervalID: IntervalTimer | null,
  timerMode: TimerMode,
  cyclesCompleted: number,
  sessionLength: SessionLengths,
}

export const initialState: TimerState = {
  minutes: 25,
  seconds: 0,
  isTimerActive: false,
  intervalID: null,
  timerMode: 'work',
  cyclesCompleted: 0,
  sessionLength: {
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  },
};

export const timerSlice = createSlice({
  name: 'timer',

  initialState,

  reducers: {
    completeCycle: state => {
      if (state.intervalID !== null) clearInterval(state.intervalID);

      let newTimerMode: TimerMode = 'work';
      const { timerMode, cyclesCompleted } = state;

      if (timerMode === 'work') {
        if (cyclesCompleted !== 0 && (cyclesCompleted + 1) % 4 === 0) {
          newTimerMode = 'longBreak';
        } else {
          newTimerMode = 'shortBreak';
        }
      }

      return {
        ...state,
        intervalID: null,
        cyclesCompleted: state.timerMode === 'work'
          ? state.cyclesCompleted + 1
          : state.cyclesCompleted,
        isTimerActive: false,
        seconds: 0,
        minutes: state.sessionLength[newTimerMode],
        timerMode: newTimerMode,
      };
    },

    tick: state => {
      const { minutes, seconds } = state;

      if (seconds === 0) {
        if (minutes === 0) return state;

        return { ...state, minutes: minutes - 1, seconds: 59 };
      }

      return { ...state, seconds: seconds - 1 };
    },

    startTimer: (state, { payload }: StartTimerPayload) => ({
      ...state,
      isTimerActive: true,
      intervalID: payload,
    }),

    stopTimer: state => {
      if (state.intervalID !== null) clearInterval(state.intervalID);

      return { ...state, isTimerActive: false, intervalID: null };
    },

    resetTimer: (state: TimerState) => {
      if (state.intervalID !== null) clearInterval(state.intervalID);

      return {
        ...state,
        intervalID: null,
        isTimerActive: false,
        minutes: state.sessionLength[state.timerMode],
      };
    },
  },
});

export const {
  resetTimer,
  stopTimer,
  startTimer,
  tick,
  completeCycle,
} = timerSlice.actions;

export default timerSlice.reducer;
