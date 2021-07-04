<template xmlns:slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fluid>
    <v-row
      align="center"
      justify="center"
      class="my-5"
    >
      <v-col
        cols="3"
        sm="6"
        md="3"
      >
        <v-card color="accent" style="border-radius: 8px" elevation="2" nuxt :to="`/events`">
          <v-card-text>
            <v-row justify="space-between" class="pa-2">
              <span class="title white--text mt-2">{{$t('navigation.events').toUpperCase()}}</span>
              <v-avatar color="white" size="48">
                <span class="black--text headline">{{eventsCount}}</span>
              </v-avatar>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="3"
        sm="6"
        md="3"
      >
        <v-card color="accent" style="border-radius: 8px" elevation="2" nuxt :to="`/locations`">
          <v-card-text>
            <v-row justify="space-between" class="pa-2">
              <span class="title white--text mt-2">{{$t('navigation.locations').toUpperCase()}}</span>
              <v-avatar color="white" size="48">
                <span class="black--text headline">{{locationsCount}}</span>
              </v-avatar>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="3"
        sm="6"
        md="3"
      >
        <v-card color="accent" style="border-radius: 8px" elevation="2" nuxt :to="`/offers`">
          <v-card-text>
            <v-row justify="space-between" class="pa-2">
              <span class="title white--text mt-2">{{$t('navigation.offers').toUpperCase()}}</span>
              <v-avatar color="white" size="48">
                <span class="black--text headline">{{offersCount}}</span>
              </v-avatar>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="3"
        sm="6"
        md="3"
      >
        <v-card color="accent" style="border-radius: 8px" elevation="2" nuxt :to="`/moderators`">
          <v-card-text>
            <v-row justify="space-between" class="pa-2">
              <span class="title white--text mt-2">{{$t('navigation.moderators').toUpperCase()}}</span>
              <v-avatar color="white" size="48">
                <span class="black--text headline">{{moderatorsCount}}</span>
              </v-avatar>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="center"
           justify="center" class="mt-5">
      <v-col cols="6"
             sm="6"
             md="6">
        <doughnut-chart :data="data" :labels="labels" class="ma-5"/>
      </v-col>
      <v-col cols="6"
             sm="6"
             md="6">
        <bar-chart :data="data" :labels="labels" class="ma-5"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import DoughnutChart from "../../components/charts/DoughnutChart";
    import BarChart from "../../components/charts/BarChart";

    export default {
        components: {DoughnutChart, BarChart},
        data() {
            return {
                eventsCount: 0,
                locationsCount: 0,
                offersCount: 0,
                moderatorsCount: 0,
                labels: [],
                data: []
            }
        },

        mounted() {
            this.getEvents()
        },

        methods: {
            async getEvents() {
                try {
                    let res = await this.$axios.get('/dashboard')
                    this.eventsCount=res.data.counts[0]
                    this.locationsCount=res.data.counts[1]
                    this.offersCount=res.data.counts[3]
                    this.moderatorsCount=res.data.counts[2]
                    this.labels=res.data.labels
                    this.data=res.data.counts
                } catch (err) {
                    console.log(err)
                }
            },
        }
    }
</script>


<style>
  .myTable {
    border: 1px solid #a0a0a0
  }
</style>
