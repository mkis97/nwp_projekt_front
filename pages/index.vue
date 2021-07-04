<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-3">
          <v-card-title class="primary white--text">{{$t('login.title')}}</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="user.email"
                :label="$t('login.email')"
                prepend-icon="person"
                type="text"
              />

              <v-text-field
                v-model="user.password"
                :label="$t('login.password')"
                prepend-icon="lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" depressed @click="login">{{$t('login.action')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        layout: 'empty',

        data() {
            return {
                user: {
                    email: '',
                    password: ''
                }
            }
        },

        methods: {
            async login() {
                try {
                    let res = await this.$axios.post('/login', this.user)
                    console.log(res)
                    this.$store.commit('saveLoginData', {token: res.data.accessToken});
                    this.$router.push('dashboard')
                } catch (err) {
                    console.log(err)
                }
                //this.$router.push('dashboard')
            }
        }
    }
</script>
