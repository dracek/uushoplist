"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
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

    MemberAlreadyExists: {
      code: `${Errors.AddMember.UC_CODE}memberAlreadyExists`,
      message: "Member already exists",
    },
  },

  RemoveMember: {
    UnsupportedKeys: {
      code: `${Errors.RemoveMember.UC_CODE}unsupportedKeys`,
    },

    MemberNotExists: {
      code: `${Errors.RemoveMember.UC_CODE}memberNotExists`,
      message: "Member not exists",
    },
  },

  AddItem: {
    UnsupportedKeys: {
      code: `${Errors.AddItem.UC_CODE}unsupportedKeys`,
    },

    ItemAlreadyExists: {
      code: `${Errors.AddItem.UC_CODE}itemAlreadyExists`,
      message: "Item already exists",
    },
  },

  RemoveItem: {
    UnsupportedKeys: {
      code: `${Errors.RemoveItem.UC_CODE}unsupportedKeys`,
    },

    ItemNotExists: {
      code: `${Errors.RemoveMember.UC_CODE}itemNotExists`,
      message: "Item not exists",
    },
  },

  SetItemState: {
    UnsupportedKeys: {
      code: `${Errors.SetItemState.UC_CODE}unsupportedKeys`,
    },
  },


};

function isOwner(entity, identity){
  return entity.ownerId === identity;
}

function isOwnerOrMember(entity, identity){
  return entity.ownerId === identity || entity.members.includes(identity);
}

function hasMember(entity, identity){
  return entity.members.includes(identity);
}

function hasItem(entity, name){
  return entity.items.some(item => item.name === name);
}

function addWarning(uuAppErrorMap, code, message) {
  uuAppErrorMap[code] = {
    type: "warning",
    message: message
  };
}

class ShopListAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("shopList");
  }

  async get(awid, session, dtoIn) {
    
    const validationResult = this.validator.validate("shopListGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Get.ShopListNotPresent({ uuAppErrorMap });                                    
    }

    if (!isOwnerOrMember(dtoOut, session.getIdentity().getUuIdentity())){
      throw new Errors.Get.NotEnoughRights({ uuAppErrorMap });  
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, session, dtoIn) {
    
    const validationResult = this.validator.validate("shopListCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    let dtoOut;

    const newEntity = {
      awid: awid,
      name: dtoIn.name,  
      ownerId: session.getIdentity().getUuIdentity(),
      archived: false,
      members: [],
      items: []
    }

    try {
      dtoOut = await this.dao.create(newEntity);

    } catch (e) {
      if (e instanceof ObjectStoreError) {
          throw new Errors.Create.ShopListDaoCreateFailed({ uuAppErrorMap }, e)
      }
      throw e;
    }
    
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async update(awid, session, dtoIn) {

    const validationResult = this.validator.validate("shopListUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.Update.ShopListNotPresent({ uuAppErrorMap });  
    }

    if (!isOwner(entity, session.getIdentity().getUuIdentity())){
      throw new Errors.Update.NotEnoughRights({ uuAppErrorMap });  
    }

    let dtoOut;
    try {
      dtoIn.awid = awid;
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.ShopListDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, session, dtoIn) {

    const validationResult = this.validator.validate("shopListDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.Delete.ShopListNotPresent({ uuAppErrorMap });  
    }

    if (!isOwner(entity, session.getIdentity().getUuIdentity())){
      throw new Errors.Delete.NotEnoughRights({ uuAppErrorMap });  
    }

    try {
      await this.dao.remove(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Delete.ShopListDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = {
        awid,
        id: dtoIn.id,
        uuAppErrorMap: uuAppErrorMap
    };

    return dtoOut;
  }

  async list(awid, session, dtoIn) {
    
    const validationResult = this.validator.validate("shopListListDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let filter = {
      "$or" : [
        {ownerId : session.getIdentity().getUuIdentity()},
        {members : session.getIdentity().getUuIdentity()}
      ]
    };

    if(!dtoIn.includeArchived){
      filter.archived = false;
    }

    let dtoOut;
    try {
      dtoOut = await this.dao.listByFilter(awid, filter, dtoIn.pageInfo);

    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.List.ShopListDaoListFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async addMember(awid, session, dtoIn) {

    const validationResult = this.validator.validate("shopListAddMemberDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.AddMember.UnsupportedKeys.code,
      Errors.AddMember.InvalidDtoIn
    );

    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.AddMember.ShopListNotPresent({ uuAppErrorMap });  
    }

    if (!isOwner(entity, session.getIdentity().getUuIdentity())){
      throw new Errors.AddMember.NotEnoughRights({ uuAppErrorMap });  
    }

    let dtoOut;

    if (hasMember(entity, dtoIn.uuid)){

      addWarning(uuAppErrorMap, WARNINGS.AddMember.MemberAlreadyExists.code, WARNINGS.AddMember.MemberAlreadyExists.message);
      dtoOut = entity;

    } else {

      try {
        const toUpdate = {
          awid: awid,
          id: dtoIn.id,
          members: [...entity.members, dtoIn.uuid]
        }
        dtoOut = await this.dao.update(toUpdate);
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          throw new Errors.AddMember.ShopListDaoUpdateFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }

    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async removeMember(awid, session, dtoIn) {

    const validationResult = this.validator.validate("shopListRemoveMemberDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.RemoveMember.UnsupportedKeys.code,
      Errors.RemoveMember.InvalidDtoIn
    );

    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.RemoveMember.ShopListNotPresent({ uuAppErrorMap });  
    }

    const identity = session.getIdentity().getUuIdentity();
    const isRemovingSelf = entity.members.includes(identity) && (identity === dtoIn.uuid);

    if ( !isOwner(entity, identity) && !isRemovingSelf ){
      throw new Errors.RemoveMember.NotEnoughRights({ uuAppErrorMap });  
    }

    let dtoOut; 

    if (!hasMember(entity, dtoIn.uuid)){

      addWarning(uuAppErrorMap, WARNINGS.RemoveMember.MemberNotExists.code, WARNINGS.RemoveMember.MemberNotExists.message);
      dtoOut = entity;

    } else {

      try {
        const toUpdate = {
          awid: awid,
          id: dtoIn.id,
          members: entity.members.filter(uuid => uuid !== dtoIn.uuid)
        }
        dtoOut = await this.dao.update(toUpdate);
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          throw new Errors.RemoveMember.ShopListDaoUpdateFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }

    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async addItem(awid, session, dtoIn) {

    const validationResult = this.validator.validate("shopListAddItemDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.AddItem.UnsupportedKeys.code,
      Errors.AddItem.InvalidDtoIn
    );

    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.AddItem.ShopListNotPresent({ uuAppErrorMap });  
    }

    if (!isOwnerOrMember(entity, session.getIdentity().getUuIdentity())){
      throw new Errors.AddItem.NotEnoughRights({ uuAppErrorMap });  
    }

    let dtoOut;
    if (hasItem(entity, dtoIn.name)){
      addWarning(uuAppErrorMap, WARNINGS.AddItem.ItemAlreadyExists.code, WARNINGS.AddItem.ItemAlreadyExists.message);
      dtoOut = entity;
    } else {

      try {
        const toUpdate = {
          awid: awid,
          id: dtoIn.id,
          items: [...entity.items, { name: dtoIn.name, done: false} ]
        }
        dtoOut = await this.dao.update(toUpdate);
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          throw new Errors.AddItem.ShopListDaoUpdateFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
    }  

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async removeItem(awid, session, dtoIn) {

    const validationResult = this.validator.validate("shopListRemoveItemDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.RemoveItem.UnsupportedKeys.code,
      Errors.RemoveItem.InvalidDtoIn
    );
    
    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.RemoveItem.ShopListNotPresent({ uuAppErrorMap });  
    }

    if (!isOwnerOrMember(entity, session.getIdentity().getUuIdentity())){
      throw new Errors.RemoveItem.NotEnoughRights({ uuAppErrorMap });  
    }

    let dtoOut;

    if (!hasItem(entity, dtoIn.name)){
      addWarning(uuAppErrorMap, WARNINGS.RemoveItem.ItemNotExists.code, WARNINGS.RemoveItem.ItemNotExists.message);
      dtoOut = entity;

    } else {

      try {
        const toUpdate = {
          awid: awid,
          id: dtoIn.id,
          items: entity.items.filter(item => item.name !== dtoIn.name)
        }
        dtoOut = await this.dao.update(toUpdate);
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          throw new Errors.RemoveItem.ShopListDaoUpdateFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
  
  async setItemState(awid, session, dtoIn) {

    const validationResult = this.validator.validate("shopListSetItemStateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.SetItemState.UnsupportedKeys.code,
      Errors.SetItemState.InvalidDtoIn
    );
    
    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.SetItemState.ShopListNotPresent({ uuAppErrorMap });  
    }

    if (!isOwnerOrMember(entity, session.getIdentity().getUuIdentity())){
      throw new Errors.SetItemState.NotEnoughRights({ uuAppErrorMap });  
    }

    if (!hasItem(entity, dtoIn.name)){
      throw new Errors.SetItemState.ItemListNotPresent({ uuAppErrorMap });
    }

    let dtoOut;
    try {
      const toUpdate = {                                          
        awid: awid,
        id: dtoIn.id,
        items: entity.items.map(item => item.name === dtoIn.name ? {...item, done: dtoIn.done} : item)
      }
      dtoOut = await this.dao.update(toUpdate);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.SetItemState.ShopListDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new ShopListAbl();
