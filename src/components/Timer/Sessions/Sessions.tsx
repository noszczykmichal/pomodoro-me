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

  return (
    <header className="">
      {sessionsConfig.map((session) => (
        <SessionButton key={session.id} id={session.id} label={session.name} />
      ))}
    </header>
  );
};

export default Sessions;
