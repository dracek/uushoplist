"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ShopListMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = ShopListMongo;
