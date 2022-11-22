import React from 'react';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import {
  selectTime,
  selectIsTimerActive,
  decrementTimer,
  stopTimer,
} from './timer.state';

function Timer() {
  const dispatch = useAppDispatch();

  let timerIntervalID: ReturnType<typeof setInterval>;

  const startTimerHandler = () => {
    timerIntervalID = setInterval(() => {
      const isTimerActive = useAppSelector(selectIsTimerActive);

      if (isTimerActive) {
        dispatch(decrementTimer());

        const { seconds, minutes } = useAppSelector(selectTime);

        if (minutes === 0 && seconds === 0) {
          dispatch(stopTimer());
          clearInterval(timerIntervalID);
        }
      }
    }, 1000);
  };

  const padLeadingZeros = (val: number | string): string =>
    `00${val}`.slice(-2);

  const { seconds, minutes } = useAppSelector(selectTime);
  const formattedTime = `${padLeadingZeros(minutes)}:${padLeadingZeros(seconds)}`;

  return (
    <div
      id="pomodoro-timer"
      className="container-fluid d-flex justify-content-center text-bg-secondary"
    >
      <span className="pomodoro-timer__time-display p-5 fs-1">{formattedTime}</span>

      <button
        className="pomodoro-timer__start-timer btn btn-success m-1 align-self-center"
        onClick={() => startTimerHandler()}
      >
        Start
      </button>

      <button
        className="pomodoro-timer__stop-timer btn btn-danger m-1 align-self-center"
      >
        Stop
      </button>

      <button
        className="pomodoro-timer__reset-timer btn btn-warning m-1 align-self-center"
      >
        Reset
      </button>
    </div>
  );
}

export default Timer;
