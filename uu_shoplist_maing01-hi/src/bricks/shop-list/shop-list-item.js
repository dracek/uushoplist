//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Button, Icon } from "uu5g05-elements";
import Config from "./config/config.js";
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
      paddingLeft: "20px",
    }),
  itemContainer: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between",
    }),
  innerContainer: () =>
    Config.Css.css({
      minWidth: "130px",
      justifyContent: "flex-end",
      display: "flex",
    }),
  itemText: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      textOverflow: "ellipsis",
    }),
  itemStrikedText: () =>
    Config.Css.css({
      textDecoration: "line-through",
      textDecorationThickness: "2px",
      textDecorationColor: "red",
    }),
  deleteButton: () =>
    Config.Css.css({
      marginLeft: "10px",
    }),
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

    const isDone = props.item && props.item.done;

    return currentNestingLevel ? (
      <div {...attrs}>
        <div className={Css.itemContainer()}>
          <div className={isDone ? Utils.Css.joinClassName(Css.itemText(), Css.itemStrikedText()) : Css.itemText()}>
            {props.item.name}
          </div>
          <div className={Css.innerContainer()}>
            <Button onClick={() => props.onToggle(props.item.name)}>
              <Icon icon={isDone ? "mdi-check-outline" : "mdi-check"} />
            </Button>
            <Button className={Css.deleteButton()} onClick={() => props.onDeleteOpen(props.item)}>
              <Icon icon="mdi-trash-can" />
            </Button>
          </div>
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
