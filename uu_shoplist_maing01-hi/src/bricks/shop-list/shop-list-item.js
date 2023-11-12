//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Button, Icon } from "uu5g05-elements";
import Config from "./config/config.js";
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

const ShopListItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShopListItem",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShopListItem);

    const isDone = props.item.done;

    return currentNestingLevel ? (
      <div {...attrs} style={{ border: "1px solid", margin: "25px", padding: "10px" }}>
        <div style={isDone ? { textDecoration: "line-through" } : {}}>
          =({props.item.name})=
          <Button onClick={() => props.onToggle(props.item.name)}>
            <Icon icon={isDone ? "mdi-check-outline" : "mdi-check"} />
          </Button>
          <Button onClick={() => props.onDeleteOpen(props.item)}>
            <Icon icon="mdi-trash-can" />
          </Button>
        </div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShopListItem };
export default ShopListItem;
//@@viewOff:exports
