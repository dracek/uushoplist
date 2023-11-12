//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import ShopListDetailDataProvider from "../bricks/shop-list/shop-list-detail-data-provider.js";
import ShopListDetail from "../bricks/shop-list/shop-list-detail.js";
import EditableHeader from "../bricks/shop-list/editable-header.js";
import ListUsers from "../bricks/shop-list/list-users";
import {withRoute} from "uu_plus4u5g02-app";
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

let ShopList = createVisualComponent({
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    console.log("route",props);

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShopList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>Visual Component {ShopList.uu5Tag}</div>
        <ShopListDetailDataProvider id={props.params.id}>
          <EditableHeader />
          <ShopListDetail/>
          <ListUsers/>
          <Content nestingLevel={currentNestingLevel}>{children}</Content>
        </ShopListDetailDataProvider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

ShopList = withRoute(ShopList, { authenticated: true });

//@@viewOn:exports
export { ShopList };
export default ShopList;
//@@viewOff:exports
