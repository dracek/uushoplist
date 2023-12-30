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

  ShopListDaoCreateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}shopListDaoCreateFailed`;
      this.message = "ShopList create failed.";
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

  ShopListNotPresent: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}shopListNotPresent`;
      this.message = "ShopList is not present.";
    }
  },

  NotEnoughRights: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}notEnoughRights`;
      this.message = "Not enough rights for this action.";
    }
  },

  ShopListDaoUpdateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}shopListDaoUpdateFailed`;
      this.message = "ShopList update failed.";
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

  ShopListNotPresent: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}shopListNotPresent`;
      this.message = "ShopList is not present.";
    }
  },

  NotEnoughRights: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}notEnoughRights`;
      this.message = "Not enough rights for this action.";
    }
  },

  ShopListDaoDeleteFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}shopListDaoDeleteFailed`;
      this.message = "ShopList delete failed.";
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

  ShopListNotPresent: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}shopListNotPresent`;
      this.message = "ShopList is not present.";
    }
  },

  NotEnoughRights: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}notEnoughRights`;
      this.message = "Not enough rights for this action.";
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

  ShopListDaoListFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}shopListDaoListFailed`;
      this.message = "ShopList list failed.";
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

  ShopListNotPresent: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}shopListNotPresent`;
      this.message = "ShopList is not present.";
    }
  },

  NotEnoughRights: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}notEnoughRights`;
      this.message = "Not enough rights for this action.";
    }
  },

  ShopListDaoUpdateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}shopListDaoUpdateFailed`;
      this.message = "ShopList update failed when adding member.";
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

  ShopListNotPresent: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveMember.UC_CODE}shopListNotPresent`;
      this.message = "ShopList is not present.";
    }
  },

  NotEnoughRights: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveMember.UC_CODE}notEnoughRights`;
      this.message = "Not enough rights for this action.";
    }
  },

  ShopListDaoUpdateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveMember.UC_CODE}shopListDaoUpdateFailed`;
      this.message = "ShopList update failed when removing member.";
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

  ShopListNotPresent: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}shopListNotPresent`;
      this.message = "ShopList is not present.";
    }
  },

  NotEnoughRights: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}notEnoughRights`;
      this.message = "Not enough rights for this action.";
    }
  },

  ShopListDaoUpdateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}shopListDaoUpdateFailed`;
      this.message = "ShopList update failed when adding item.";
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

  ShopListNotPresent: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}shopListNotPresent`;
      this.message = "ShopList is not present.";
    }
  },

  NotEnoughRights: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}notEnoughRights`;
      this.message = "Not enough rights for this action.";
    }
  },

  ShopListDaoUpdateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}shopListDaoUpdateFailed`;
      this.message = "ShopList update failed when removing item.";
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

  ShopListNotPresent: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetItemState.UC_CODE}shopListNotPresent`;
      this.message = "ShopList is not present.";
    }
  },

  NotEnoughRights: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetItemState.UC_CODE}notEnoughRights`;
      this.message = "Not enough rights for this action.";
    }
  },

  ItemListNotPresent: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetItemState.UC_CODE}itemListNotPresent`;
      this.message = "Item is not present.";
    }
  },

  ShopListDaoUpdateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetItemState.UC_CODE}shopListDaoUpdateFailed`;
      this.message = "ShopList update failed when updating item state.";
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
