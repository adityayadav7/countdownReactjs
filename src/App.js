
import React, { Component } from "react";
import './App.css';

const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

class App extends Component {
  constructor(props) {
    super(props)
    this.refs = React.createRef();
    this.state = {
      timeStart: '',
      time: '',
      timeSec: 0,
      timePassed: 0,
      timerInterval: null,
      width: ''

    }
    this.onChangeTime = this.onChangeTime.bind(this)
    this.startTimer = this.startTimer.bind(this);

  }
  onChangeTime(e) {

    this.setState({
      time: e.target.value,
      timeStart: e.target.value
    })
  }
  componentDidMount() {
    this.setState({
      width: this.container.offsetWidth
    })
  }
  startTimer() {
    let timeLeft = this.state.time;
    this.timerInterval = setInterval(() => {
      let Passed = this.state.timePassed + 1;
      this.setState({timePassed:Passed});
      timeLeft = this.state.time - this.state.timePassed;
      document.getElementById("base-timer-label").innerHTML = this.convertSecToHrsMinsSec(
        timeLeft
      );

      document.getElementById("base-timer-label1").innerHTML = this.convertSecToHrsMinsSec(
        timeLeft
      );
      this.setCircleDasharray();
      this.setRemainingPathColor(timeLeft);

      if (timeLeft === 0) {
        this.onTimesUp();
      }
    }, 1000);
  }
  
 
  onTimesUp() {
    clearInterval(this.timerInterval);
    alert('countdown completed')
  }
  setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }
  setCircleDasharray() {
    const FULL_DASH_ARRAY = 283;
    const circleDasharray = `${(
      this.TimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
  TimeFraction() {
    let timeLeft = this.state.time;
    const rawTimeFraction = timeLeft / this.state.time;
    return rawTimeFraction - (1 / this.state.time) * (1 - rawTimeFraction);
  }
  convertSecToHrsMinsSec(mins) {
  
    let h = Math.floor(mins / 3600);
    mins %= 3600;
    let m = Math.floor(mins / 60);
    let s =mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = String(s).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }
  resetTime() {
    this.setState({
      time: this.state.timeStart,
      timePassed: 0,
      timerInterval: null
    });
  }
  stopTime() {
    clearInterval(this.timerInterval);
    alert("stop watch");
  }


  render() {
    let remainingPathColor = COLOR_CODES.info.color;
    return (
      <div className="App">
        <header className="App-header">
          <div class="container">

            <div class="progress">
              <div ref={el => (this.container = el)} id="base-timer-label1" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 1140 }} >
                {this.convertSecToHrsMinsSec(
                  this.state.time
                )}
              </div>
            </div>
          </div>
          <div>
            <div>
              <div class="base-timer">
                <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <g class="base-timer__circle">
                    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                    <path
                      id="base-timer-path-remaining"
                      stroke-dasharray="283"
                      className={`base-timer__path-remaining ${remainingPathColor}`}
                      d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
                    ></path>
                  </g>
                </svg>
                <span ref='base-timer-label' id="base-timer-label" class="base-timer__label">{this.convertSecToHrsMinsSec(
                  this.state.time
                )}</span>
              </div>
              <div className="input-container">
                <div className="time-container">
                  <label>Enter Time</label>
                  <input
                    type="number"
                    placeholder="Enter Time"
                    value={this.state.time}
                    onChange={this.onChangeTime}
                  />

                </div>
                <div >
                  <button className="button-start" onClick={e => this.startTimer(e)}>Start</button>
                  <button className="button-start" onClick={this.resetTime.bind(this)}>Reset</button>
                  <button className="button-start" onClick={this.stopTime.bind(this)}>Stop</button>
                </div>
              </div>
            </div>


          </div>
        </header>
      </div>
    );
  }
}

export default App;
