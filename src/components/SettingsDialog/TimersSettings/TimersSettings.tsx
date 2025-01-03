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

  const { timers } = settings;

  // Initialize state with default values from config
  const initialFormState = timersSettingsConfig.reduce((acc, input) => {
    acc[input.id as SessionTypes] = timers.inputs[input.id as SessionTypes];
    return acc;
  }, {} as SessionData);

  const [formState, setFormState] = useState(initialFormState);
  const [pomodoroSequenceOn, setPomodoroSequenceOn] = useState(
    timers.pomodoroSequenceOn
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

    setFormState((prevState) => ({
      ...prevState,
      [eventTargetName]: +e.target.value,
    }));
  };

  const onCloseButtonClick = (e: FormEvent) => {
    e.preventDefault();
    setIsSettingsDialogOpen();
  };

  const onFormSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data = { inputs: formState, pomodoroSequenceOn };
    setTimersSettings(data);
    setIsSettingsDialogOpen();
  };

  return (
    <div>
      <form className="flex-col" onSubmit={onFormSubmitHandler}>
        <div className="flex justify-between">
          {timersSettingsConfig.map((inputEl) => (
            <div className="w-1/4" key={inputEl.id}>
              <Label
                htmlFor={inputEl.id}
                className="text-[14px] whitespace-nowrap font-custom"
              >
                {inputEl.label}
              </Label>
              <Input
                type="number"
                name={inputEl.id}
                className="bg-black text-white border-[#6d6d6d] h-[35px]"
                value={formState[inputEl.id as SessionTypes]}
                onChange={onChangeHandler}
              />
              <div className="text-[14px] text-[#adb5bd]">minutes</div>
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
            <Label className="ml-[10px] leading-[21px] text-justify">
              Use the Pomodoro sequence: Pomodoro → short break, repeat 4x, then
              one long break
            </Label>
          </div>
          <p className="ml-[10px] text-[14px] text-[#6d6d6d] text-justify leading-[14px] mt-[10px] col-start-2 col-end-3">
            Number of completed working sessions indicated by the count of
            tomatoes under 'Pomodoro'
          </p>
        </div>
        <div className="mt-[50px] flex justify-end space-x-[10px]">
          <Button
            className="rounded-[20px] bg-[#6d6d6d] hover:bg-[#dc3545]"
            onClick={onCloseButtonClick}
          >
            Close
          </Button>
          <Button className="rounded-[20px] bg-[#fff] text-[#000] hover:bg-[#5ece7b]">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
});

export default TimersSettings;
