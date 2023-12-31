//@@viewOn:imports
import { createVisualComponent, Utils, useSession, useLsi } from "uu5g05";
import { Button, Icon, Badge, Link } from "uu5g05-elements";
import Config from "./config/config.js";

import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      border: "1px solid gray",
      borderRadius: "5px",
      padding: "10px",
      paddingLeft: "20px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      minWidth: 0,
      width: "100%",
    }),
  itemContainer: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between",
    }),
  author: () =>
    Config.Css.css({
      marginTop: "14px",
      fontSize: "smaller",
      color: "gray",
      textAlign: "right",
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
      width: "100%",
      alignItems: "center",
      minWidth: 0,
    }),

  shorten: () =>
    Config.Css.css({
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "grid",
      gridTemplateColumns: "20px 1fr",
      verticalAlign: "center",
      "&>span:first-child": {
        marginRight: "7px",
        marginTop: "3px",
      },
    }),

  deleteButton: () =>
    Config.Css.css({
      marginLeft: "10px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShopListTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShopList",
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

    const lsi = useLsi(importLsi).ShopListTile || {};

    const { identity } = useSession();

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { archived } = props.list;
    const isMyList = props.list.owner == identity.uuIdentity;

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShopListTile);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div className={Css.itemContainer()}>
          <div className={Css.itemText()}>
            <div className={Css.shorten()}>
              <Badge size="s" borderRadius="full" colorScheme={archived ? "dim" : "green"} />
              <span>
                <Link href={"shopList?id=" + props.list.id}>{props.list.name}</Link>
              </span>
            </div>
          </div>
          <div className={Css.innerContainer()}>
            <Button onClick={() => props.onToggle(props.list.id, !archived)}>
              <Icon
                tooltip={archived ? lsi.renew : lsi.archive}
                icon={archived ? "uugds-refresh" : "uugdsstencil-uiaction-archive"}
              />
            </Button>
            {isMyList && (
              <Button className={Css.deleteButton()} onClick={() => props.onDelete(props.list)}>
                <Icon tooltip={lsi.delete} icon="mdi-trash-can" />
              </Button>
            )}
          </div>
        </div>
        <div className={Css.author()}>
          <i>{isMyList ? lsi.myList : lsi.otherList}</i>
        </div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShopListTile as ShopListTile };
export default ShopListTile;
//@@viewOff:exports
