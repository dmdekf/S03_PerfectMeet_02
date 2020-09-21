<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="deep-orange accent-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>완벽한 맛남</v-toolbar-title>
    </v-app-bar>
    <v-main class="pa-0">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <v-tooltip left>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <router-view class="container mx-10px"/>
    
    <v-footer
      id="footer"
      class="pa-0"
      color="deep-orange accent-3"
      app
    >
      <v-col
        class="text-center"
        cols="12"
      >
      
      <div class="white--text text-center">
        &copy; {{ new Date().getFullYear() }} made by<a href="https://github.com/gyw8526"> @gyw8526 </a> <a href="https://github.com/dmdekf"> @dmdekf </a> <a href="https://lab.ssafy.com/lshmn951"> @lshmn951 </a> <a href="https://lab.ssafy.com/twoposition"> @wjsgudwls89 </a>
      </div>
      </v-col>
    </v-footer>
    
    <div class = "blank">
    </div>

  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: false,
    }),
  }
</script>

<style>
.blank{
  height: 50px;
}
#footer {
  opacity: 80%;
}

#footer a {
  color:white; 
}

</style>