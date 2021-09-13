<template>
  <div class="container mt-2" id="toolContainer">
    <div class="row">
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h4>Pre-Test Probability/Prevalence</h4>
            <div>
              The probability that a patient presenting with trauma actually has major trauma
            </div>
            <input v-model="eventRate" type="range" min="0" max="1" step="0.005" class="form-range">
            <h5 class="slide-display">{{ getPercentageDisplay(eventRate) }}</h5>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h4>Sensitivity</h4>
            <div>
              The proportion of patients with major trauma who trigger the major trauma tool
            </div>
            <input v-model="sensitivity" type="range" min="0" max="1" step="0.005" class="form-range">
            <h5 class="slide-display">{{ getPercentageDisplay(sensitivity) }}</h5>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h4>Specificity</h4>
            <div>
              The proportion of patients without major trauma who do not trigger the major trauma tool
            </div>
            <input v-model="specificity" type="range" min="0" max="1" step="0.005" class="form-range">
            <h5 class="slide-display">{{ getPercentageDisplay(specificity) }}</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-1">
      <h4 class="d-inline-block me-2">Preset</h4>
      <input min="0" max="1" step="0.01" class="form-range" type="range">
      <div class="d-flex justify-content-between">
        <span>More sensitive</span>
        <span>Balanced</span>
        <span>More specific</span>
      </div>
    </div>
    <h2 class="mt-3">Results</h2>
    <ResultsTable :sensitivity="sensitivity" :specificity="specificity" :population-n="populationN" :event-rate="eventRate"/>
  </div>

</template>

<script>
import ResultsTable from "./components/ResultsTable";

const populationN = 1e3;

export default {
  name: 'App',
  data() {
    return {
      eventRate: 0.02,
      sensitivity: 0.6,
      specificity: 0.6
    }
  },
  methods: {
    getPercentageDisplay: val => (val * 100.0).toFixed(1) + "%",
    setPreset(sens, spec) {
      this.sensitivity = sens;
      this.specificity = spec;
    }
  },
  computed: {
    populationN: () => populationN
  },
  components: {
    ResultsTable
  }
}
</script>

<style>
input[type="range"] {
  width: 100%;
  display: block;
  margin-top: 0.5em;
}

.slide-display {
  text-align: center;
}
</style>
