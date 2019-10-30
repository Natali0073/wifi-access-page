<template>
  <div class="container">
    <h1>{{pageInfo.title}}</h1>
    <div v-html="$md.render(pageInfo.body)" />
    <button class="login-button">{{pageInfo.buttonTitle}}</button>
  </div>
</template>

<script>

export default {
  head() {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    };
  },
  async asyncData({ params, payload }) {
    if (payload) return { blogPost: payload };
    else
      return {
        pageInfo: await require(`~/assets/content/blog/2019-10-30-wi-fi-accesses.json`),
      };
  },
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



