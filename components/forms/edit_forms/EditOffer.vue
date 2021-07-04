<template>
  <v-form v-model="valid">
    <v-card>
      <v-card-title class="accent font-weight-bold white--text">{{$t('offers.edit')}}</v-card-title>
      <v-card-text class="pt-5">
        <v-text-field v-model="localOffer.title" :rules="req" :label="$t('offers.title')" filled rounded
                      dense></v-text-field>
        <v-textarea v-model="localOffer.text" :rules="req" :label="$t('offers.text')" filled rounded dense></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn text @click="performClose">{{$t('dialogs.close')}}</v-btn>
        <v-btn @click="performEdit" class="secondary" depressed :disabled="!valid">{{$t('dialogs.save')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>


<script>
    export default {
        props: {
            offer: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                localOffer: this.offer,
                valid: false,
                req: [
                    v => !!v || this.$t('rules.req'),
                ],
            }
        },

        methods: {
            performEdit() {
                this.$emit('edit', this.localOffer)
                this.performClose()
            },

            performClose() {
                this.$emit('close')
            }
        },

        watch: {
            offer(v) {
                this.localOffer = v
            }
        }
    }
</script>
