<template>
  <v-app dark style="font-family: 'K2D', sans-serif">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      dark
    >
      <v-btn
        class="ml-3"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-list flat>
        <v-list-item
          :to="localePath('dashboard')"
          flat
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ 'mdi-view-dashboard' }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t('navigation.dashboard')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="localePath('events')"
          flat
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ 'mdi-calendar-text' }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t('navigation.events')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="localePath('locations')"
          flat
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ 'mdi-map-marker-multiple' }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t('navigation.locations')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="localePath('offers')"
          flat
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ 'mdi-offer' }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t('navigation.offers')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="localePath('moderators')"
          flat
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ 'mdi-account-group' }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t('navigation.moderators')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn icon>
            <v-icon style="transform: rotate(0.5turn);" @click="logout">{{'mdi-logout-variant'}}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      elevation="3"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-show="$vuetify.breakpoint.mdAndDown"/>
      <img src="@/static/icon_svg.svg" alt="Kiwi standing on oval" height="50px" width="auto">
      <div class="pl-1">
        <p style="margin-bottom: 0px !important;" class="overline font-weight-bold primary--text">virtual</p>
        <p style="margin-bottom: 0px !important;" class="overline font-weight-bold primary--text">tourist</p>
        <p style="margin-bottom: 0px !important;" class="overline font-weight-bold primary--text">guide</p>
      </div>
      <v-spacer/>
      <span class="pr-2" @click="changeLocale('eng')"
            :class="$i18n.locale==='eng' ? 'primary--text' : ''" style="cursor: pointer">ENG</span>
      <v-divider vertical inset></v-divider>
      <span class="pl-2" @click="changeLocale('hrv')" :class="$i18n.locale==='hrv' ? 'primary--text' : ''"
            style="cursor: pointer">HRV</span>
    </v-app-bar>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
    export default {
        data() {
            return {
                clipped: false,
                drawer: true,
                miniVariant: true,
                title: 'VTG'
            }
        },

        methods: {
            changeLocale(locale) {
                this.$i18n.setLocaleCookie(locale)
                this.$router.push(this.switchLocalePath(locale))
            },

            logout() {
                if (this.localePath('hrv')) {
                    this.$router.push('/');
                } else {
                    this.$router.push("/" + this.$i18n.locale);
                }
            }
        }
    }
</script>
