import { FC } from "react";

import { Button } from "@/components/ui/button";
import { useTimerStore } from "@/store/store";
import { SessionTypes } from "@/types/types";

interface SessionButtonProps {
  id: SessionTypes;
  label: string;
}

const SessionButton: FC<SessionButtonProps> = ({ id, label }) => {
  const { activeSession, setSessionType } = useTimerStore((state) => state);

  const attachedClasses =
    activeSession === id ? "bg-white text-black" : "bg-transparent";

  const onButtonClick = () => setSessionType(id);
  return (
    <Button
      className={`[&:nth-child(even)]:mx-[1rem] w-[150px] xxsm:w-[90px] xsm:w-[130px] sm:w-[150px] xxsm:h-[35px] xsm:h-[40px] xxsm:text-[0.8rem] xsm:text-[1.1rem] rounded-[20px] text-[1.1rem] border-solid border border-white hover:bg-white hover:text-black ${attachedClasses}`}
      onClick={onButtonClick}
    >
      {label}
    </Button>
  );
};

export default SessionButton;
