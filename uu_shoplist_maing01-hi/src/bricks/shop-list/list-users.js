//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useSession, useLsi } from "uu5g05";
import { Button, Icon } from "uu5g05-elements";
import ListUsersAddModal from "./list-users-add-modal";
import ListUsersDeleteModal from "./list-users-delete-modal";
import Config from "./config/config.js";
import ListUsersItem from "./list-users-item";

import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      border: "1px solid gray",
      borderRadius: "5px",
    }),
  itemContainer: () =>
    Config.Css.css({
      display: "flex",
      margin: "25px",
      justifyContent: "space-between",
    }),
  leftButton: () =>
    Config.Css.css({
      marginLeft: "auto",
    }),
  leftButtonDisabled: () =>
    Config.Css.css({
      marginLeft: "auto",
      cursor: "not-allowed"
    }),  
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListUsers = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListUsers",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;

    const lsi = useLsi(importLsi).ListUsers || {};

    const [createOpen, setCreateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const { identity } = useSession();

    function onCreateOpen() {
      setCreateOpen(true);
    }

    function onCreateClose() {
      setCreateOpen(false);
    }

    function onAdd(data) {
      props.callsMap.addUser(data);
      setCreateOpen(false);
    }

    function onDeleteOpen(item) {
      setDeleteOpen(true);
      setCurrentItem(item);
    }

    function onDeleteClose() {
      setDeleteOpen(false);
      setCurrentItem(null);
    }

    function onDelete(data) {
      props.callsMap.deleteUser(data);
      setDeleteOpen(false);
      setCurrentItem(null);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListUsers);

    const users = props.shopList && props.shopList.users ? props.shopList.users : [];

    function isOwner() {
      return identity.uuIdentity === props.shopList.owner;
    }

    function isEditable(uuid) {
      return identity.uuIdentity === props.shopList.owner || identity.uuIdentity === uuid;
    }

    return props.status !== "ERROR" ? (
      <div {...attrs}>
        <div className={Css.itemContainer()}>
          <Button
            onClick={isOwner() ? onCreateOpen : undefined}
            className={isOwner() ? Css.leftButton() : Css.leftButtonDisabled()}
            colorScheme={isOwner() ? "positive" : "negative"}
          >
            <Icon icon={"mdi-plus"} /> {lsi.add}
          </Button>
        </div>

        <div>
          <ListUsersItem uuIdentity={props.shopList.owner} role={lsi.owner} isEditable={false} />
          <>
            {users.map((item) => (
              <ListUsersItem
                key={item}
                uuIdentity={item}
                role={lsi.member}
                isEditable={isEditable(item)}
                onDeleteClick={onDeleteOpen}
              />
            ))}
          </>
        </div>

        <ListUsersAddModal onAdd={onAdd} onClose={onCreateClose} open={createOpen} />
        <ListUsersDeleteModal item={currentItem} onDelete={onDelete} onClose={onDeleteClose} open={deleteOpen} />

        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListUsers };
export default ListUsers;
//@@viewOff:exports
