import { Button } from "../ui/button";
import RefreshButton from "./RefreshButton/RefreshButton";

import { useTimerStore } from "@/store/store";

const CountDown = () => {
  const { minutes: currentMinutes, seconds: currentSeconds } = useTimerStore(
    (state) => state.currentTime
  );

  const {
    intervalID,
    isCountDownOn,
    setCurrentTime,
    setCurrentIntervalID,
    setIsCountDownOn,
    clearTimer,
  } = useTimerStore((state) => state);

  const buttonClickHandler = () => {
    if (isCountDownOn) {
      setIsCountDownOn(false);
      return clearInterval(intervalID);
    }
    setIsCountDownOn(true);
    const interval = setInterval(setCurrentTime, 1000);
    setCurrentIntervalID(interval);
  };

  const displayedMinutes =
    currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;

  const displayedSeconds =
    currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;

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
          onClick={buttonClickHandler}
        >
          {isCountDownOn ? "pause" : "start"}
        </Button>
        <RefreshButton onButtonClick={clearTimer} />
      </div>
    </div>
  );
};

export default CountDown;
