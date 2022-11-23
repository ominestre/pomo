import React from 'react';

interface TimerProps {
  sessionLength?: {
    work?: number,
    shortBreak?: number,
    longBreak?: number,
  }
}

interface TimerState {
  minutes: number,
  seconds: number,
  isTimerActive: boolean,
  intervalID: ReturnType<typeof setInterval> | null,
  timerMode: 'work' | 'short-break' | 'long-break',
  cyclesCompleted: number,
  sessionLength: {
    work: number,
    shortBreak: number,
    longBreak: number,
  }
}

const padLeadingZeros = (val: number | string): string =>
  `00${val}`.slice(-2);

class Timer extends React.Component<TimerProps, TimerState> {
  constructor(props: TimerProps) {
    super(props);

    this.state = {
      minutes: 25,
      seconds: 0,
      isTimerActive: false,
      intervalID: null,
      timerMode: 'work',
      cyclesCompleted: 0,
      sessionLength: {
        work: props.sessionLength?.work || 25,
        shortBreak: props.sessionLength?.shortBreak || 5,
        longBreak: props.sessionLength?.longBreak || 15,
      },
    };
  }

  setTimerMode = () => {
    const { timerMode, cyclesCompleted } = this.state;

    if (timerMode === 'work') {
      /*  `cyclesCompleted + 1` used because we want to know the count including
          the cycle currently being completed */
      if (cyclesCompleted !== 0 && (cyclesCompleted + 1) % 4 === 0) {
        this.setState(state => ({
          timerMode: 'long-break',
          seconds: 0,
          minutes: state.sessionLength.longBreak,
        }));
      } else {
        this.setState(state => ({
          timerMode: 'short-break',
          seconds: 0,
          minutes: state.sessionLength.shortBreak,
        }));
      }
    } else {
      this.setState(state => ({
        timerMode: 'work',
        seconds: 0,
        minutes: state.sessionLength.work,
      }));
    }
  };

  completeCycle = () => {
    // TODO: play the completion sound
    this.stopTimer();
    this.setTimerMode();
    this.setState(state => ({
      cyclesCompleted: state.cyclesCompleted + 1,
    }));
  };

  tick = () => {
    if (this.state.seconds === 0) {
      if (this.state.minutes === 0) {
        this.completeCycle();
      } else {
        this.setState(state => ({
          minutes: state.minutes - 1,
          seconds: 59,
        }));
      }
    } else {
      this.setState(state => ({
        seconds: state.seconds - 1,
      }));
    }
  };

  formatTime = () => {
    const minutes = padLeadingZeros(this.state.minutes);
    const seconds = padLeadingZeros(this.state.seconds);
    return `${minutes}:${seconds}`;
  };

  startTimer = () => {
    const intervalID = setInterval(() => {
      if (this.state.isTimerActive) this.tick();
      else this.stopTimer();
    }, 1000);

    this.setState({ isTimerActive: true, intervalID });
  };

  stopTimer = () => {
    if (this.state.intervalID !== null) clearInterval(this.state.intervalID);

    this.setState({ isTimerActive: false, intervalID: null });
  };

  resetTimer = () => {
    this.stopTimer();
    this.setState({ minutes: 25, seconds: 0 });
  };

  render() {
    return <div
      id="pomodoro-timer"
      className="container-fluid d-flex justify-content-center text-bg-secondary"
    >
      <span className="pomodoro-timer__time-display p-5 fs-1">{this.formatTime()}</span>

      <button
        className="pomodoro-timer__start-timer btn btn-success m-1 align-self-center"
        onClick={this.startTimer}
      >
        Start
      </button>

      <button
        className="pomodoro-timer__stop-timer btn btn-danger m-1 align-self-center"
        onClick={this.stopTimer}
      >
        Stop
      </button>

      <button
        className="pomodoro-timer__reset-timer btn btn-warning m-1 align-self-center"
        onClick={this.resetTimer}
      >
        Reset
      </button>
    </div>;
  }
}

export default Timer;
