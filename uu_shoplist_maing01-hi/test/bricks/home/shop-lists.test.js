import UuShoplist from "uu_shoplist_maing01-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`UuShoplist.Bricks.Home.ShopLists`, () => {
  testProperties(UuShoplist.Bricks.Home.ShopLists, CONFIG);
});
