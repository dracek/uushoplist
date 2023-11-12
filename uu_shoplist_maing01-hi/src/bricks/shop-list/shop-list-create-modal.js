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

const ShopListCreateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShopListCreateModal",
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
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    function onSubmit(event) {
      props.onCreate(event.data.value.name);
    }

    return (
      <Modal {...attrs} header={"Nová položka"} open={props.open} onClose={props.onClose} collapsible={false}>
        <Form onSubmit={onSubmit} disableLeaveConfirmation={true}>
          <FormText
            name="name"
            label="Název položky"
            required
            placeholder={"Název položky včetně množství"}
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
export { ShopListCreateModal };
export default ShopListCreateModal;
//@@viewOff:exports
