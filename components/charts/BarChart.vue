<template>
  <v-card style="border-radius: 16px; background-color: #F5F5F5; border: 1px solid #F0F0F0" elevation="0">
    <div class="card">
      <chartjs-bar
        class="pa-7"
        v-for="(item, index) in types"
        :key="index"
        :beginzero="beginZero"
        :bind="true"
        :bordercolor="item.borderColor"
        :data="data"
        :datalabel="item.dataLabel"
        :labels="labels"
      />
    </div>
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
                beginZero: true,
                types: [
                    {

                        borderColor: "#a0a0a0",
                        data: [1, 3, 5, 7, 2, 4, 6],
                        dataLabel: 'Label'
                    },
                ],
            };
        }
    };
</script>
