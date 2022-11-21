import { describe, expect, xtest, test } from '@jest/globals';

import timerReducer, {
  startTimer,
  initialState,
} from './timer.state';

describe('Timer feature', () => {
  test('starts the timer', () => {
    const actual = timerReducer(initialState, startTimer());
    expect(actual)
      .toMatchObject({
        isTimerActive: true,
      });
  });

  xtest('stops the timer', () => {});
  xtest('resets time timer', () => {});
});
