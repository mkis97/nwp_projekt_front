<template>
  <v-card style="border-radius: 16px; background-color: #F5F5F5; border: 1px solid #F0F0F0" elevation="0">
    <chartjs-doughnut
      class="pa-7"
      :bind="true"
      :labels="labels"
      :option="option"
      :data="data"
    />
  </v-card>
</template>

<script>
    export default {
        props:{
            labels:{
                type: Array,
                required: true
            },
            data:{
                type: Array,
                required: true
            }
        },

        data() {
            return {
                option: {
                    legend: {
                        position: "right",
                        align: "middle"
                    },
                },
            };
        },
    };
</script>
