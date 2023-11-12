//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, SubmitButton, CancelButton } from "uu5g05-forms";
import Config from "./config/config.js";
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

const ListUsersDeleteModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListUsersDeleteModal",
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

    function onSubmit(event) {
      props.onDelete(props.item);
      props.onClose();
    }

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    const name = "Opravdu smazat uživatele '" + props.item + "' ?";

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
export { ListUsersDeleteModal };
export default ListUsersDeleteModal;
//@@viewOff:exports
