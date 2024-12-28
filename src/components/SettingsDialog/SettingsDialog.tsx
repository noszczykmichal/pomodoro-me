import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import SettingsButton from "../Timer/TimerControls/SettingsButton/SettingsButton";
import NavigationMenu from "./NavigationMenu/NavigationMenu";

const SettingsDialog = () => {
  return (
    <Dialog>
      <DialogDescription />
      <DialogTrigger className="settings_button">
        <SettingsButton />
      </DialogTrigger>
      <DialogContent className="bg-black text-white border-none ">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <NavigationMenu />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
