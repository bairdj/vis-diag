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
            <input v-model.number="eventRate" type="range" min="0" max="1" step="0.005" class="form-range">
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
            <input v-model.number="sensitivity" type="range" min="0" max="1" step="0.005" class="form-range">
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
            <input v-model.number="specificity" type="range" min="0" max="1" step="0.005" class="form-range">
            <h5 class="slide-display">{{ getPercentageDisplay(specificity) }}</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-1">
      <h4 class="d-inline-block me-2">Preset</h4>
      <input min="0"
             :max="rocFrontier.length - 1"
             step="1"
             class="form-range"
             type="range"
             v-on:change="updatePreset"
             v-model="selectedPreset">
      <div class="d-flex justify-content-between">
        <span>More specific</span>
        <span>Balanced</span>
        <span>More sensitive</span>
      </div>
    </div>
    <h2 class="mt-3">Results</h2>
    <ResultsTable :sensitivity="sensitivity" :specificity="specificity" :population-n="populationN" :event-rate="eventRate"/>
  </div>

</template>

<script>
import ResultsTable from "./components/ResultsTable";

const populationN = 1e3;
const rocFrontier = [
    [0.220954357, 0.954703833],
    [0.268115942, 0.950408401],
    [0.374093264, 0.942251031],
    [0.44524795, 0.93812025],
    [0.495876289, 0.884862653],
    [0.498504487, 0.467105897],
    [0.613729508, 0.839308599],
    [0.726347915, 0.74229203],
    [0.751780264, 0.741710297],
    [0.852442672, 0.267226891],
    [0.893037336, 0.252]
];

export default {
  name: 'App',
  data() {
    return {
      eventRate: 0.02,
      sensitivity: null,
      specificity: null,
      selectedPreset: 5
    }
  },
  methods: {
    getPercentageDisplay: val => (val * 100.0).toFixed(1) + "%",
    setPreset(sens, spec) {
      this.sensitivity = sens;
      this.specificity = spec;
    },
    updatePreset() {
      const selected = this.rocFrontier[this.selectedPreset];
      this.sensitivity = selected[0];
      this.specificity = selected[1];
    }
  },
  computed: {
    populationN: () => populationN,
    rocFrontier: () => rocFrontier
  },
  components: {
    ResultsTable
  },
  mounted() {
    this.updatePreset();
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
