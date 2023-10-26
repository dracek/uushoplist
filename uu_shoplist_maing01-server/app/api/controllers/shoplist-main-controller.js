"use strict";
const ShoplistMainAbl = require("../../abl/shoplist-main-abl.js");

class ShoplistMainController {
  init(ucEnv) {
    return ShoplistMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ShoplistMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ShoplistMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ShoplistMainController();
