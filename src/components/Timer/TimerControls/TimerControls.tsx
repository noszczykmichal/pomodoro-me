import { useTimerStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import RefreshButton from "./RefreshButton/RefreshButton";
import SettingsDialog from "@/components/SettingsDialog/SettingsDialog";

const TimerControls = () => {
  const {
    intervalID,
    isCountDownOn,

    setTimerData,
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
    const intervalRef = setInterval(setTimerData, 1000);
    setCurrentIntervalID(intervalRef);
  };
  return (
    <div className="flex space justify-around pt-[20px]">
      <Button
        variant="outline"
        className="flex justify-center rounded-[20px] items-stretch
       w-[130px] text-[1.5rem] p-0 hover:bg-transparent hover:text-white"
        onClick={buttonClickHandler}
      >
        {isCountDownOn ? "pause" : "start"}
      </Button>
      <RefreshButton onButtonClick={clearTimer} />
      <SettingsDialog />
    </div>
  );
};

export default TimerControls;
