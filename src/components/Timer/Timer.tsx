import { useTimerStore } from "@/store/store";
import TimerControls from "./TimerControls/TimerControls";
import Sessions from "./Sessions/Sessions";

const Timer = () => {
  const { minutes: currentMinutes, seconds: currentSeconds } = useTimerStore(
    (state) => state.timerData
  );

  const displayedMinutes =
    currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;

  const displayedSeconds =
    currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;

  return (
    <div className="flex justify-center items-center flex-col">
      <Sessions />
      <div className="text-[5rem] leading-[1.2] md:text-[8rem] font-[600] md:font-[400] text-[#fff] font-custom">
        {displayedMinutes}:{displayedSeconds}
      </div>
      <TimerControls />
    </div>
  );
};

export default Timer;
