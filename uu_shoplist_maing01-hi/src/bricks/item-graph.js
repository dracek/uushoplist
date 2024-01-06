//@@viewOn:imports
import { createVisualComponent, Utils, useLsi  } from "uu5g05";
import Config from "./config/config.js";
import { SimpleChart } from 'uu5chartg01';

import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      paddingBottom: "10px",
      "& p.uu5-simple-chart-custom-tooltip-intro" : {
        color: "rgb(33, 33, 33)"
      }
//uu5-simple-chart-all uu5-simple-chart-custom-tooltip-intro
    })
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const series =  [
    {
      "labelKey": "label",
      "valueKey": "value",
      "colorSchema": [
        "green-rich",
        "red-rich"
      ],
      "outerRadius": 90,
      "innerRadius": 60
    }]

const ItemGraph = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ItemGraph",
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
    const lsi = useLsi(importLsi).ItemGraph || {};

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    const data = [
      {
        "label": lsi.done,
        "value": props.items.filter(item => item.done).length,
      },
      {
        "label": lsi.notDone,
        "value": props.items.filter(item => !item.done).length,
      }];

    return props.items && props.items.length > 0 ? (
      <div {...attrs}>
        <SimpleChart.PieChart data={data} series={series} displayLabel={false} responsive={true} ></SimpleChart.PieChart>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ItemGraph };
export default ItemGraph;
//@@viewOff:exports
