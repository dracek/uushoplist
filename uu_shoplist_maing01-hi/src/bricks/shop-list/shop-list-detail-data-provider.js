//@@viewOn:imports
import { createComponent, useState, useSession, useEffect, useRoute, useLsi } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Config from "./config/config.js";
import Calls from "calls";

import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
const STATUS_DONE = "DONE";
const STATUS_WAITING = "WAITING";
const STATUS_ERROR = "ERROR";
//@@viewOff:constants

//@@viewOn:helpers
function mockOwner(res, id, userId) {
  let newState = Object.assign({}, res);
  newState.name = newState.name + id;

  if (id == 1) {
    newState.users = [...newState.users, userId];
  } else {
    newState.owner = userId;
  }
  return newState;
}

//@@viewOff:helpers

const ShopListDetailDataProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShopListDetailDataProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi).ShopListDetailDataProvider || {};

    const { identity } = useSession();
    const { addAlert } = useAlertBus();
    const [, setRoute] = useRoute();

    const [status, setStatus] = useState(STATUS_DONE);
    const [data, setData] = useState({});

    useEffect(() => {
      getList({ id: props.id });
    }, []);

    function infoMsg(msg) {
      addAlert(
        Object.assign(
          {
            priority: "success",
            durationMs: 2500,
          },
          msg
        )
      );
    }

    function alertMsg(msg) {
      addAlert(
        Object.assign(
          {
            header: "Error",
            priority: "error",
          },
          msg
        )
      );
    }

    async function getList(dtoIn) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.getList(dtoIn);

        setData(mockOwner(res, props.id, identity.uuIdentity));
        setStatus(STATUS_DONE);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({ message: lsi.loadError });
      }
    }

    async function handleChangeName(newName) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.updateList({id: props.id, name: newName});

        setData(mockOwner(res, props.id, identity.uuIdentity));
        setStatus(STATUS_DONE);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({ message: lsi.updateError });
      }
    }

    async function handleToggleItem(name, state) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.updateItem({id: props.id, itemName: name, done: state});

        setData(mockOwner(res, props.id, identity.uuIdentity));
        setStatus(STATUS_DONE);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({ message: lsi.updateStateError });
      }
    }

    async function handleCreateItem(name) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.createItem({id: props.id, itemName: name});

        setData(mockOwner(res, props.id, identity.uuIdentity));
        setStatus(STATUS_DONE);
        infoMsg({ message: lsi.create && lsi.create.replace("%s", name)});
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({ message: lsi.createError });
      }
    }

    async function handleDeleteItem(name) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.deleteItem({id: props.id, itemName: name});

        setData(mockOwner(res, props.id, identity.uuIdentity));
        setStatus(STATUS_DONE);
        infoMsg({ message: lsi.delete && lsi.delete.replace("%s", name) });
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({ message: lsi.deleteError });
      }
    }

    async function handleAddUser(id) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.addUser({id: props.id, userId: id});

        setData(mockOwner(res, props.id, identity.uuIdentity));
        setStatus(STATUS_DONE);
        infoMsg({ message: lsi.addUser && lsi.addUser.replace("%s", id) });
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({ message: lsi.addUserError });
      }
    }

    async function handleDeleteUser(id) {
      if (identity.uuIdentity === id) {
        setStatus(STATUS_WAITING);
        let res = await Calls.deleteUser({id: props.id, userId: id});
        setStatus(STATUS_DONE);
        infoMsg({ message: lsi.deleteUserSelf });
        setRoute("home");
      } else {
        try {
          setStatus(STATUS_WAITING);
          let res = await Calls.deleteUser({id: props.id, userId: id});
  
          setData(mockOwner(res, props.id, identity.uuIdentity));
          setStatus(STATUS_DONE);
          infoMsg({ message: lsi.deleteUser && lsi.deleteUser.replace("%s", identity.uuIdentity) });
        } catch (error) {
          setStatus(STATUS_ERROR);
          alertMsg({ message: lsi.deleteUserError });
        }
      }
    }

    const newProps = {
      status: status,
      shopList: data,
      callsMap: {
        changeName: handleChangeName,
        toggleItem: handleToggleItem,
        createItem: handleCreateItem,
        deleteItem: handleDeleteItem,
        addUser: handleAddUser,
        deleteUser: handleDeleteUser,
      },
    };

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return props.children(newProps);
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShopListDetailDataProvider };
export default ShopListDetailDataProvider;
//@@viewOff:exports
