//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { Button, Icon } from "uu5g05-elements";
import Config from "../config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      border: "1px solid gray",
      borderRadius: "5px",
      margin: "25px",
      padding: "10px",
    }),
  itemContainer: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between",
    }),
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListUsersItem);

    const subtitle = props.role + " (" + props.uuIdentity + ")";

    return currentNestingLevel ? (
      <div {...attrs}>
        <div className={Css.itemContainer()}>
          <Plus4U5Elements.PersonItem uuIdentity={props.uuIdentity} subtitle={subtitle} />
          {props.isEditable && (
            <Button onClick={() => props.onDeleteClick(props.uuIdentity)}>
              <Icon icon="mdi-trash-can" />
            </Button>
          )}
        </div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListUsersItem };
export default ListUsersItem;
//@@viewOff:exports
