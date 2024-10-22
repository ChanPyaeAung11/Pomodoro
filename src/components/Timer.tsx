import React from "react";
import { BsStopwatch } from "react-icons/bs";

const Timer = ({
  hours,
  minutes,
  seconds,
  changeHours,
  changeMinutes,
  changeSeconds,
  isFocus,
  isBreak,
}) => {
  return (
    <div
      className={`flex flex-row mt-[5vh] justify-center items-center mx-auto text-white rounded-md shadow-2xl p-4 text-center border-4 ${
        isBreak && !isFocus
          ? `bg-red-600 border-red-300`
          : `bg-green-600 border-green-300`
      }`}
    >
      <BsStopwatch className="text-6xl mr-4" />
      <div className="flex flex-col">
        <label className="mb-2">hh</label>
        <input
          // input with value prop is a controlled component which only listens to React
          value={hours}
          // w/o onChange, it is read only. user cant make chges
          onChange={changeHours}
          placeholder="0"
          type="text"
          inputMode="numeric"
          className="w-24 mr-4 hover:bg-gray-brown-500 text-ebony-1 text-6xl font-semibold text-center py-0 px-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2">MM</label>
        <input
          value={minutes}
          onChange={changeMinutes}
          placeholder="0"
          type="text"
          inputMode="numeric"
          className="w-24 mr-4 hover:bg-gray-brown-500 text-ebony-1 text-6xl font-semibold text-center py-0 px-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2">ss</label>
        <input
          value={seconds}
          onChange={changeSeconds}
          placeholder="0"
          type="text"
          inputMode="numeric"
          className="w-24 mr-4 hover:bg-gray-brown-500 text-ebony-1 text-6xl font-semibold text-center py-0 px-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default Timer;
