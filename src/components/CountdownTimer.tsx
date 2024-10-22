import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { BsFillPlayFill, BsPauseFill, BsStopFill } from "react-icons/bs";

function CountdownTimer() {
  // abusing state variables.

  // for focus timer
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(null);

  const [rmbrHours, setRmbrHours] = useState(0);
  const [rmbrMinutes, setRmbrMinutes] = useState(0);
  const [rmbrSeconds, setRmbrSeconds] = useState(0);

  // for break time
  const [breakHours, setBreakHours] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [breakIsRunning, setBreakIsRunning] = useState(null);

  const [rmbrBreakHours, setRmbrBreakHours] = useState(0);
  const [rmbrBreakMinutes, setRmbrBreakMinutes] = useState(0);
  const [rmbrBreakSeconds, setRmbrBreakSeconds] = useState(0);

  const [activeTimer, setActiveTimer] = useState("none");

  const [showEndScreen, setShowEndScreen] = useState({
    show: false,
    message: `Good job focusing, ADHD guy!!!`,
  });
  // will run on first render and when dependencies change
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        // when executing any of these code, dependencies will change which will triffer clean up function
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          setShowEndScreen({ ...showEndScreen, show: true });
          stopTimer();
        }
      }, 1000);
    } else if (breakIsRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setBreakSeconds((breakSeconds) => breakSeconds - 1);
        } else if (breakMinutes > 0) {
          setBreakMinutes((breakMinutes) => breakMinutes - 1);
          setBreakSeconds(59);
        } else if (breakHours > 0) {
          setBreakHours((breakHours) => breakHours - 1);
          setBreakMinutes(59);
          setBreakSeconds(59);
        }
      }, 1000);
    }

    if (
      breakHours === 0 &&
      breakMinutes === 0 &&
      breakSeconds === 0 &&
      breakIsRunning
    ) {
      setShowEndScreen({ ...showEndScreen, show: true });
      stopBreakTimer();
    }

    // clean up function to cleat the interval id
    return () => clearInterval(interval);
  }, [
    hours,
    minutes,
    seconds,
    activeTimer,
    isRunning,
    breakHours,
    breakMinutes,
    breakSeconds,
    breakIsRunning,
  ]);

  // Handlers for focus time
  // e is event object. when a user makes chg to put, event obj will be generated and pushed here.
  // here is alrdy setting hours, minutes, seconds
  const changeHours = (e) => {
    setHours(e.target.value);
    setRmbrHours(e.target.value);
  };
  const changeMinutes = (e) => {
    setMinutes(e.target.value);
    setRmbrMinutes(e.target.value);
  };
  const changeSeconds = (e) => {
    setSeconds(e.target.value);
    setRmbrSeconds(e.target.value);
  };

  // Handlers for break time
  const changeBreakHours = (e) => {
    setBreakHours(e.target.value);
    setRmbrBreakHours(e.target.value);
  };
  const changeBreakMinutes = (e) => {
    setBreakMinutes(e.target.value);
    setRmbrBreakMinutes(e.target.value);
  };
  const changeBreakSeconds = (e) => {
    setBreakSeconds(e.target.value);
    setRmbrBreakSeconds(e.target.value);
  };

  // start, stop, pause functions
  // this will trigger use Effect()
  function startTimer() {
    if (hours !== 0 || minutes !== 0 || seconds !== 0) {
      if (breakHours !== 0 || breakMinutes !== 0 || breakSeconds !== 0) {
        setIsRunning(true);
        setBreakIsRunning(false);
        setShowEndScreen({ ...showEndScreen, show: false });
        setActiveTimer("focus");
      } else {
        window.alert("Dumb fuck, put the break time in");
      }
    } else {
      window.alert("Dumb fuck, put the focus time in");
    }
  }

  function stopTimer() {
    setActiveTimer("break");
    setHours(rmbrHours);
    setMinutes(rmbrMinutes);
    setSeconds(rmbrSeconds);
    setIsRunning(false);
    window.alert("You fking did it");
  }

  function pauseTimer() {
    setIsRunning(false);
    setBreakIsRunning(false);
  }

  function startBreakTimer() {
    setIsRunning(false);
    setBreakIsRunning(true);
    setShowEndScreen({ ...showEndScreen, show: true });
    setActiveTimer("break");
  }

  function stopBreakTimer() {
    setIsRunning(false);
    setBreakIsRunning(false);
    setBreakHours(rmbrBreakHours);
    setBreakMinutes(rmbrBreakMinutes);
    setBreakSeconds(rmbrBreakSeconds);
    setActiveTimer("none");
  }

  function pauseBreakTimer() {
    setIsRunning(false);
    setBreakIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setBreakIsRunning(false);
    setHours(rmbrHours);
    setMinutes(rmbrMinutes);
    setSeconds(rmbrSeconds);
    setBreakHours(rmbrBreakHours);
    setBreakMinutes(rmbrBreakMinutes);
    setBreakSeconds(rmbrBreakSeconds);
    setActiveTimer("none");
  }
  return (
    <>
      {showEndScreen.show && (
        <h2 className="text-center text-7xl font-bold">
          {showEndScreen.message}
        </h2>
      )}

      <p className="text-2xl text-center mt-[5vh]">Focus Time</p>
      {(activeTimer === "none" || activeTimer === "focus") && (
        <Timer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          changeHours={changeHours}
          changeMinutes={changeMinutes}
          changeSeconds={changeSeconds}
          isFocus={true}
          isBreak={false}
        />
      )}
      <p className="text-2xl text-center mt-[5vh]">Break Time</p>
      {(activeTimer === "none" || activeTimer === "break") && (
        <Timer
          hours={breakHours}
          minutes={breakMinutes}
          seconds={breakSeconds}
          changeHours={changeBreakHours}
          changeMinutes={changeBreakMinutes}
          changeSeconds={changeBreakSeconds}
          isFocus={false}
          isBreak={true}
        />
      )}
      <div className="flex flex-row justify-center mt-4">
        {!isRunning && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-3xl py-4 px-8 rounded mr-24"
            onClick={
              activeTimer === "none" || activeTimer === "focus"
                ? startTimer
                : startBreakTimer
            }
          >
            <BsFillPlayFill />
          </button>
        )}
        {isRunning && (
          <button
            className="bg-yellow-500 hover:bg-yellow-700  text-white text-3xl py-4 px-8 rounded mr-24"
            onClick={
              activeTimer === "none" || activeTimer === "focus"
                ? pauseTimer
                : pauseBreakTimer
            }
          >
            <BsPauseFill />
          </button>
        )}
        {(isRunning || activeTimer !== "none") && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white text-3xl py-4 px-8 rounded"
            onClick={resetTimer}
          >
            <BsStopFill />
          </button>
        )}
      </div>
    </>
  );
}

export default CountdownTimer;
