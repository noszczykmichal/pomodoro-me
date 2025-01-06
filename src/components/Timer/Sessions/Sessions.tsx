import { useTimerStore } from "@/store/store";
import TomatoIcon from "../TomatoIcon/TomatoIcon";
import SessionButton from "./SessionButton/SessionButton";
import { SessionTypes } from "@/types/types";

const Sessions = () => {
  const sessionsConfig = [
    {
      id: SessionTypes.Pomodoro,
      name: "pomodoro",
    },
    { id: SessionTypes.ShortBreak, name: "short break" },
    { id: SessionTypes.LongBreak, name: "long break" },
  ];

  const { workingSessionsCount } = useTimerStore((state) => state);

  const sessionsDisplayContent =
    workingSessionsCount <= 5 ? (
      Array.from({ length: workingSessionsCount }, (_, index) => (
        <TomatoIcon key={index} />
      ))
    ) : (
      <>
        {workingSessionsCount}x<TomatoIcon className="ml-[2px]" />
      </>
    );

  return (
    <header className="flex flex-col items-center gap-4">
      <div className="flex flex-col xxsm:flex-row items-center justify-between gap-4">
        {sessionsConfig.map((session) => (
          <SessionButton
            key={session.id}
            id={session.id}
            label={session.name}
          />
        ))}
      </div>
      <div className="place-self-start">
        <div className="flex w-[90px] xsm:w-[116px] min-h-[18px] justify-start pt-[3px] text-[#fff] text-[14px] items-center">
          {sessionsDisplayContent}
        </div>
      </div>
    </header>
  );
};

export default Sessions;
