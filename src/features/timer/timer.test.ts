import {
  describe,
  expect,
  test,
} from '@jest/globals';

import timerReducer, {
  TimerState,
  initialState,
  resetTimer,
  stopTimer,
  startTimer,
  tick,
  completeCycle,
} from './timer.state';

describe('Timer state interactions', () => {
  describe('Timer mode switching', () => {
    test('Should swap from work mode to short break', () => {
      expect(timerReducer(initialState, completeCycle()))
        .toMatchObject({
          timerMode: 'shortBreak',
          cyclesCompleted: 1,
          intervalID: null,
          isTimerActive: false,
          minutes: initialState.sessionLength.shortBreak,
          seconds: 0,
        });
    });

    test('Should swap from short break to work mode', () => {
      const state: TimerState = { ...initialState, cyclesCompleted: 1, timerMode: 'shortBreak' };

      expect(timerReducer(state, completeCycle()))
        .toMatchObject({
          timerMode: 'work',
          cyclesCompleted: 1,
          intervalID: null,
          isTimerActive: false,
          minutes: initialState.sessionLength.work,
          seconds: 0,
        });
    });

    test('Should swap from work mode to long break', () => {
      const state: TimerState = { ...initialState, cyclesCompleted: 3, timerMode: 'work' };

      expect(timerReducer(state, completeCycle()))
        .toMatchObject({
          timerMode: 'longBreak',
          cyclesCompleted: 4,
          intervalID: null,
          isTimerActive: false,
          minutes: initialState.sessionLength.longBreak,
          seconds: 0,
        });
    });

    test('Should swap from long break to work', () => {
      const state: TimerState = { ...initialState, cyclesCompleted: 4, timerMode: 'longBreak' };

      expect(timerReducer(state, completeCycle()))
        .toMatchObject({
          timerMode: 'work',
          cyclesCompleted: 4,
          intervalID: null,
          isTimerActive: false,
          minutes: initialState.sessionLength.work,
          seconds: 0,
        });
    });
  });

  describe('Timer ticking', () => {
    test('Should tick down 1 second and roll over a minute', () => {
      expect(timerReducer(initialState, tick()))
        .toMatchObject({ minutes: 24, seconds: 59 });
    });

    test('Should tick down 1 second', () => {
      const state: TimerState = { ...initialState, minutes: 22, seconds: 47 };

      expect(timerReducer(state, tick()))
        .toMatchObject({ minutes: 22, seconds: 46 });
    });

    test('Should do nothing if the timer is already completed', () => {
      const state: TimerState = { ...initialState, minutes: 0, seconds: 0 };

      expect(timerReducer(state, tick()))
        .toMatchObject({ minutes: 0, seconds: 0 });
    });
  });

  describe('Timer reset', () => {
    test('Should reset to 25 minutes in work mode', () => {
      const state: TimerState = { ...initialState, minutes: 23 };

      expect(timerReducer(state, resetTimer()))
        .toMatchObject({
          isTimerActive: false,
          minutes: 25,
          seconds: 0,
          intervalID: null,
        });
    });

    test('Should reset to 5 minutes in short break mode', () => {
      const state: TimerState = { ...initialState, minutes: 3, timerMode: 'shortBreak' };

      expect(timerReducer(state, resetTimer()))
        .toMatchObject({
          isTimerActive: false,
          minutes: 5,
          seconds: 0,
          intervalID: null,
        });
    });

    test('Should reset to 15 minutes in long break mode', () => {
      const state: TimerState = { ...initialState, minutes: 2, timerMode: 'longBreak' };

      expect(timerReducer(state, resetTimer()))
        .toMatchObject({
          isTimerActive: false,
          minutes: 15,
          seconds: 0,
          intervalID: null,
        });
    });
  });

  test('Should start and stop a new timer', () => {
    const state: TimerState = { ...initialState };
    const intervalID = setInterval(() => {}, 1000);
    const newState = timerReducer(state, startTimer(intervalID));

    expect(newState).toMatchObject({ isTimerActive: true, intervalID });

    expect(timerReducer(newState, stopTimer()))
      .toMatchObject({ isTimerActive: false, intervalID: null });
  });
});
