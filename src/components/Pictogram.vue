<template>
  <div ref="pictogramElement">

  </div>
</template>

<script>
import * as d3 from 'd3';
import {onMounted, ref} from "vue";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
import {  icon } from "@fortawesome/fontawesome-svg-core";


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
    const initialisePictogram = () => {
      const base = d3.select(pictogramElement.value).append('svg').attr('width', props.width).attr('height', props.height);
      d3Element.value = base;
      base.append("g");
      drawPictogram();
    }
    const drawPictogram = async () => {
      const prop = props.prop;
      const width = props.width;
      const height = props.height;
      const rows = props.rows;
      const columns = props.columns;
      const iconWidth = width / columns;
      const iconHeight = height / rows - 1;
      const data = d3.range(Math.round(rows * columns * prop));
      const rowsRequired = Math.ceil(data.length / columns);
      d3Element.value.attr('height', props.height * (rowsRequired / rows));
      const circles = d3Element.value.select("g").selectAll("svg")
          .data(data);
      circles.enter()
          .append(d => {
            const indIcon = d % 2 ? faMale : faFemale;
            return icon(indIcon).node[0];
          })
          .attr('x', d => ((d % columns) * (width / columns)))
          .attr('y', d => (Math.floor(d / columns) * (height / rows)))
          .attr('width', iconWidth)
          .attr('height', iconHeight)
          .attr('fill', 'red');
      circles
          .exit()
          .remove();

    }
    onMounted(initialisePictogram);
    return {
      pictogramElement,
      drawPictogram,
      initialisePictogram
    }
  },
  watch: {
    prop: 'drawPictogram'
  }
}
</script>

<style scoped>

</style>