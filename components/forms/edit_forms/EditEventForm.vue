<template>
  <v-form v-model="valid">
    <v-card>
      <v-card-title class="accent font-weight-bold white--text">{{$t('events.edit')}}</v-card-title>
      <v-card-text class="pt-5">
        <v-text-field v-model="localEvent.title" :label="$t('events.title')" :rules="req" filled rounded dense></v-text-field>
        <v-textarea v-model="localEvent.text" :label="$t('events.text')" :rules="req" filled rounded dense></v-textarea>
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
            event: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                localEvent: this.event,
                valid: false,
                req: [
                    v => !!v || this.$t('rules.req'),
                ],
            }
        },

        methods: {
            performEdit() {
                this.$emit('edit', this.localEvent)
                this.performClose()
            },

            performClose() {
                this.$emit('close')
            }
        },

        watch: {
            event(v) {
                this.localEvent = v
            }
        }
    }
</script>
