import {
  useState,
  ChangeEvent,
  FormEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { useTimerStore } from "@/store/store";
import { SessionData, SessionTypes } from "@/types/types";

const timersSettingsConfig = [
  { id: "pomodoro", label: "Pomodoro" },
  { id: "shortBreak", label: "Short Break" },
  { id: "longBreak", label: "Long Break" },
];

const TimersSettings = forwardRef((_props, ref) => {
  const { settings, setIsSettingsDialogOpen, setTimersSettings } =
    useTimerStore((state) => state);

  const { inputs, isPomodoroSequenceOn } = settings.timers;
  const {
    pomodoro: pomodoroLength,
    shortBreak: shortBreakLength,
    longBreak: LongBreakLength,
  } = inputs;

  const { timers } = settings;

  // Initialize state with default values from config
  const initialFormState = timersSettingsConfig.reduce((acc, input) => {
    acc[input.id as SessionTypes] = timers.inputs[input.id as SessionTypes];
    return acc;
  }, {} as SessionData);

  const [formState, setFormState] = useState(initialFormState);
  const [pomodoroSequenceOn, setPomodoroSequenceOn] = useState(
    timers.isPomodoroSequenceOn
  );

  useImperativeHandle(
    ref,
    () => ({
      resetTimersSettings(data: SessionData) {
        setFormState(data);
      },
      resetPomodoroSequence(val: boolean) {
        setPomodoroSequenceOn(val);
      },
    }),
    []
  );

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const eventTargetName = e.target.getAttribute("name");

    if (!eventTargetName) {
      return;
    }

    const inputValue = e.target.value;

    setFormState((prevState) => ({
      ...prevState,
      [eventTargetName]: inputValue === "" ? "" : +inputValue,
    }));
  };

  const onCloseButtonClick = (e: FormEvent) => {
    e.preventDefault();
    setIsSettingsDialogOpen();
  };

  const onFormSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      inputs: formState,
      isPomodoroSequenceOn: pomodoroSequenceOn,
    };

    const settingsHaveChanged =
      formState.pomodoro !== pomodoroLength ||
      formState.shortBreak !== shortBreakLength ||
      formState.longBreak !== LongBreakLength ||
      pomodoroSequenceOn !== isPomodoroSequenceOn;

    if (settingsHaveChanged) {
      setTimersSettings(data);
      return setIsSettingsDialogOpen();
    }

    setIsSettingsDialogOpen();
  };

  return (
    <div>
      <form className="flex-col" onSubmit={onFormSubmitHandler}>
        <div className="flex-col xsm:flex-row flex justify-between">
          {timersSettingsConfig.map((inputEl) => (
            <div className="xsm:w-1/4" key={inputEl.id}>
              <Label
                htmlFor={inputEl.id}
                className="text-[12px] xsm:text-[14px] whitespace-nowrap font-custom"
              >
                {inputEl.label}
              </Label>
              <Input
                type="number"
                name={inputEl.id}
                className="bg-black text-white text-[12px] xsm:text-[14px] border-[#6d6d6d] h-[35px]"
                value={formState[inputEl.id as SessionTypes]}
                onChange={onChangeHandler}
                min={1}
              />
              <div className="text-[12px] xsm:text-[14px] text-[#adb5bd]">
                minutes
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[20px] grid grid-cols-[44px_auto] grid-rows-2">
          <div className="flex col-span-2">
            <Switch
              id="toggle"
              className="data-[state=unchecked]:border-[#6d6d6d] data-[state=unchecked]:bg-black h-[20px] [&>span]:bg-[#6d6d6d] [&>span]:h-[14px] [&>span]:w-[14px] [&>span]:ml-[2px] data-[state=checked]:bg-black  data-[state=checked]:border-[#5ece7b]"
              checked={pomodoroSequenceOn}
              onCheckedChange={setPomodoroSequenceOn}
            />
            <Label className="ml-[10px] leading-[21px] text-justify text-[12px] xsm:text-[14px]">
              Use the Pomodoro sequence: Pomodoro → short break, repeat 4x, then
              one long break
            </Label>
          </div>
          <p className="ml-[10px] text-[12px] xsm:text-[14px] text-[#6d6d6d] text-justify  leading-[14px] mt-[10px] col-start-2 col-end-3">
            Number of completed working sessions indicated by the count of
            tomatoes under 'Pomodoro'
          </p>
        </div>
        <div className="mt-[50px] flex justify-end space-x-[10px]">
          <Button
            className="rounded-[20px] bg-[#6d6d6d] text-[12px] xsm:text-[14px]  hover:bg-[#dc3545]"
            onClick={onCloseButtonClick}
          >
            Close
          </Button>
          <Button className="rounded-[20px] bg-[#fff] text-[#000] text-[12px] xsm:text-[14px] hover:bg-[#5ece7b]">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
});

export default TimersSettings;
