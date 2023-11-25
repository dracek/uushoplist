//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi, Content } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
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
    return (
      <div {...attrs}>
        <RouteBar />
        <WelcomeRow left={<Plus4U5Elements.PersonPhoto size="xl" borderRadius="none" />}>
          <Uu5Elements.Text category="story" segment="heading" type="h2">
            <Lsi import={importLsi} path={["Home", "welcome"]} />
          </Uu5Elements.Text>
          {identity && (
            <Uu5Elements.Text category="story" segment="heading" type="h2">
              {identity.name}
            </Uu5Elements.Text>
          )}
        </WelcomeRow>
        <WelcomeRow>
          <Uu5Elements.Text category="story" segment="body" type="common">
            <Content>
              {
                "<uu5string/>Cizí seznamy nelze mazat - nejdříve si vytvořte vlastní. V prokliku do detailu je nastaven aktuálně přihlášený uživatel jako owner, kromě <Uu5Elements.Link href='shopList?id=1' >seznam č.1</Uu5Elements.Link> (tam je nastavený jen jako member pro testování oprávnění). Data se udržují jsou pouze na úrovni routy, ne při přechodu mezi nimi (listy mají stejná defaultní data)."
              }
            </Content>
          </Uu5Elements.Text>
        </WelcomeRow>

        <ShopListDataProvider>{(props) => <div className={Css.inner()}>{ShopLists(props)}</div>}</ShopListDataProvider>
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
