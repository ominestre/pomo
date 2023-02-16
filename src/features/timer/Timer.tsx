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
    if (!currentState.isTimerActive) {
      const intervalID = setInterval(() => {
        if (currentState.minutes > 0 || currentState.seconds > 0) tick();
        else stopTimer();
      }, 1000);

      dispatch(timerState.startTimer(intervalID));
    }
  };

  const selectMode = (mode: 'work' | 'shortBreak' | 'longBreak') =>
    () => {
      dispatch(timerState.setCycleMode(mode));
      dispatch(timerState.resetTimer());
    };

  return (
    <div id="pomodoro-timer" className="pomodoro-timer">
      <div className="pomodoro-timer__mode-display">
        <button className={(currentState.timerMode === 'work' ? 'active' : '')} onClick={selectMode('work')}>
          Work
        </button>
        <button className={(currentState.timerMode === 'shortBreak' ? 'active' : '')} onClick={selectMode('shortBreak')}>
          Short Break
        </button>
        <button className={(currentState.timerMode === 'longBreak' ? 'active' : '')} onClick={selectMode('longBreak')}>
          Long Break
        </button>
      </div>

      <div className="pomodoro-timer__timer-display">
        <span className={
          (currentState.isTimerActive ? 'active' : '') + (currentState.isTimerPaused ? 'paused' : '')
        }>
        {formatTime()}
        </span>
      </div>

      <div className="pomodoro-timer__controls">
        <button className="pomodoro-timer__start-timer" onClick={startTimer}>
          Start
        </button>

        <button className="pomodoro-timer__stop-timer" onClick={stopTimer}>
          Stop
        </button>

        <button className="pomodoro-timer__reset-timer" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
