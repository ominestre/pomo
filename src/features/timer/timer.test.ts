import { describe, expect, xtest, test } from '@jest/globals';

import timerReducer, {
  startTimer,
  initialState,
  stopTimer,
  decrementTimer,
  resetTimer,
} from './timer.state';

describe('Timer state interactions', () => {
  test('starts the timer', () => {
    const actual = timerReducer(initialState, startTimer());
    expect(actual)
      .toMatchObject({
        isTimerActive: true,
      });
  });

  test('stops the timer', () => {
    const actual = timerReducer(initialState, stopTimer());
    expect(actual)
      .toMatchObject({
        isTimerActive: false,
      });
  });

  test('it decrements the timer from initial state', () => {
    const actual = timerReducer(initialState, decrementTimer());
    expect(actual)
      .toMatchObject({
        minutes: 24,
        seconds: 59,
      });
  });

  test('it decrements the timer at 22:30 to 22:29', () => {
    const actual = timerReducer(
      { ...initialState, seconds: 30, minutes: 22 },
      decrementTimer(),
    );

    expect(actual)
      .toMatchObject({
        minutes: 22,
        seconds: 29,
      });
  });

  test('resets time timer', () => {
    const actual = timerReducer(
      { ...initialState, seconds: 22, minutes: 7 },
      resetTimer(),
    );

    expect(actual)
      .toMatchObject({
        minutes: 25,
        seconds: 0,
      });
  });
});
