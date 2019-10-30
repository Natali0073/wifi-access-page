export const state = () => ({
  blogPosts: [],
});

export const mutations = {
  setBlogPosts(state, list) {
    state.blogPosts = list;
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    let files = await require.context('~/assets/content/blog/', false, /\.json$/);
    let blogPosts = files.keys().map(key => {
      let res = files(key);
      res.slug = key.slice(2, -5);
      return res;
    });
    await commit('setBlogPosts', blogPosts);
  },

  async fetch() {
    this.$axios.setHeader('Authorization', '9ffab846-f931-471b-b43c-e0e03459f0b1');
    await this.$axios.$post('https://portal.m3connect.de/api/v1/create-session')
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      })
  }
};
