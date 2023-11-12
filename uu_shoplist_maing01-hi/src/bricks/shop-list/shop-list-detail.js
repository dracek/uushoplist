//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import { Button, Icon, Toggle } from "uu5g05-elements";
import ShopListItem from "./shop-list-item.js";
import ShopListCreateModal from "./shop-list-create-modal.js";
import ShopListDeleteModal from "./shop-list-delete-modal.js";
import Config from "./config/config.js";
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
};

//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShopListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShopListDetail",
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

    const [showDone, setShowDone] = useState(true);

    function onCreateOpen() {
      setCreateOpen(true);
    }

    function onCreateClose() {
      setCreateOpen(false);
    }

    function onCreate(data) {
      props.callsMap.createItem(data);
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

    function onDone(e) {
      setShowDone(e.data.value);
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShopListDetail);

    const items = props.shopList && props.shopList.items ? props.shopList.items : [];

    return currentNestingLevel ? (
      <div {...attrs}>
        <div className={Css.itemContainer()}>
          <div>
            <Toggle label="Včetně splněných" value={showDone} onChange={onDone} box />
          </div>
          <div>
            <Button onClick={onCreateOpen} colorScheme="positive">
              <Icon icon={"mdi-plus"} /> Nová
            </Button>
          </div>
        </div>

        <div>
          {items
            .filter((item) => !item.done || showDone)
            .map((item, index) => (
              <ShopListItem
                item={item}
                key={item.name}
                onToggle={props.callsMap.toggleItem}
                onDeleteOpen={onDeleteOpen}
              />
            ))}
        </div>

        <ShopListCreateModal onCreate={onCreate} onClose={onCreateClose} open={createOpen} />
        <ShopListDeleteModal item={currentItem} onDelete={onDelete} onClose={onDeleteClose} open={deleteOpen} />

        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShopListDetail };
export default ShopListDetail;
//@@viewOff:exports
