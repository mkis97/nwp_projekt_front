<template>
  <v-form v-model="valid">
    <v-card>
      <v-card-title class="accent font-weight-bold white--text">{{$t('locations.edit')}}</v-card-title>
      <v-card-text class="pt-5">
        <v-text-field v-model="localLocation.name" :label="$t('locations.name')" :rules="req" filled rounded
                      dense></v-text-field>
        <v-text-field v-model="localLocation.lat" label="Lat" :rules="[decimal]" filled rounded dense></v-text-field>
        <v-text-field v-model="localLocation.lng" label="Lng" :rules="[decimal]" filled rounded dense></v-text-field>
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
            location: {
                type: Object,
                required: true,
            }
        },

        data() {
            return {
                localLocation: this.location,
                valid: false,
                req: [
                    v => !!v || this.$t('rules.req'),
                ],
                decimal: value => {
                    if (!value) return this.$t('rules.req')
                    const pattern = /^(?:\d{1,2}\.\d{1,2})$|^\d{1,2}$/
                    return pattern.test(value) || this.$t('rules.num')
                }
            }
        },

        methods: {
            performEdit() {
                this.$emit('edit', this.localLocation)
                this.performClose()
            },

            performClose() {
                this.$emit('close')
            }
        },

        watch: {
            location(v) {
                this.localLocation = v
            }
        }
    }
</script>
