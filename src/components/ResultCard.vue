<template>
  <div class="card">
    <div class="card-body">
      <div v-if="n !== undefined">
        <div class="d-flex align-items-center border-bottom">
          <span class="me-2 fs-2">{{ Math.round(n) }}</span>
          <span class="fs-6 lh-1">{{ label }}</span>
        </div>
      </div>
      <h3 v-if="prop && n === undefined">
        {{ (prop * 100).toFixed(1) }}%
      </h3>
      <div v-if="tuCatchment">
        <div>
          {{ nTu }} {{ tuLabel }}
          <Pictogram v-bind:columns="25" v-bind:rows="4" v-bind:height="100" v-bind:width="325" v-bind:prop="prop * tuCatchment"/>
        </div>
        <div>
          {{ nMtc }} {{ mtcLabel }}
          <Pictogram v-bind:columns="25" v-bind:rows="4" v-bind:height="100" v-bind:width="325" v-bind:prop="prop * (1 - tuCatchment)"/>
        </div>
      </div>
      <div v-else>
        <div v-if="prop && showBar">
          <!--<div class="progress">
              <div class="bg-primary text-light text-center" v-bind:style="style">

              </div>
          </div>-->
          <Pictogram v-bind:columns="25" v-bind:rows="4" v-bind:height="100" v-bind:width="325" v-bind:prop="prop"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pictogram from "./Pictogram";

export default {
  name: 'ResultCard',
  props: {
    n: Number,
    label: String,
    prop: Number,
    showBar: Boolean,
    tuCatchment: Number,
    tuLabel: String,
    mtcLabel: String
  },
  components: {
    Pictogram
  },
  computed: {
    nTu() {
      return Math.round(this.n * this.tuCatchment)
    },
    nMtc() {
      return Math.round(this.n * (1 - this.tuCatchment))
    }
  }
}
</script>