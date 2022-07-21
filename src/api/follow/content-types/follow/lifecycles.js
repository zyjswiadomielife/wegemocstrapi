const { connect } = require('getstream');

const client = connect(process.env.API_KEY, process.env.API_KEY_SECRET, process.env.APP_ID);

module.exports = {

    async afterCreate(event) {
        const { result, params } = event;
        const timelineFeed = client.feed('timeline', event.result.user.id);
        timelineFeed.follow('user', event.result.target.id);
    },
    
    async afterDelete(event) {
        const { result, params } = event;
        const timelineFeed = client.feed('timeline', event.result.user.id);
        timelineFeed.unfollow('user', event.result.target.id);
    },
  };

   
