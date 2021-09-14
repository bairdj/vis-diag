<template>
  <div ref="pictogramElement">

  </div>
</template>

<script>
import * as d3 from 'd3';
import {onMounted, ref, watch, toRefs } from "vue";


export default {
  name: "Pictogram",
  props: {
    prop: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    rows: {
      type: Number,
      required: true
    },
    columns: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const pictogramElement = ref(null);
    const d3Element = ref(null);
    const { prop } = toRefs(props);
    const initialisePictogram = () => {
      const base = d3.select(pictogramElement.value).append('svg').attr('width', props.width).attr('height', props.height);
      d3Element.value = base;
      base.append("g");
      drawPictogram();
    }
    const drawPictogram = async () => {
      const prop = props.prop;
      //const width = props.width;
      //const height = props.height;
      const rows = props.rows;
      const columns = props.columns;
      const iconWidth = 5;
      const iconHeight = 5;
      const padding = 2;
      const data = d3.range(Math.round(rows * columns * prop));
      const rowsRequired = Math.ceil(data.length / columns);
      d3Element.value.attr('height', rowsRequired * (iconHeight + padding));
      const circles = d3Element.value.select("g").selectAll("rect")
          .data(data);
      circles.enter()
          .append("rect")
          .attr('x', d => ((d % columns) * (iconWidth + padding)))
          .attr('y', d => (Math.floor(d / columns) * (iconHeight + padding)))
          .attr('width', iconWidth)
          .attr('height', iconHeight)
          .attr('fill', 'black');
      circles
          .exit()
          .remove();

    }
    onMounted(initialisePictogram);
    watch(prop, drawPictogram);
    return {
      pictogramElement,
      drawPictogram,
      initialisePictogram
    }
  }
}
</script>

<style scoped>

</style>