import { createComponent, Utils, AppBackgroundProvider, createVisualComponent, useAppBackground } from "uu5g05";
import Uu5Elements from "uu5g05-elements";

//@@viewOn:example
const ModeSwitch = createVisualComponent({
  uu5Tag: "Uu5Demo.DarkModeToggle",

  render(props) {
    const [background, setBackground] = useAppBackground();
    const darkMode = background === "dark";

    return (
      <Uu5Elements.Toggle
        value={!darkMode}
        onChange={() =>
          setBackground({
            backgroundColor: darkMode ? null : Uu5Elements.UuGds.ColorPalette.getValue(["building", "dark", "main"]),
          })
        }
        iconOff="uugdsstencil-weather-moon"
        iconOn="uugdsstencil-weather-sun" 
      />
    );
  },
});

//@@viewOn:exports
export { ModeSwitch };
export default ModeSwitch;
//@@viewOff:exports
