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
      Array(workingSessionsCount).fill(<TomatoIcon />)
    ) : (
      <>
        {workingSessionsCount}x<TomatoIcon className="ml-[2px]" />
      </>
    );

  return (
    <header>
      {sessionsConfig.map((session) => (
        <SessionButton key={session.id} id={session.id} label={session.name} />
      ))}
      <div className="flex w-[116px] min-h-[18px] justify-center pt-[3px] text-[#fff] text-[14px] items-center">
        {sessionsDisplayContent}
      </div>
    </header>
  );
};

export default Sessions;
