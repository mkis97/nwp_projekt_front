<template>
  <v-form v-model="valid">
    <v-card>
      <v-card-title class="accent font-weight-bold white--text">{{$t('moderators.edit')}}</v-card-title>
      <v-card-text class="pt-5">
        <v-text-field v-model="localUser.firstname" :label="$t('moderators.firstname')" :rules="req" filled rounded
                      dense></v-text-field>
        <v-text-field v-model="localUser.lastname" :label="$t('moderators.lastname')" :rules="req" filled rounded
                      dense></v-text-field>
        <v-text-field v-model="localUser.email" :label="$t('moderators.email')" :rules="emailRules" filled rounded
                      dense></v-text-field>
        <v-text-field v-model="localUser.password" :label="$t('moderators.password')" :rules="req" filled rounded
                      dense></v-text-field>
        <v-text-field v-model="localUser.passwordConfirmation" :label="$t('moderators.password_confirmation')"
                      :rules="passwordConfirmationRule" filled
                      rounded dense></v-text-field>
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
            user: {
                type: Object,
                required: true
            },
        },

        data() {
            return {
                localUser: this.user,
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
            async performEdit() {
                this.$emit('edit', this.localUser)
                this.performClose()
            },

            performClose() {
                this.$emit('close')
            }
        },

        watch: {
            user(v) {
                this.localUser = v
            }
        }
    }
</script>
