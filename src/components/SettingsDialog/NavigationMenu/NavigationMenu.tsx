import { useRef } from "react";

import { useTimerStore } from "@/store/store";
import { DialogNavItem, SessionData } from "@/types/types";
import { Button } from "@/components/ui/button";
import TimersSettings from "../TimersSettings/TimersSettings";

interface TimersSettingsRef {
  resetTimersSettings: (data: SessionData) => void;
  resetPomodoroSequence: (val: boolean) => void;
}

const NavigationMenu = () => {
  const navConfig = [{ id: "timers", label: "Timers" }];

  const defaults = {
    timers: {
      inputs: { pomodoro: 25, shortBreak: 5, longBreak: 15 },
      pomodoroSequenceOn: false,
    },
  };

  const timersSettingsRef = useRef<TimersSettingsRef>(null);

  const { currentDialogNavItem, setCurrentDialogNavItem, setTimersSettings } =
    useTimerStore((state) => state);

  const onNavItemClick = (id: DialogNavItem) => () => {
    setCurrentDialogNavItem(id);
  };

  let contentsOfViewPort;

  switch (currentDialogNavItem) {
    case "timers":
      contentsOfViewPort = <TimersSettings ref={timersSettingsRef} />;
      break;
    default:
      return null;
  }

  const onResetButtonClick = () => {
    setTimersSettings(defaults.timers);
    timersSettingsRef.current!.resetTimersSettings(defaults.timers.inputs);
    timersSettingsRef.current!.resetPomodoroSequence(
      defaults.timers.pomodoroSequenceOn
    );
  };

  return (
    <div className="grid grid-cols-10">
      <div className="flex flex-col col-span-2 justify-between h-full">
        <fieldset>
          {navConfig.map((navItem) => (
            <li key={navItem.id} className="list-none" tabIndex={0}>
              <label htmlFor={navItem.id} className="py-1 text-[#fff] ">
                {navItem.label}
                <input
                  id={navItem.id}
                  type="radio"
                  className="hidden"
                  onChange={onNavItemClick(navItem.id as DialogNavItem)}
                  name="navItem"
                  checked={navItem.id === currentDialogNavItem}
                />
              </label>
            </li>
          ))}
        </fieldset>
        <Button
          onClick={onResetButtonClick}
          className="rounded-[20px] bg-black border-[1px] border-solid border-[#dc3545] text-[#dc3545] hover:bg-[#dc3545] hover:text-[#fff]"
        >
          Reset all
        </Button>
      </div>
      <div id="navigation-viewport" className="col-span-8">
        {contentsOfViewPort}
      </div>
    </div>
  );
};

export default NavigationMenu;
