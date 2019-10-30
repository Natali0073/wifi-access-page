<template>
  <div class="container">
    <h1>{{pageInfo.title}}</h1>
    <div v-html="$md.render(pageInfo.body)"/>
    <button class="login-button" @click="fetchLogin">{{pageInfo.buttonTitle}}</button>
    <button class="login-button" @click="fetchM3connect">Connect to m3portal</button>
    <div>{{m3connectRequest}}</div>
  </div>
</template>

<script>

  export default {
    head() {
      return {
        script: [{src: 'https://identity.netlify.com/v1/netlify-identity-widget.js'}],
      };
    },
    data() {
      return {
        m3connectRequest: null,
      }
    },
    async asyncData({params, payload}) {
      if (payload) return {pageInfo: payload};
      else
        return {
          pageInfo: await require(`~/assets/content/blog/2019-10-30-wi-fi-accesses.json`),
        };
    },
    methods: {
      async fetchLogin() {
        const data = {
          username: 'sombra',
          password: 'sombrainc',
        };
        await this.$axios.$post('https://192.168.252.61:8443/manage/site/default/settings/guestcontrol', data)
          .then((response) => {
            this.m3connectRequest = 'Login success: ' + response;
            console.log('response', response);
          })
          .catch((error) => {
            this.m3connectRequest = 'Login error: ' + error;
            console.log('error', error);
          })
      },
      async fetchM3connect() {
        this.$axios.setHeader('Authorization', '9ffab846-f931-471b-b43c-e0e03459f0b1');
        await this.$axios.$post('https://portal.m3connect.de/api/v1/create-session')
          .then((response) => {
            this.m3connectRequest = 'M3connect success: ' + response;
            console.log('response', response);
          })
          .catch((error) => {
            this.m3connectRequest = 'M3connect error: ' + error;
            console.log('error', error);
          })
      }
    }
  }
</script>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .login-button {
    width: 200px;
    height: 50px;
    background: rgba(0, 0, 0, .2);
    font-size: 16px;
    margin-top: 37px;
  }
</style>



