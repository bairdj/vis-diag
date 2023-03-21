<template>
  <div id="results">
    <div class="row">
      <div class="col-2">
        <ResultCard v-bind:n="populationN" label="Injured patients presenting to ambulance service"
                    class="h-100"/>
      </div>
      <div class="col-4">
        <ResultCard v-bind:n="positiveN" label="Patients with major trauma" class="h-100"/>
      </div>
      <div class="col-4">
        <ResultCard v-bind:n="negativeN" label="Patients without major trauma" class="h-100"/>
      </div>
      <div class="col-2"></div>
    </div>
    <hr/>
    <div class="row">
      <div class="col-2">
        <div class="card h-100">
          <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
            <FontAwesomeIcon v-bind:icon="plusIcon" size="3x"></FontAwesomeIcon>
            <h5>Major trauma tool triggered</h5>
          </div>
        </div>
      </div>
      <div class="col-4">
        <ResultCard v-bind:n="truePositives" label="Correctly have MTC trauma team activation" class="h-100"
                    v-bind:prop="truePositives / populationN" v-bind:showBar="true"
                    :tu-catchment="tuCatchment"
                    tu-label="patients injured in TU catchment bypassed and alerted"
                    mtc-label="patients injured in MTC catchment and pre-alerted"
        />
      </div>
      <div class="col-4">
        <ResultCard v-bind:n="falsePositives"
                    label="Incorrectly have MTC trauma team activation"
                    v-bind:prop="falsePositives / populationN"
                    class="h-100"
                    v-bind:showBar="true"
                    :tu-catchment="tuCatchment"
                    tu-label="patients injured in TU catchment bypassed and pre-alerted"
                    mtc-label="patients injured in MTC catchment and pre-alerted"
        />
      </div>
      <div class="col-2">
        <ResultCard v-bind:prop="ppv" class="h-100" label="Probability of having major trauma if tool triggered"
                    v-bind:showBar="false"/>
      </div>
    </div>
    <hr/>
    <div class="row">
      <div class="col-2">
        <div class="card h-100">
          <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
            <FontAwesomeIcon v-bind:icon="minusIcon" size="3x"></FontAwesomeIcon>
            <h5>Major trauma tool not triggered</h5>
          </div>
        </div>
      </div>
      <div class="col-4">
        <ResultCard v-bind:n="falseNegatives"
                    label="Incorrectly do not have MTC trauma team activation"
                    class="h-100"
                    v-bind:prop="falseNegatives / populationN"
                    v-bind:showBar="true"
                    :tu-catchment="tuCatchment"
                    tu-label="patients injured in TU catchment and taken to TU without pre-alert"
                    mtc-label="patients injured in MTC catchment and taken to MTC without pre-alert"
        />
      </div>
      <div class="col-4">
        <ResultCard v-bind:n="trueNegatives"
                    label="Correctly do not have MTC trauma team activation"
                    class="h-100"
                    v-bind:prop="trueNegatives / populationN"
                    v-bind:showBar="true"
                    :tu-catchment="tuCatchment"
                    mtc-label="patients in MTC catchment and taken to MTC without pre-alert"
                    tu-label="patients injured in TU catchment and taken to TU without pre-alert"
                    />
      </div>
      <div class="col-2">
        <ResultCard v-bind:prop="falseOmissionRate" class="h-100" label="Probability of having major trauma if tool not triggered"
                    v-bind:showBar="false"/>
      </div>
    </div>
    <p class="mt-4 p-2 border rounded">
      A typical trauma network has {{ nMtc }} major trauma centre (MTC) and {{ nTu }} Trauma units (TU).
      There are approximately {{  populationN }} 999 calls for non-trivial injured patients each week in an average trauma network.
      Of these {{populationN }} cases approximately {{  getDisplayPercentage(eventRate) }} ({{ Math.round(eventRate * populationN) }} cases) would have major trauma.
      If we use a triage tool with {{ getDisplayPercentage(sensitivity) }} sensitivity and {{ getDisplayPercentage(specificity) }} specificity,
      assuming perfect compliance, this would result in {{ Math.round((truePositives + falsePositives)/7) }} MTC trauma team activations per day.
      Of these trauma calls, {{ Math.round(truePositives / 7)}} would have major trauma, while {{ Math.round(falsePositives / 7) }} would not have major trauma.
      The over-triage rate (1-PPV, or false detection rate) would therefore be {{  getDisplayPercentage(1 - ppv) }}.
      Of the {{ positiveN }} patients with major trauma, {{  Math.round(truePositives) }} cases would correctly have MTC trauma team activations ({{ (truePositives / 7).toFixed(1) }} per day),
      while {{ Math.round(falseNegatives) }} cases would incorrectly not receive MTC trauma team activations ({{ (falseNegatives / 7).toFixed(1) }} per day).
      Of the false negative major trauma cases {{ ((falseNegatives * tuCatchment)/nTu / 7).toFixed(1) }} would be taken per day to each TU without pre-alert.
      The under-triage rate (1-sensitivity) is therefore {{ getDisplayPercentage(1 - sensitivity) }}.
    </p>
  </div>
</template>

<script>
import ResultCard from "./ResultCard";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "ResultsTable",
  props: {
    sensitivity: {
      type: Number,
      required: true
    },
    specificity: {
      type: Number,
      required: true
    },
    eventRate: {
      type: Number,
      required: true
    },
    populationN: {
      type: Number,
      required: true
    },
    nTu:{
      type: Number,
      required: true
    },
    tuCatchment: {
      type: Number,
      required: true
    },
  },
  components: {
    FontAwesomeIcon,
    ResultCard
  },
  computed: {
    positiveN() {
      return this.populationN * this.eventRate;
    },
    negativeN() {
      return this.populationN * (1 - this.eventRate);
    },
    truePositives() {
      return this.populationN * this.eventRate * this.sensitivity
    },
    truePositivesTu() {
      return this.truePositives * this.tuCatchment
    },
    falseNegatives() {
      return this.populationN * this.eventRate * (1 - this.sensitivity)
    },
    falsePositives() {
      return this.populationN * (1 - this.eventRate) * (1 - this.specificity)
    },
    trueNegatives() {
      return this.populationN * (1 - this.eventRate) * this.specificity;
    },
    ppv() {
      return this.truePositives / (this.truePositives + this.falsePositives);
    },
    npv() {
      return this.trueNegatives / (this.trueNegatives + this.falseNegatives);
    },
    falseOmissionRate() {
      return 1 - this.npv
    },
    plusIcon: () => faPlus,
    minusIcon: () => faMinus,
    nMtc: () => 1
  },
  methods: {
    getDisplayPercentage: p => (p*100).toFixed(1) + "%"
  }
}
</script>

<style scoped>

</style>