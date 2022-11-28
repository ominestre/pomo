import { useAppDispatch, useAppSelector } from '../../state/hooks';
import * as timerState from './timer.state';

const padLeadingZeros = (val: number | string): string =>
  `00${val}`.slice(-2);

export const Timer = () => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(state => state.timer);

  const formatTime = () => {
    const minutes = padLeadingZeros(currentState.minutes);
    const seconds = padLeadingZeros(currentState.seconds);
    return `${minutes}:${seconds}`;
  };

  const stopTimer = () => dispatch(timerState.stopTimer());

  const tick = () => dispatch(timerState.tick());

  const resetTimer = () => dispatch(timerState.resetTimer());

  const startTimer = () => {
    const intervalID = setInterval(() => {
      if (currentState.minutes > 0 || currentState.seconds > 0) tick();
      else stopTimer();
    }, 1000);

    dispatch(timerState.startTimer(intervalID));
  };

  return (
    <div
      id="pomodoro-timer"
      className="container-fluid d-flex flex-wrap justify-content-center text-bg-secondary py-5"
    >
      <div className="pomodoro-timer__timer-display">
        <span className="pomodoro-timer__time-display px-5 fs-1 fw-semibold">{formatTime()}</span>
      </div>

      <div className="pomodoro-timer__controls d-flex flex-nowrap">
        <button
          className="pomodoro-timer__start-timer btn btn-success m-1 align-self-center"
          onClick={startTimer}
        >
          Start
        </button>

        <button
          className="pomodoro-timer__stop-timer btn btn-danger m-1 align-self-center"
          onClick={stopTimer}
        >
          Stop
        </button>

        <button
          className="pomodoro-timer__reset-timer btn btn-warning m-1 align-self-center"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
