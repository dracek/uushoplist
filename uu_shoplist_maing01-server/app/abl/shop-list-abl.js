"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/shop-list-error.js");

const WARNINGS = {
  Get: {
    UnsupportedKeys: {
      code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    },
  },

  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },

  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    },
  },

  Delete: {
    UnsupportedKeys: {
      code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    },
  },

  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
  },

  AddMember: {
    UnsupportedKeys: {
      code: `${Errors.AddMember.UC_CODE}unsupportedKeys`,
    },
  },

  RemoveMember: {
    UnsupportedKeys: {
      code: `${Errors.RemoveMember.UC_CODE}unsupportedKeys`,
    },
  },

  AddItem: {
    UnsupportedKeys: {
      code: `${Errors.AddItem.UC_CODE}unsupportedKeys`,
    },
  },

  RemoveItem: {
    UnsupportedKeys: {
      code: `${Errors.RemoveItem.UC_CODE}unsupportedKeys`,
    },
  },

  SetItemState: {
    UnsupportedKeys: {
      code: `${Errors.SetItemState.UC_CODE}unsupportedKeys`,
    },
  },


};

class ShopListAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("shopList");
  }

  async get(awid, dtoIn) {
    
    const validationResult = this.validator.validate("shopListGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap};
    
  }

  async create(awid, dtoIn) {
    
    const validationResult = this.validator.validate("shopListCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap};
    
  }

  async update(awid, dtoIn) {

    const validationResult = this.validator.validate("shopListUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap};
    
  }

  async delete(awid, dtoIn) {

    const validationResult = this.validator.validate("shopListDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap};
    
  }

  async list(awid, dtoIn) {
    
    const validationResult = this.validator.validate("shopListListDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap};
    
  }

  async addMember(awid, dtoIn) {

    const validationResult = this.validator.validate("shopListAddMemberDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.AddMember.UnsupportedKeys.code,
      Errors.AddMember.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap};
    
  }

  async removeMember(awid, dtoIn) {

    const validationResult = this.validator.validate("shopListRemoveMemberDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.RemoveMember.UnsupportedKeys.code,
      Errors.RemoveMember.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap};  
     
  }

  async addItem(awid, dtoIn) {

    const validationResult = this.validator.validate("shopListAddItemDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.AddItem.UnsupportedKeys.code,
      Errors.AddItem.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap};    
    
  }

  async removeItem(awid, dtoIn) {

    const validationResult = this.validator.validate("shopListRemoveItemDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.RemoveItem.UnsupportedKeys.code,
      Errors.RemoveItem.InvalidDtoIn
    );
    
    return {...dtoIn, uuAppErrorMap};

  }
  
  async setItemState(awid, dtoIn) {

    const validationResult = this.validator.validate("shopListSetItemStateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.SetItemState.UnsupportedKeys.code,
      Errors.SetItemState.InvalidDtoIn
    );
    
    return {...dtoIn, uuAppErrorMap};
    
  }

}

module.exports = new ShopListAbl();
