import { useTimerStore } from "@/store/store";
import { DialogNavItem } from "@/types/types";
import TimersSettings from "../TimersSettings/TimersSettings";

const NavigationMenu = () => {
  const navConfig = [{ id: "timers", label: "Timers" }];

  const { currentDialogNavItem, setCurrentDialogNavItem } = useTimerStore(
    (state) => state
  );

  const onNavItemClick = (id: DialogNavItem) => () => {
    setCurrentDialogNavItem(id);
  };

  let contentsOfViewPort;

  switch (currentDialogNavItem) {
    case "timers":
      contentsOfViewPort = <TimersSettings />;
      break;
    default:
      return null;
  }

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-3">
        <fieldset>
          {navConfig.map((navItem) => (
            <li key={navItem.id} className="list-none ">
              <label htmlFor={navItem.id} className="py-1 text-[#fff] ">
                {navItem.label}
                <input
                  id={navItem.id}
                  type="radio"
                  className="hidden"
                  onChange={onNavItemClick(navItem.id as DialogNavItem)}
                  name="navItem"
                  checked={navItem.id === currentDialogNavItem}
                />
              </label>
            </li>
          ))}
        </fieldset>
      </div>
      <div id="navigation-viewport" className="col-span-7">
        {contentsOfViewPort}
      </div>
    </div>
  );
};

export default NavigationMenu;
