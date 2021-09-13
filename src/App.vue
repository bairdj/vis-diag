<template>
  <div class="container mt-2" id="toolContainer">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h4>Pre-Test Probability</h4>
              <div>
                The probability that a patient presenting with trauma actually has major trauma
              </div>
              <input v-model="eventRate" type="range" min="0" max="1" step="0.005">
              <h5 class="slide-display">{{ getPercentageDisplay(eventRate) }}</h5>
            </div>
          </div>
    </div>
    <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h4>Sensitivity</h4>
              <div>
                The proportion of patients with major trauma who trigger the major trauma tool
              </div>
              <input v-model="sensitivity" type="range" min="0" max="1" step="0.005">
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
              <input v-model="specificity" type="range" min="0" max="1" step="0.005">
              <h5 class="slide-display">{{ getPercentageDisplay(specificity) }}</h5>
            </div>
          </div>
    </div>
  </div>
  <div class="mt-1">
    <h4 class="d-inline-block me-2">Presets</h4>
    <button type="button" class="btn btn-light" v-on:click="setPreset(0.3, .95)">MATTS Specific</button>
    <button type="button" class="btn btn-light" v-on:click="setPreset(0.6, 0.8)">MATTS Balanced</button>
    <button type="button" class="btn btn-light" v-on:click="setPreset(0.8, 0.7)">MATTS Sensitive</button>
  </div>
  <h2 class="mt-3">Results</h2>
  <div id="results">
    <div class="row">
      <div class="col">
        <ResultCard v-bind:n="populationN" label="Patients presenting with trauma" class="h-100"/>
      </div>
      <div class="col">
        <ResultCard v-bind:n="positiveN" label="Patients with major trauma" class="h-100"/>
      </div>
      <div class="col">
        <ResultCard v-bind:n="negativeN" label="Patients without major trauma" class="h-100"/>
      </div>
      <div class="col"></div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <div class="card h-100">
          <div class="card-body">

          </div>
        </div>
      </div>
      <div class="col">
        <ResultCard v-bind:n="truePositives" label="Correctly triaged to MTC" class="h-100" v-bind:prop="truePositives / populationN" v-bind:showBar="true"/>
      </div>
      <div class="col">
        <ResultCard v-bind:n="falsePositives" label="Overtriaged to MTC" v-bind:prop="falsePositives / populationN" class="h-100" v-bind:showBar="true" />
      </div>
      <div class="col">
        <ResultCard v-bind:prop="ppv" class="h-100" label="Have major trauma when tool triggered" v-bind:showBar="false"/>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <div class="card h-100">
          
        </div>
      </div>
      <div class="col">
        <ResultCard v-bind:n="falseNegatives" label="Undertriaged to trauma unit" class="h-100" v-bind:prop="falseNegatives / populationN" v-bind:showBar="true"/>
      </div>
      <div class="col">
        <ResultCard v-bind:n="trueNegatives" label="Correctly triaged to trauma unit" class="h-100" v-bind:prop="trueNegatives / populationN" v-bind:showBar="true"/>
      </div>
      <div class="col">
        <ResultCard v-bind:prop="npv" class="h-100" label="Do not have major trauma when tool not triggered" v-bind:showBar="false"/>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
import ResultCard from './components/ResultCard';

const populationN = 1e5;

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
    getPercentageDisplay: val => (val*100.0).toFixed(1) + "%",
    setPreset(sens, spec) {
      this.sensitivity = sens;
      this.specificity = spec;
    }
  },
  computed: {
    populationN: () => populationN,
    positiveN() {
      return populationN * this.eventRate;
    },
    negativeN() {
      return populationN * (1 - this.eventRate);
    },
    truePositives() {
      return populationN * this.eventRate * this.sensitivity
    },
    falseNegatives() {
      return populationN * this.eventRate * (1 - this.sensitivity)
    },
    falsePositives() {
      return populationN * (1 - this.eventRate) * (1 - this.specificity)
    },
    trueNegatives() {
      return populationN * (1 - this.eventRate) * this.specificity;
    },
    ppv() {
      return this.truePositives / (this.truePositives + this.falsePositives);
    },
    npv() {
      return this.trueNegatives / (this.trueNegatives + this.falseNegatives);
    }
  },
  components: {
    ResultCard
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
