import { useEffect, useRef } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  RestartAlt as RestartIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import * as timerState from './timer.state';
import alarmOne from '../../audio/alarm-001.mp3';

const padLeadingZeros = (val: number | string): string =>
  `00${val}`.slice(-2);

export const Timer = () => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(state => state.timer);
  const intervalID = useRef<number>();

  const formatTime = () => {
    const minutes = padLeadingZeros(currentState.minutes);
    const seconds = padLeadingZeros(currentState.seconds);
    return `${minutes}:${seconds}`;
  };

  const stopTimer = () => {
    if (currentState.isTimerActive) {
      dispatch(timerState.stopTimer());
    }
  };

  const resetTimer = () => dispatch(timerState.resetTimer());

  const startTimer = () => dispatch(timerState.startTimer());

  const selectMode = (mode: 'work' | 'shortBreak' | 'longBreak') =>
    () => {
      dispatch(timerState.setCycleMode(mode));
      dispatch(timerState.resetTimer());
    };

  useEffect(
    () => {
      const alarmAudio = new Audio(alarmOne);
      intervalID.current = window.setInterval(() => {
        const hasTimeLeft = currentState.minutes > 0 || currentState.seconds > 0;

        if (currentState.isTimerActive && hasTimeLeft) dispatch(timerState.tick());

        if (currentState.isTimerActive && !hasTimeLeft) {
          alarmAudio.play();
          window.clearInterval(intervalID.current);
          dispatch(timerState.completeCycle());
        }
      }, 1000);

      return () => window.clearInterval(intervalID.current);
    },
    [
      currentState.isTimerActive,
      currentState.minutes,
      currentState.seconds,
      dispatch,
    ],
  );

  return (
    <div id="pomodoro-timer" className="pomodoro-timer">
      <div className="pomodoro-timer__mode-display">
        <ButtonGroup variant="contained" aria-label="timer work mode button group">
          <Button
            onClick={selectMode('work')}
            className={(currentState.timerMode === 'work' ? 'active' : '')}
          >Work</Button>

          <Button
            onClick={selectMode('shortBreak')}
            className={(currentState.timerMode === 'shortBreak' ? 'active' : '')}
          >Short Break</Button>

          <Button
            onClick={selectMode('longBreak')}
            className={(currentState.timerMode === 'longBreak' ? 'active' : '')}
          >Long Break</Button>
        </ButtonGroup>
      </div>

      <div className="pomodoro-timer__timer-display">
        { currentState.isTimerActive && <PlayArrowIcon fontSize="large" /> }
        { currentState.isTimerPaused && <PauseIcon fontSize="large" /> }

        <span className="timer">{formatTime()}</span>
      </div>

      <div className="pomodoro-timer__controls">
        <Button onClick={startTimer} aria-label="start timer" variant="contained" color="success">
          <PlayArrowIcon fontSize="large" />
        </Button>

        <Button onClick={stopTimer} aria-label="stop timer" variant="contained" color="error">
          <PauseIcon fontSize="large" />
        </Button>

        <Button onClick={resetTimer} aria-label="reset timer" variant="contained" color="info">
          <RestartIcon fontSize="large" />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
