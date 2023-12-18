/* eslint-disable */

const shopListGetDtoInType = shape({
    id: id().isRequired(),
});

const shopListCreateDtoInType = shape({
    name: string(255).isRequired(),
});

const shopListUpdateDtoInType = shape({
    id: id().isRequired(),
    name: string(255),
    archived: boolean(),
});

const shopListDeleteDtoInType = shape({
    id: id().isRequired(),
});

const shopListListDtoInType = shape({
    includeArchived: boolean(),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    }),
});

const shopListAddMemberDtoInType = shape({
    id: id().isRequired(),
    uuid: uuIdentity().isRequired(),
});

const shopListRemoveMemberDtoInType = shape({
    id: id().isRequired(),
    uuid: uuIdentity().isRequired(),
});

const shopListAddItemDtoInType = shape({
    id: id().isRequired(),
    name: string(255).isRequired(),
});

const shopListRemoveItemDtoInType = shape({
    id: id().isRequired(),
    name: string(255).isRequired(),
});

const shopListSetItemStateDtoInType = shape({
    id: id().isRequired(),
    name: string(255).isRequired(),
    done: boolean().isRequired(),
});