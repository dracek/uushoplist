//@@viewOn:imports
import { v4 } from "uuid";
import { createComponent, useState, useSession } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const initialData = [
  { id: 1, name: "Seznam č.1", owner: "1-1", archived: false },
  { id: 2, name: "Potraviny", owner: "1-1", archived: true },
  { id: 7, name: "Drogerie", owner: "1-1", archived: false },
  { id: 5, name: "Nedělní nákup", owner: "1-1", archived: false },
];

//@@viewOff:constants

//@@viewOn:helpers
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
    const { identity } = useSession();

    const [data, setData] = useState(initialData);

    function handleCreateList(name) {
      const newList = { id: v4(), name: name, owner: identity.uuIdentity, archived: false };
      setData([...data, newList]);
    }

    function handleToggleList(id, state) {
      setData(
        data.map((list) => {
          if (list.id === id) {
            return { ...list, archived: state };
          } else {
            return list;
          }
        })
      );
    }

    function handleDeleteList(id) {
      setData(data.filter((list) => list.id != id));
    }

    const newProps = {
      shopLists: data,
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
