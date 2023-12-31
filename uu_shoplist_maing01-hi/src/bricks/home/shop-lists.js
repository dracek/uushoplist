//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useState, useLsi } from "uu5g05";
import { Button, Icon, Grid, Toggle } from "uu5g05-elements";
import ShopListsCreateModal from "./shop-lists-create-modal";
import ShopListsDeleteModal from "./shop-lists-delete-modal";
import ShopListTile from "./shop-list-tile";
import Config from "./config/config.js";

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
      padding: "25px",
      minWidth: "350px",
    }),
  itemContainer: () =>
    Config.Css.css({
      display: "flex",
      marginBottom: "25px",
      justifyContent: "space-between",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShopLists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShopLists",
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
    const { children, showArchived, setShowArchived } = props;

    const lsi = useLsi(importLsi).ShopLists || {};

    const [createOpen, setCreateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [currentList, setCurrentList] = useState(null);

    function onCreateOpen() {
      setCreateOpen(true);
    }

    function onCreateClose() {
      setCreateOpen(false);
    }

    function onCreate(data) {
      props.callsMap.handleCreateList(data);
      setCreateOpen(false);
    }

    function onDeleteOpen(list) {
      setCurrentList(list);
      setDeleteOpen(true);
    }

    function onDeleteClose() {
      setDeleteOpen(false);
      setCurrentList(null);
    }

    function onDelete(list) {
      props.callsMap.handleDeleteList(list.id);
      setDeleteOpen(false);
      setCurrentList(null);
    }

    function onToggle(data, state) {
      props.callsMap.handleToggleList(data, state);
    }

    function onArchivechanged(e) {
      setShowArchived(e.data.value);
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return props.status !== "ERROR" ? (
      <div {...attrs}>
        <div className={Css.itemContainer()}>
          <div>
            <Toggle label={lsi.withArchived} value={showArchived} onChange={onArchivechanged} box />
          </div>
          <div>
            <Button onClick={onCreateOpen} colorScheme="positive">
              <Icon icon={"mdi-plus"} /> <Lsi import={importLsi} path={["ShopLists", "newButton"]} />
            </Button>
          </div>
        </div>
        <Grid templateColumns={{ xs: "1fr", m: "1fr 1fr", l: "1fr 1fr 1fr" }} columnGap={"25px"}>
          {props.shopLists.map((list) => (
            <ShopListTile key={list.id} list={list} onToggle={onToggle} onDelete={onDeleteOpen} />
          ))}
        </Grid>
        <ShopListsCreateModal onCreate={onCreate} onClose={onCreateClose} open={createOpen} />
        <ShopListsDeleteModal onDelete={onDelete} onClose={onDeleteClose} open={deleteOpen} list={currentList} />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShopLists };
export default ShopLists;
//@@viewOff:exports
