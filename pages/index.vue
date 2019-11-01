<template>
  <div class="container">
    <img v-if="pageInfo.image" :src="require(`../static${pageInfo.image}`)" alt="Logo" width="60%" class="mt-20">
    <h1>{{pageInfo.title}}</h1>
    <div class="text-center" v-html="$md.render(pageInfo.body)"/>
    <button class="button login-button" @click="fetchLogin">{{pageInfo.buttonTitle}}</button>
    <button class="m3connect-button button" @click="fetchM3connect">Connect to m3portal</button>
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
          pageInfo: await require(`~/assets/content/blog/wi-fi-access.json`),
        };
    },
    methods: {
      async fetchLogin() {
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
  body {
    background-color: rgba(253, 187, 8, .1);
    font-family: Arial;
  }

  .mt-20 {
    margin-top: 20px;
  }

  .text-center {
    text-align: center;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .button {
    width: 200px;
    height: 50px;
    background: rgba(0, 0, 0, .2);
    font-size: 16px;
    margin-top: 37px;
  }


  .login-button {
    background: #ef7c08;
  }

  .m3connect-button {
    background: #fcbb08;
  }

</style>



