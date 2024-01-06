//@@viewOn:imports
import { createVisualComponent, Utils, useLsi  } from "uu5g05";
import Config from "./config/config.js";
import { Chart } from 'uu5chartg01';

import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      paddingTop  : "40px",
      paddingBottom: "10px",
      "& .recharts-default-tooltip" : {
        color: "rgb(33, 33, 33)"
      }
    })
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListGraph = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListGraph",
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
    const lsi = useLsi(importLsi).ListGraph || {};

    const data = props.lists ? props.lists.map((list) => (
      {
        label: list.name,
        done: list.items.filter(item => item.done).length,
        notDone: list.items.filter(item => !item.done).length,
      })) 
    : [];
  
    const formatter = (value, name, props) => [value, lsi[name]];


    const ticks = 1 + Math.max(...data.map(list => Math.max(list.done, list.notDone)));

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return props.lists && props.lists.length > 0 ? (
      <div {...attrs}>
        <Chart.BarChart data={data} responsive>
          <Chart.CartesianGrid strokeDasharray="1 1" />
          <Chart.Bar dataKey="done" fill="rgb(76, 175, 80)" />
          <Chart.Bar dataKey="notDone" fill="rgb(244, 67, 54)" />
          <Chart.XAxis dataKey="label" />
          <Chart.YAxis tickCount={ticks} axisLine={false} />
          <Chart.Tooltip formatter={formatter} />
        </Chart.BarChart>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListGraph };
export default ListGraph;
//@@viewOff:exports
