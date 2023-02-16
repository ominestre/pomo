import { createSlice } from '@reduxjs/toolkit';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

type IntervalTimer = ReturnType<typeof setInterval>;

interface SessionLengths {
  work: number,
  shortBreak: number,
  longBreak: number,
}

export interface TimerState {
  minutes: number,
  seconds: number,
  isTimerActive: boolean,
  isTimerPaused: boolean,
  intervalID: IntervalTimer | null,
  timerMode: TimerMode,
  cyclesCompleted: number,
  sessionLength: SessionLengths,
}

export const initialState: TimerState = {
  minutes: 25,
  seconds: 0,
  isTimerActive: false,
  isTimerPaused: false,
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

    setCycleMode: (state, { payload }: { payload: TimerMode}) => ({
      ...state,
      timerMode: payload,
    }),

    tick: state => {
      const { minutes, seconds } = state;

      if (seconds === 0) {
        if (minutes === 0) return state;

        return { ...state, minutes: minutes - 1, seconds: 59 };
      }

      return { ...state, seconds: seconds - 1 };
    },

    startTimer: (state, { payload }: { payload: IntervalTimer }) => ({
      ...state,
      isTimerActive: true,
      isTimerPaused: false,
      intervalID: payload,
    }),

    stopTimer: state => {
      if (state.intervalID !== null) clearInterval(state.intervalID);

      return {
        ...state,
        isTimerActive: false,
        isTimerPaused: true,
        intervalID: null,
      };
    },

    resetTimer: (state: TimerState) => {
      if (state.intervalID !== null) clearInterval(state.intervalID);

      return {
        ...state,
        intervalID: null,
        isTimerActive: false,
        isTimerPaused: false,
        minutes: state.sessionLength[state.timerMode],
        seconds: 0,
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
  setCycleMode,
} = timerSlice.actions;

export default timerSlice.reducer;
