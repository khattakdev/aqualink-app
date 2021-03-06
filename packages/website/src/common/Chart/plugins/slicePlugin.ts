const { Chart } = require("react-chartjs-2");

export const sliceDrawPlugin = {
  id: "sliceDrawPlugin",
  afterDatasetsDraw: (chart: any, _easingValue: any, options: any) => {
    const yScale = chart.scales["y-axis-0"];
    const xScale = chart.scales["x-axis-0"];

    const { top, bottom } = yScale;
    const { ctx } = chart;
    const xCoord = xScale.getPixelForValue(options.sliceAtLabel);

    if (options.sliceAtLabel) {
      ctx.beginPath();
      ctx.moveTo(xCoord, top);
      // eslint-disable-next-line fp/no-mutation
      ctx.strokeStyle = "#777777";
      ctx.lineTo(xCoord, bottom);
      ctx.stroke();
    }
  },
};

Chart.pluginService.register(sliceDrawPlugin);
