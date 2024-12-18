import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const CountDown = () => {
  const initialState = {
    minutes: 25,
    seconds: 0,
  };

  const [currentTime, setCurrentTime] = useState(initialState);
  const [isCountDownOn, setCountDownOn] = useState(false);

  useEffect(() => {
    const countDownHandler = () => {
      setCurrentTime((prevTime) => {
        if (prevTime.seconds === 0) {
          if (prevTime.minutes === 0) {
            clearTimeout(onIntervalFuncId);
            return prevTime;
          }
          return { minutes: prevTime.minutes - 1, seconds: 59 };
        }

        return { ...prevTime, seconds: prevTime.seconds - 1 };
      });
    };

    const onIntervalFuncId = setInterval(countDownHandler, 1000);

    return () => clearTimeout(onIntervalFuncId);
  }, []);

  const displayedMinutes =
    currentTime.minutes < 10 ? `0${currentTime.minutes}` : currentTime.minutes;

  const displayedSeconds =
    currentTime.seconds < 10 ? `0${currentTime.seconds}` : currentTime.seconds;

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-[4rem] text-[#fff] font-custom ">
        {displayedMinutes}:{displayedSeconds}
      </div>

      <div className="flex space justify-around">
        <Button
          variant="outline"
          className="flex justify-center rounded-[20px] items-stretch
           w-[130px] text-[1.5rem] p-0 hover:bg-transparent hover:text-white"
        >
          {isCountDownOn ? "pause" : "start"}
        </Button>
      </div>
    </div>
  );
};

export default CountDown;
