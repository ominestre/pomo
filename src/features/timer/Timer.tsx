import React from 'react';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { selectTime } from './timer.state';

const padLeadingZeros = (val: number | string): string =>
  `00${val}`.slice(-2);

function Timer() {
  const { seconds, minutes } = useAppSelector(selectTime);
  const formattedTime = `${padLeadingZeros(minutes)}:${padLeadingZeros(seconds)}`;

  return (
    <div
      id="pomodoro-timer"
      // className="pomodoro-timer px-4 py-5 my-5 text-center text-bg-secondary d-flex"
      className="container-fluid d-flex justify-content-center text-bg-secondary"
    >
      <span className="pomodoro-timer__time-display p-5 fs-1">{formattedTime}</span>
      <button className="pomodoro-timer__start-timer btn btn-success m-1 align-self-center">Start</button>
      <button className="pomodoro-timer__stop-timer btn btn-danger m-1 align-self-center">Stop</button>
      <button className="pomodoro-timer__reset-timer btn btn-warning m-1 align-self-center">Reset</button>
    </div>
  )
}

export default Timer;
