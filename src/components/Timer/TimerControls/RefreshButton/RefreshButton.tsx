import { useTimerStore } from "@/store/store";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const RefreshButton = () => {
  const { clearTimer } = useTimerStore((state) => state);

  const rotateHandler = () => {
    const refreshIcon = document.getElementById("refresh") as HTMLButtonElement;
    refreshIcon?.classList.add("refresh-button-animation");
    clearTimer();
    setTimeout(() => {
      refreshIcon?.classList.remove("refresh-button-animation");
    }, 600);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="refresh-button bg-transparent border-none mx-[8px]"
      onClick={rotateHandler}
    >
      <RotateCw id="refresh" className="icon" />
    </Button>
  );
};

export default RefreshButton;
