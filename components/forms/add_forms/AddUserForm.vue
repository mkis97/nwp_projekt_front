<template>
  <v-form v-model="valid" ref="form">
    <v-card>
      <v-card-title class="accent font-weight-bold white--text">{{$t('moderators.add')}}</v-card-title>
      <v-card-text class="pt-5">
        <v-text-field v-model="user.firstname" :label="$t('moderators.firstname')" :rules="req" filled rounded
                      dense></v-text-field>
        <v-text-field v-model="user.lastname" :label="$t('moderators.lastname')" :rules="req" filled rounded
                      dense></v-text-field>
        <v-text-field v-model="user.email" :label="$t('moderators.email')" :rules="emailRules" filled rounded
                      dense></v-text-field>
        <v-text-field v-model="user.password" :label="$t('moderators.password')" :rules="req" filled rounded
                      dense></v-text-field>
        <v-text-field v-model="user.passwordConfirmation" :label="$t('moderators.password_confirmation')"
                      :rules="passwordConfirmationRule" filled rounded
                      dense></v-text-field>
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
                user: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    passwordConfirmation: ''
                },
                valid: false,
                req: [
                    v => !!v || this.$t('rules.req'),
                ],
                emailRules: [
                    v => !!v || this.$t('rules.req'),
                    v => /.+@.+\..+/.test(v) || this.$t('rules.mail'),
                ],
            }
        },

        computed: {
            passwordConfirmationRule() {
                return (this.user.password === this.user.passwordConfirmation) || 'Password must match'
            },
        },

        methods: {
            async performCreate() {
                this.$emit('create', this.user)
                this.performClose()
            },

            performClose() {
                this.$emit('close')
                this.user = {
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    passwordConfirmation: ''
                }
                this.$refs.form.resetValidation()
            }
        },
    }
</script>
