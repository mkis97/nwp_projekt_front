<template>
  <v-form v-model="valid" ref="form">
    <v-card>
      <v-card-title class="accent font-weight-bold white--text">{{$t('events.add')}}</v-card-title>
      <v-card-text class="pt-5">
        <v-text-field v-model="event.title" :label="$t('events.title')" :rules="req" filled rounded
                      dense></v-text-field>
        <v-textarea v-model="event.text" :label="$t('events.text')" :rules="req" filled rounded dense></v-textarea>
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
                event: {
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
                this.$emit('create', this.event)
                this.performClose()
            },

            performClose() {
                this.$emit('close')
                this.event = {
                    title: '',
                    text: ''
                }
                this.$refs.form.resetValidation()
            }
        }
    }
</script>
