//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "../config/config.js";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import {Button} from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListUsersItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListUsersItem",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListUsersItem);

    const subtitle = props.role + " (" + props.uuIdentity + ")";

    return currentNestingLevel ? (
      <div {...attrs} style={{border: "1px solid", padding: "5px", margin: "10px" }}>
        <Plus4U5Elements.PersonItem uuIdentity={props.uuIdentity} subtitle={subtitle} />
        {props.isEditable && <Button>del</Button>}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListUsersItem };
export default ListUsersItem;
//@@viewOff:exports
