import React, { useState } from "react";
import Timer from "../components/Timer";
import Control from "../components/Control";
import Settings from "../components/Settings";

const Dashboard = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [minutes, setMinutes] = useState(workMinutes);
  const [seconds, setSeconds] = useState(0);

  const handleStart = () => {
    setIsActive(true);
    setIsWorkMode(true); // Start in work mode
    setMinutes(workMinutes); // Set minutes to initial work minutes
    setSeconds(0); // Reset seconds when starting
  };

  const handlePause = () => setIsActive(false);

  const handleReset = () => {
    setIsActive(false);
    setIsWorkMode(true);
    setMinutes(workMinutes);
    setSeconds(0);
  };

  const handleCustomSet = (customWork, customBreak) => {
    setWorkMinutes(customWork);
    setBreakMinutes(customBreak);
    setIsActive(false); // Stop the timer when updating custom times
    setIsWorkMode(true);
    setMinutes(customWork); // Reset to custom work minutes
    setSeconds(0); // Reset seconds
  };

  return (
    <div>
      <h1>Pomodoro Timer Dashboard</h1>
      <Timer
        isActive={isActive}
        isWorkMode={isWorkMode}
        workMinutes={workMinutes}
        breakMinutes={breakMinutes}
        minutes={minutes}
        seconds={seconds}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
        setIsWorkMode={setIsWorkMode}
      />
      <Control onStart={handleStart} onPause={handlePause} onReset={handleReset} />
      <Settings onCustomSet={handleCustomSet} />
    </div>
  );
};

export default Dashboard;
