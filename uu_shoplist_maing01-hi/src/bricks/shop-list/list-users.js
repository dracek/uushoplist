//@@viewOn:imports
import {createVisualComponent, Utils, Content, useState, useSession} from "uu5g05";
import { Button, Icon, Toggle } from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import ListUsersAddModal from "./list-users-add-modal";
import ShopListDeleteModal from "./shop-list-delete-modal.js";
import Config from "./config/config.js";
import ListUsersItem from "./list-users-item";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
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

    function onAdd(data) { //
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
      props.callsMap.deleteItem(data);
      setDeleteOpen(false);
      setCurrentItem(null);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListUsers);

    console.log("detail map", props.callsMap);

    const users = props.shopList && props.shopList.users ? props.shopList.users : [];

    console.log(users);
    console.log(identity.uuIdentity);

    function isEditable(uuid){
      return (identity.uuIdentity === props.shopList.owner || identity.uuIdentity === uuid);
    }

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>Visual Component {ListUsers.uu5Tag}</div>
        <div>
            <Button onClick={onCreateOpen}>
              <Icon icon={"mdi-plus"} /> Přidat
            </Button>
        </div>

        <div>
          <ListUsersItem uuIdentity={props.shopList.owner} role={"Owner"} isEditable={false}/>
          <>
          {users
            .map((item) => <ListUsersItem key={item} uuIdentity={item} role={"Member"} isEditable={isEditable(item)} />)}
          </>
        </div>

        <ListUsersAddModal onAdd={onAdd} onClose={onCreateClose} open={createOpen} />
        <ShopListDeleteModal item={currentItem} onDelete={onDelete} onClose={onDeleteClose} open={deleteOpen} />

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
