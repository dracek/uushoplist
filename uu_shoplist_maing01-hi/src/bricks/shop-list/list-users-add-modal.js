//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
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

const ListUsersAddModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListUsersAddModal",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListUsersAddModal);

    function onSubmit(event) {
      console.log(event);
      props.onAdd(event.data.value.id);
    }

    return (
      <Modal header={"Přidat uživatele"} open={props.open} onClose={props.onClose} collapsible={false}>
        <Form onSubmit={onSubmit} disableLeaveConfirmation={true}>
          <FormText name="id" label="ID uživatele" required placeholder={"UUID uživatele"} />
          <CancelButton onClick={props.onClose} />
          <SubmitButton />
        </Form>
      </Modal>
      //@@viewOff:render
    );
  },
});

//@@viewOn:exports
export { ListUsersAddModal };
export default ListUsersAddModal;
//@@viewOff:exports
