<template>
  <div class="container">
    <img v-if="pageInfo.image"
         :src="require(`../static${pageInfo.image}`)"
         alt="Logo"
         width="60%"
         class="mt-20">
    <h1>{{pageInfo.title}}</h1>
    <div class="text-center" v-html="$md.render(pageInfo.body)"/>
    <button class="button login-button" @click="fetchM3connect">{{pageInfo.buttonTitle}}</button>
  </div>
</template>

<script>

  export default {
    head() {
      return {
        script: [{src: 'https://identity.netlify.com/v1/netlify-identity-widget.js'}],
      };
    },
    async asyncData({params, payload}) {
      if (payload) return {pageInfo: payload};
      else
        return {
          pageInfo: await require(`~/assets/content/blog/wi-fi-access.json`),
        };
    },
    methods: {
      async fetchM3connect() {
        this.$axios.setHeader('Authorization', '9ffab846-f931-471b-b43c-e0e03459f0b1');
        await this.$axios.$post('https://portal.m3connect.de/api/v1/create-session')
          .then((response) => {
            alert('Call to WBS API is successful');
            console.log('response', response);
          })
          .catch((error) => {
            alert('Call to WBS API failed because Wi-Fi hotspot is being operated by Sombra and not M3Connect');
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



