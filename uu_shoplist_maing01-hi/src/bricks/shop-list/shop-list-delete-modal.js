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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const lsi = useLsi(importLsi).ShopListDeleteModal || {};

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    function onSubmit(event) {
      props.onDelete(props.item.name);
      props.onClose();
    }

    const name = lsi.header && lsi.header.replace("%s", props.item && props.item.name);

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
export { ShopListDeleteModal };
export default ShopListDeleteModal;
//@@viewOff:exports
