import React, { useEffect } from "react";

const Timer = ({ isActive, isWorkMode, workMinutes, breakMinutes, minutes, seconds, setMinutes, setSeconds, setIsWorkMode }) => {
  useEffect(() => {
    let countdown;
    if (isActive) {
      countdown = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          } else {
            // Switch between work and break
            setIsWorkMode((prevMode) => !prevMode); // Toggle work/break mode
            if (isWorkMode) {
              setMinutes(breakMinutes);
            } else {
              setMinutes(workMinutes);
            }
            return 0; // Reset seconds when switching
          }
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [isActive, minutes, isWorkMode, workMinutes, breakMinutes, setMinutes, setIsWorkMode]);
  
  return (
    <h1>
      {isWorkMode ? "Work Time" : "Break Time"}: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </h1>
  );
};

export default Timer;
