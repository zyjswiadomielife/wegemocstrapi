const { connect } = require('getstream');

const client = connect(process.env.API_KEY, process.env.API_KEY_SECRET, process.env.APP_ID);

module.exports = {

    async afterCreate(event) {
        const { result, params } = event;
        for (let category in event.result.categories) {
            const categoryFeed = client.feed('categories', category.id);
            const activity = {
                actor: `category:${category.id}`,
                verb: 'dodano przepis do kategorii',
                object: event.result.id,
                foreign_id: event.result.id,
                created_at: event.result.createdAt,
              };
            await categoryFeed.addActivity(activity);
        }
        const userFeed = client.feed('user', event.result.author.id);
        const activity = {
            actor: event.result.author.id,
            verb: 'dodano przepis',
            object: `recipe:${event.result.id}`,
            foreign_id: event.result.id,
            created_at: event.result.createdAt,
        };
        userFeed.addActivity(activity);
    },
  };

   
