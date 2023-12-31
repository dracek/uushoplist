//@@viewOn:imports
import { createComponent, useState, useSession, useEffect, useLsi } from "uu5g05";
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
function mockOwner(data, userId) {
  return data.map((item) => (item.id === 1 ? item : { ...item, owner: userId }));
}
//@@viewOff:helpers

const ShopListDataProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShopListDataProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi).ShopListDataProvider || {};

    const { identity } = useSession();
    const { addAlert } = useAlertBus();

    const [showArchived, setShowArchived] = useState(true);
    const [status, setStatus] = useState(STATUS_DONE);
    const [data, setData] = useState([]);

    useEffect(() => {
      listLists();
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

    async function listLists(dtoIn = {}) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.listLists({ showArchived, ...dtoIn });
        setData(mockOwner(res.data, identity.uuIdentity));
        setStatus(STATUS_DONE);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({ message: lsi.loadError });
      }
    }

    async function handleSetShowArchived(state) {
      setShowArchived(state);
      listLists({ showArchived: state });
    }

    async function handleCreateList(name) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.createList({ name: name });
        setStatus(STATUS_DONE);
        infoMsg({ message: lsi.create && lsi.create.replace("%s", name) });
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({ message: lsi.createError });
      }
      listLists();
    }

    async function handleToggleList(id, state) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.updateList({ id: id, archived: state });
        setStatus(STATUS_DONE);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({ message: lsi.updateError });
      }
      listLists();
    }

    async function handleDeleteList(id) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.deleteList({ id: id });
        setStatus(STATUS_DONE);
        infoMsg({ message: lsi.delete && lsi.delete.replace("%s", id) });
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({ message: lsi.deleteError });
      }
      listLists();
    }

    const newProps = {
      status: status,
      shopLists: data,
      showArchived,
      setShowArchived: handleSetShowArchived,
      callsMap: {
        handleCreateList,
        handleToggleList,
        handleDeleteList,
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
export { ShopListDataProvider };
export default ShopListDataProvider;
//@@viewOff:exports
