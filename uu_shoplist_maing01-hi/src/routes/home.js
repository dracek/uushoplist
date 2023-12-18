//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi, Content } from "uu5g05";
import { Pending, Text } from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import WelcomeRow from "../bricks/welcome-row.js";
import RouteBar from "../core/route-bar.js";
import ShopListDataProvider from "../bricks/home/shop-list-data-provider.js";
import ShopLists from "../bricks/home/shop-lists.js";

import importLsi from "../lsi/import-lsi.js";
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

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    let renderChildren = (childrenProps) => { 
      return <div className={Css.inner()}>
        {childrenProps.status === "WAITING" && <Pending type="circular" size="max"></Pending> }
        {childrenProps.status === "ERROR" && <h1>Chyba komunikace, přenačtěte prosím stránku.</h1> }

        {ShopLists(childrenProps)}
      </div>
    }

    return (
      <div {...attrs}>
        <RouteBar />
        <WelcomeRow>
          <Text category="story" segment="heading" type="h2">
            <Lsi import={importLsi} path={["Home", "welcome"]} /> {identity && identity.name}
          </Text>
        </WelcomeRow>
        <WelcomeRow>
          <Text category="story" segment="body" type="common">
            <Content>
              {
                "<uu5string/>Aktuálně přihlášený uživatel je nastavený jako owner seznamů, kromě <Uu5Elements.Link href='shopList?id=1' >Seznam č.1</Uu5Elements.Link>. Tam je nastavený jen jako member pro testování oprávnění (na Home i v prokliku do detailu)."
              }
            </Content>
          </Text>
        </WelcomeRow>

        <ShopListDataProvider>{renderChildren}</ShopListDataProvider>
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
