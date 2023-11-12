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
  submit: () =>
    Config.Css.css({
      marginLeft: "10px",
    }),
  textRow: () =>
    Config.Css.css({
      marginBottom: "10px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const EditHeaderModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditHeaderModal",
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
    function onSubmit(event) {
      props.onEdit(event.data.value.name);
      props.onClose();
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <Modal {...attrs} header={"Upravit seznam"} open={props.open} onClose={props.onClose} collapsible={false}>
        <Form onSubmit={onSubmit} disableLeaveConfirmation={true}>
          <FormText
            name="name"
            label="Nový název seznamu"
            initialValue={props.name}
            required
            placeholder={"napište sem nový název"}
            className={Css.textRow()}
          />
          <CancelButton onClick={props.onClose} />
          <SubmitButton className={Css.submit()} />
        </Form>
      </Modal>
      //@@viewOff:render
    );
  },
});

//@@viewOn:exports
export { EditHeaderModal };
export default EditHeaderModal;
//@@viewOff:exports
