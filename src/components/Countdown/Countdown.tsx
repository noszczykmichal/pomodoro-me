import { useEffect, useState } from "react";

const Countdown = () => {
  const initialState = {
    minutes: 25,
    seconds: 0,
  };

  const [currentTime, setCurrentTime] = useState(initialState);

  useEffect(() => {
    const countDownHandler = setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime.seconds === 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 };
        }

        return { ...prevTime, seconds: prevTime.seconds - 1 };
      });
    }, 1000);

    return () => {
      clearTimeout(countDownHandler);
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="text-[4rem] text-[#fff] font-custom ">
        {currentTime.minutes < 10
          ? `0${currentTime.minutes}`
          : currentTime.minutes}
        :
        {currentTime.seconds < 10
          ? `0${currentTime.seconds}`
          : currentTime.seconds}
      </div>
    </div>
  );
};

export default Countdown;
