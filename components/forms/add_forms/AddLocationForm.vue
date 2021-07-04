<template>
  <v-form v-model="valid" ref="form">
    <v-card>
      <v-card-title class="accent font-weight-bold white--text">{{$t('locations.add')}}</v-card-title>
      <v-card-text class="pt-5">
        <v-text-field v-model="location.name" :label="$t('locations.name')" :rules="req" filled rounded
                      dense></v-text-field>
        <v-text-field v-model="location.lat" label="Lat" :rules="[decimal]" filled rounded dense></v-text-field>
        <v-text-field v-model="location.lng" label="Lng" :rules="[decimal]" filled rounded dense></v-text-field>
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
                location: {
                    name: '',
                    lat: '',
                    lng: ''
                },
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
            async performCreate() {
                this.$emit('create', this.location)
                this.performClose()
            },

            performClose() {
                this.$emit('close')
                this.location = {
                    name: '',
                    lat: '',
                    lng: ''
                }
                this.$refs.form.resetValidation()
            }
        }
    }
</script>
