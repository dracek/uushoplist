//@@viewOn:imports
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { createComponent, useReducer } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants

const ACTION_NAME_CHANGE = "changeName";
const ACTION_ITEM_TOGGLE = "toggleItem";
const ACTION_ITEM_CREATE = "createItem";
const ACTION_ITEM_DELETE = "deleteItem";

const initialReducerState = {
  // todo remove shoplist from depth?
  shopList: {
    name: "Seznam č.1",
    items: [
      {
        name: "mlíko",
        done: true,
        id: "256",
      },
      {
        name: "zelí",
        done: false,
        id: "291335",
      },
    ],
    owner: "0-0",
  },
};

//@@viewOff:constants

//@@viewOn:helpers

//status: "success", // backend calls status.. usestate???????????

// jen pro mockování server calls :)
function reducer(state, action) {
  const payload = action.payload;

  console.log("reducer change", action.type, payload);

  switch (action.type) {
    case ACTION_NAME_CHANGE:
      return { ...state, shopList: Object.assign({}, state.shopList, { name: payload }) };

    case ACTION_ITEM_TOGGLE: {
      const shopListItems = state.shopList.items.map((item) => {
        if (item.id === payload) {
          return { ...item, done: !item.done };
        } else {
          return item;
        }
      });
      return { ...state, shopList: Object.assign({}, state.shopList, { items: shopListItems }) };
    }

    case ACTION_ITEM_CREATE: {
            const newItem = {
        name: payload,
        done: false,
        id: uuidv4(),
      };
      return { ...state, shopList: Object.assign({}, state.shopList, { items: [...state.shopList.items, newItem] }) };
    }

    case ACTION_ITEM_DELETE:
      return {
        ...state,
        shopList: Object.assign({}, state.shopList, {
          items: state.shopList.items.filter((item) => item.id != payload),
        }),
      };

    /*
    case "remove":
      // immutable remove of item from array
      return items.filter((item) => item.id !== payload.id);
    case "setRating":
      // immutable update of item in array
      return items.map((item) => {
        if (item.id === payload.id) {
          return { ...item, rating: payload.rating };
        } else {
          return item;
        }
      });
    case "reset":
      return payload.items; */
    default:
      console.error("Unrecognized action type", action.type);
      return state;
  }
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
    const { children } = props;

    console.log(uuidv4());

    const [reducerState, dispatch] = useReducer(reducer, initialReducerState);

    function handleChangeName(newName) {
      dispatch({
        type: ACTION_NAME_CHANGE,
        payload: newName,
      });
    }

    function handleToggleItem(id) {
      dispatch({
        type: ACTION_ITEM_TOGGLE,
        payload: id,
      });
    }

    function handleCreateItem(name) {
      dispatch({
        type: ACTION_ITEM_CREATE,
        payload: name,
      });
    }

    function handleDeleteItem(id) {
      dispatch({
        type: ACTION_ITEM_DELETE,
        payload: id,
      });
    }

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          shopList: reducerState.shopList,
          callsMap: {
            [ACTION_NAME_CHANGE]: handleChangeName,
            [ACTION_ITEM_TOGGLE]: handleToggleItem,
            [ACTION_ITEM_CREATE]: handleCreateItem,
            [ACTION_ITEM_DELETE]: handleDeleteItem,
          },
        });
      });
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <>Hi! {renderChildren()}</> ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShopListDetailDataProvider };
export default ShopListDetailDataProvider;
//@@viewOff:exports
