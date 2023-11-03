//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import ShopListDetailDataProvider from "../bricks/shop-list/shop-list-detail-data-provider.js";
import ShopListDetail from "../bricks/shop-list/shop-list-detail.js";
import EditableHeader from "../bricks/shop-list/editable-header.js";
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

const ShopList = createVisualComponent({
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

    console.log("-----");
    console.log(props);

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShopList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>Visual Component {ShopList.uu5Tag}</div>
        <ShopListDetailDataProvider>
          <EditableHeader />
          <ShopListDetail callsMap={props.callsMap} />
          <Content nestingLevel={currentNestingLevel}>{children}</Content>
        </ShopListDetailDataProvider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShopList };
export default ShopList;
//@@viewOff:exports
