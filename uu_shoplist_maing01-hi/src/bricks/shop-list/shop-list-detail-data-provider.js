//@@viewOn:imports
import React from "react";
import { v4 as uuidv4 } from "uuid";
import {createComponent, useReducer, useSession} from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants

const ACTION_NAME_CHANGE = "changeName";
const ACTION_ITEM_TOGGLE = "toggleItem";
const ACTION_ITEM_CREATE = "createItem";
const ACTION_ITEM_DELETE = "deleteItem";
const ACTION_USER_ADD    = "addUser";


const initialReducerState = {
    name: "Seznam č.",
    items: [
      {
        name: "mlíko",
        done: true
      },
      {
        name: "zelí",
        done: false
      },
    ],
    owner: "15-8545-1",
    users: ["15-8545-1", "0-0"]
};

function createInitialState(id, userId){
  let newState = Object.assign({}, initialReducerState);
  newState.name = newState.name + id;

  if(id == 1){
    newState.owner = userId;
  } else if(id == 2){
    newState.users.push(userId);
  }

  return newState;

}

//@@viewOff:constants

//@@viewOn:helpers

//status: "success", // backend calls status.. usestate???????????

// jen pro mockování server calls :)
function reducer(state, action) {
  const payload = action.payload;

  console.log("reducer change", action.type, payload);

  switch (action.type) {
    case ACTION_NAME_CHANGE:
      return { ...state, name: payload };

    case ACTION_ITEM_TOGGLE: {
      const changedItems = state.items.map((item) => {
        if (item.name === payload) {
          return { ...item, done: !item.done };
        } else {
          return item;
        }
      });
      return { ...state, items: changedItems };
    }

    case ACTION_ITEM_CREATE: {
      const newItem = {
        name: payload,
        done: false
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case ACTION_ITEM_DELETE:
      return {
        ...state,
        items: state.items.filter((item) => item.name != payload),
      };

    case ACTION_USER_ADD:
      console.log(payload, "-");
      return { ...state, users: [...state.users, payload] };

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

    console.log("xxx", props);
    const { identity } = useSession();
    console.log("session", identity);

    const [reducerState, dispatch] = useReducer(reducer, createInitialState(props.id, identity.uuIdentity));

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

    function handleAddUser(id) {
      dispatch({
        type: ACTION_USER_ADD,
        payload: id,
      });
    }

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          shopList: reducerState,
          callsMap: {
            [ACTION_NAME_CHANGE]: handleChangeName,
            [ACTION_ITEM_TOGGLE]: handleToggleItem,
            [ACTION_ITEM_CREATE]: handleCreateItem,
            [ACTION_ITEM_DELETE]: handleDeleteItem,
            [ACTION_USER_ADD]: handleAddUser,
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
