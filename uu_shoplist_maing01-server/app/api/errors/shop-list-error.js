"use strict";

const ShoplistMainUseCaseError = require("./shoplist-main-use-case-error.js");
const SHOP_LIST_ERROR_PREFIX = `${ShoplistMainUseCaseError.ERROR_PREFIX}shopList/`;

const Create = {
  UC_CODE: `${SHOP_LIST_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

const Update = {
  UC_CODE: `${SHOP_LIST_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

const Delete = {
  UC_CODE: `${SHOP_LIST_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

const Get = {
  UC_CODE: `${SHOP_LIST_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

const List = {
  UC_CODE: `${SHOP_LIST_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

const AddMember = {
  UC_CODE: `${SHOP_LIST_ERROR_PREFIX}addMember/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

const RemoveMember = {
  UC_CODE: `${SHOP_LIST_ERROR_PREFIX}removeMember/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveMember.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

const AddItem = {
  UC_CODE: `${SHOP_LIST_ERROR_PREFIX}addItem/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

const RemoveItem = {
  UC_CODE: `${SHOP_LIST_ERROR_PREFIX}removeItem/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

const SetItemState = {
  UC_CODE: `${SHOP_LIST_ERROR_PREFIX}setItemState/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetItemState.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

module.exports = {
  SetItemState,
  RemoveItem,
  AddItem,
  RemoveMember,
  AddMember,
  List,
  Get,
  Delete,
  Update,
  Create
};
