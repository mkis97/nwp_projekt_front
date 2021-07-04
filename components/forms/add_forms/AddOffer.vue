<template>
  <v-form v-model="valid" ref="form">
    <v-card>
      <v-card-title class="accent font-weight-bold white--text">{{$t('offers.add')}}</v-card-title>
      <v-card-text class="pt-5">
        <v-text-field v-model="offer.title" :label="$t('offers.title')" :rules="req" filled rounded
                      dense></v-text-field>
        <v-textarea v-model="offer.text" :label="$t('offers.text')" :rules="req" filled rounded dense></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn text @click="performClose">{{$t('dialogs.close')}}</v-btn>
        <v-btn @click="performCreate" class="secondary" depressed :disabled="!valid">{{$t('dialogs.add')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>


<script>
    export default {
        data() {
            return {
                offer: {
                    title: '',
                    text: ''
                },
                valid: false,
                req: [
                    v => !!v || this.$t('rules.req'),
                ],
            }
        },

        methods: {
            async performCreate() {
                this.$emit('create', this.offer)
                this.performClose()
            },

            performClose() {
                this.$emit('close')
                this.offer = {
                    title: '',
                    text: ''
                }
                this.$refs.form.resetValidation()
            }
        }
    }
</script>
