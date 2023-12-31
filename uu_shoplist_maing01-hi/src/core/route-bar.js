//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute, Utils, useAppBackground } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Uu5Elements, { Link } from "uu5g05-elements";

import ModeSwitch from "../bricks/mode-switch.js";
import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: (background) =>
    Config.Css.css({
      backgroundColor: background === "dark" ? "rgb(33, 33, 33)" : null,
    }),
};

//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute();
    const [background] = useAppBackground();

    const appActionList = [
      { children: <Lsi import={importLsi} path={["Menu", "home"]} />, onClick: () => setRoute("home") }
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main(background));

    return (
      <Plus4U5App.RouteBar appActionList={appActionList} {...props} {...attrs}>
        <ModeSwitch />
      </Plus4U5App.RouteBar>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
