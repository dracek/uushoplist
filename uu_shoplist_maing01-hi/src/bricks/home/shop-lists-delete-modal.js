//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, SubmitButton, CancelButton } from "uu5g05-forms";
import Config from "./config/config.js";

import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  submit: () =>
    Config.Css.css({
      marginLeft: "10px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShopListsDeleteModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShopListsDeleteModal",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const lsi = useLsi(importLsi).ShopListsDeleteModal || {};

    function onSubmit(event) {
      props.onDelete(props.list);
      props.onClose();
    }

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    const name = lsi.info + " '" + (props.list && props.list.name) + "' ?";

    return (
      <Modal {...attrs} header={name} open={props.open} onClose={props.onClose} collapsible={false}>
        <Form onSubmit={onSubmit} disableLeaveConfirmation={true}>
          <CancelButton onClick={props.onClose} />
          <SubmitButton className={Css.submit()} />
        </Form>
      </Modal>
      //@@viewOff:render
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShopListsDeleteModal };
export default ShopListsDeleteModal;
//@@viewOff:exports
