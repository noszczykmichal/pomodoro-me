import { FC } from "react";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RefreshButtonProps {
  onButtonClick: () => void;
}

const RefreshButton: FC<RefreshButtonProps> = ({ onButtonClick }) => {
  const rotateHandler = () => {
    const refreshIcon = document.getElementById("refresh") as HTMLButtonElement;
    refreshIcon?.classList.add("refresh-button-animation");
    onButtonClick();
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
