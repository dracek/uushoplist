"use strict";
const ShopListAbl = require("../../abl/shop-list-abl.js");

class ShopListController {

  setItemState(ucEnv) {
    return ShopListAbl.setItemState(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  removeItem(ucEnv) {
    return ShopListAbl.removeItem(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  addItem(ucEnv) {
    return ShopListAbl.addItem(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  removeMember(ucEnv) {
    return ShopListAbl.removeMember(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  addMember(ucEnv) {
    return ShopListAbl.addMember(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return ShopListAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return ShopListAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return ShopListAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return ShopListAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ShopListAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ShopListController();
