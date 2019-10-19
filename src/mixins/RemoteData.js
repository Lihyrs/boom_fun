/* eslint-disable guard-for-in */
/**
 *
 * @param {Object} args
 */
export default function (args) {
  return {
    data() {
      let initData = {
        remoteDataLoading: 0,
        remoteErrors: {},
      };

      const { data, url, name } = args;
      if (data) {
        for (const key in data) {
          initData[key] = null;
        }
      }
      initData.remoteErrors[name || url] = null;

      return initData;
    },
    // created() {
    //   const { url, onSucess, onError } = args;
    //   this.fetchResource(url, onSucess, onError);
    // },
    methods: {
      async fetchResource(url, finalOptions = {}) {
        const { name } = args;
        const {
          onSucess, onError, options, context,
        } = finalOptions;

        this.$data.remoteDataLoading++;
        this.$data.remoteErrors[name || url] = null;
        try {
          const result = await this.$fetch(url, options);
          if (typeof onSucess === 'function') {
            onSucess.apply(context || this, [result]);
          }
        } catch (e) {
          if (typeof onError === 'function') {
            onError.apply(context || this, [e]);
          }
          this.$data.remoteErrors[name || url] = e;
        }
        this.$data.remoteDataLoading--;
      },
    },
    computed: {
      remoteDataBusy() {
        return this.$data.remoteDataLoading !== 0;
      },
      hasRemoteErrors() {
        return Object.keys(this.$data.remoteErrors).some(key => this.$data.remoteErrors[key]);
      },
    },
  };
}
