//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import Config from "./config/config.js";
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

const ShopListDeleteModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShopListDeleteModal",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShopListDeleteModal);

    function onSubmit(event) {
      props.onDelete(props.item.id);
      props.onClose();
    }

    const name = "Opravdu smazat položku " + (props.item && props.item.name) + "?";

    return (
      <Modal header={name} open={props.open} onClose={props.onClose} collapsible={false}>
        <Form onSubmit={onSubmit} disableLeaveConfirmation={true}>
          <CancelButton onClick={props.onClose} />
          <SubmitButton />
        </Form>
      </Modal>
      //@@viewOff:render
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShopListDeleteModal };
export default ShopListDeleteModal;
//@@viewOff:exports
