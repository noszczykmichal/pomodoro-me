import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const SettingsButton = () => {
  return (
    <Button
      className="refresh-button bg-transparent border-none"
      variant="outline"
      size="icon"
    >
      <Settings className="icon" />
    </Button>
  );
};

export default SettingsButton;
