import React from "react";
import CountdownTimer from "./components/CountdownTimer";

function App() {
  return (
    <>
      <h1 className="text-fuchsia-950 text-4xl text-center">
        Chan's Pomodoro Timer
      </h1>
      <div className="w-auto">
        <CountdownTimer />
      </div>
    </>
  );
}

export default App;
