<template>
    <div class="card">
        <div class="card-body">
            <h3 v-if="n !== undefined">
                {{ Math.round(n) }}
            </h3>
            <h3 v-if="prop && n == undefined">
                {{ (prop*100).toFixed(1) }}%
            </h3>
            <div v-if="prop && showBar">
                <div class="progress">
                    <div class="bg-primary text-light text-center" v-bind:style="style">
                        
                    </div>
                </div>
            </div>
            <div>
                {{ label }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResultCard',
    props: {
        n: Number,
        label: String,
        prop: Number,
        showBar: Boolean
    },
    computed: {
        style() {
            return {
                width: (this.prop*100) + "%"
            }
        }
    }
}
</script>