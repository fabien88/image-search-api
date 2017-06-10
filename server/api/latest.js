const { send } = require('micro');
const { getLatest } = require('../model/imagedb');

const formatResponse = (json) => {
  return json.items.map(({link, image, snippet}) => ({
    url: link,
    snippet,
    thumbnail: image.thumbnailLink,
    context: image.contextLink
  }));
}

// respond to specific methods by exposing their verbs
module.exports.GET = async function(req, res) {
  const term = req.query.term || 'lolcats funny';
  const offset = +req.query.offset || 0;
  getLatest()
    .then(result => {
        send(res, 200, result.map(({term, createdAt})=> ({term, createdAt})));
    });
};
