//@@viewOn:imports
import { createVisualComponent, Utils, useState, useSession } from "uu5g05";
import { Button, Icon } from "uu5g05-elements";
import Config from "./config/config.js";
import EditHeaderModal from "./edit-header-modal.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  header: () =>
    Config.Css.css({
      display: "inline-flex",
    }),
  editButton: () =>
    Config.Css.css({
      marginLeft: "15px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const EditableHeader = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditableHeader",
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
    const [open, setOpen] = useState(false);
    const { identity } = useSession();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    function onEdit(data) {
      props.callsMap.changeName(data);
    }

    function onClose() {
      setOpen(false);
    }

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, EditableHeader);

    const name = (props.shopList && props.shopList.name) || "";
    const isEditable = props.shopList && props.shopList.owner == identity.uuIdentity;

    return props.status !== "ERROR" ? (
      <div {...attrs}>
        <h1 className={Css.header()}>
          {name}
          {isEditable ? (
            <Button onClick={() => setOpen(true)} className={Css.editButton()}>
              <Icon icon="mdi-pencil" />
            </Button>
          ) : null}
        </h1>
        <EditHeaderModal name={name} onEdit={onEdit} onClose={onClose} open={open} />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EditableHeader };
export default EditableHeader;
//@@viewOff:exports
