import React from 'react';

class Timer extends React.Component {
  render() {
    return (
      <div id="pomodoro-timer">
        <span className="pomodoro-timer__time-display">00:00</span>
        <button className="pomodoro-timer__start-timer">Start</button>
        <button className="pomodoro-timer__stop-timer">Stop</button>
        <button className="pomodoro-timer__reset-timer">Reset</button>
      </div>
    )
  }
}

export default Timer;
