<template>
  <v-app dark>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-0 pa-5" style="border-radius: 16px">
            <v-card-text>
              <v-row align="center" justify="center" class="pb-5">
                <v-icon class="pr-5" x-large>build</v-icon>
                <h1 v-if="error.statusCode === 404">
                  <span class="display-1">{{ pageNotFound }}</span>
                </h1>
                <h1 v-else>
                  <span class="display-1">{{ otherError }}</span>
                </h1>
              </v-row>
              <v-row align="center" justify="center" class="pt-5">
                <v-btn @click="back" class="mt-5" rounded color="error" depressed large>
                  Back
                </v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
    export default {
        layout: 'empty',
        props: {
            error: {
                type: Object,
                default: null
            }
        },
        head() {
            const title =
                this.error.statusCode === 404 ? this.pageNotFound : this.otherError
            return {
                title
            }
        },
        data() {
            return {
                pageNotFound: '404 Not Found',
                otherError: 'An error occurred'
            }
        },
        methods: {
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
</style>
