//@@viewOn:imports
import { createComponent, useReducer, useSession } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants

const ACTION_NAME_CHANGE = "changeName";
const ACTION_ITEM_TOGGLE = "toggleItem";
const ACTION_ITEM_CREATE = "createItem";
const ACTION_ITEM_DELETE = "deleteItem";
const ACTION_USER_ADD = "addUser";
const ACTION_USER_DELETE = "deleteUser";

//@@viewOff:constants

//@@viewOn:helpers
const initialReducerState = {
  name: "Seznam č.",
  items: [
    {
      name: "trvanlivé mléko",
      done: true,
    },
    {
      name: "hlávkové zelí",
      done: false,
    },
    {
      name: "játrová paštika",
      done: false,
    },
  ],
  owner: "15-8545-1",
  users: ["7411-6694-3445-0000"],
};

function createInitialState(id, userId) {
  let newState = Object.assign({}, initialReducerState);
  newState.name = newState.name + id;

  if (id == 1) {
    newState.owner = userId;
  } else if (id == 2) {
    newState.users = [...newState.users, userId];
  } else {
    alert("Na tento list nemáte oprávnění - backend by vrátil error.");
  }
  return newState;
}

// jen pro mockování server calls :)
function reducer(state, action) {
  const payload = action.payload;

  //console.log("Reducer action:", action.type, payload);

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
        done: false,
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case ACTION_ITEM_DELETE:
      return {
        ...state,
        items: state.items.filter((item) => item.name != payload),
      };

    case ACTION_USER_ADD:
      return { ...state, users: [...state.users, payload] };

    case ACTION_USER_DELETE:
      return {
        ...state,
        users: state.users.filter((item) => item != payload),
      };

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
    const { identity } = useSession();

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

    function handleDeleteUser(id) {
      if (identity.uuIdentity === id) {
        alert(
          "Touto akcí uživatel sám sebe smaže z tohoto listu, po uložení by došlo k přesměrování na routu se seznamem shopping listů a tento list se mu tam už nezobrazí. (routa zatím není implementována)"
        );
      } else {
        dispatch({
          type: ACTION_USER_DELETE,
          payload: id,
        });
      }
    }

    const newProps = {
      shopList: reducerState,
      callsMap: {
        [ACTION_NAME_CHANGE]: handleChangeName,
        [ACTION_ITEM_TOGGLE]: handleToggleItem,
        [ACTION_ITEM_CREATE]: handleCreateItem,
        [ACTION_ITEM_DELETE]: handleDeleteItem,
        [ACTION_USER_ADD]: handleAddUser,
        [ACTION_USER_DELETE]: handleDeleteUser,
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
