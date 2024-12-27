import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import SettingsButton from "../Timer/TimerControls/SettingsButton/SettingsButton";

const SettingsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <SettingsButton />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
