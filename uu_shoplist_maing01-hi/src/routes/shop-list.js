//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Grid } from "uu5g05-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import ShopListDetailDataProvider from "../bricks/shop-list/shop-list-detail-data-provider.js";
import ShopListDetail from "../bricks/shop-list/shop-list-detail.js";
import EditableHeader from "../bricks/shop-list/editable-header.js";
import ListUsers from "../bricks/shop-list/list-users";
import RouteBar from "../core/route-bar.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  inner: () =>
    Config.Css.css({
      display: "block",
      padding: "24px 40px",
      margin: "0 auto",
      maxWidth: "1400px",
    }),
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShopList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <ShopListDetailDataProvider id={props.params.id}>
          {(props) => (
            <div className={Css.inner()}>
              {EditableHeader(props)}
              <Grid templateColumns={{ xs: "1fr", m: "2fr 1fr" }} columnGap={"25px"}>
                {ShopListDetail(props)}
                {ListUsers(props)}
              </Grid>
            </div>
          )}
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
