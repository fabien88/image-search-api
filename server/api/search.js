const { send } = require('micro');
const fetch = require('node-fetch');
const { insertNew, cacheResult, fetchFromCache } = require('../model/imagedb');

const resFetchSize = 10;
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
  fetchFromCache({term, offset})
    .then(result => {
      if (result.length === 1) {
        send(res, 200, formatResponse(result[0].json) );
      } else {
        fetch('https://www.googleapis.com/customsearch/v1?num='+resFetchSize+'&start='+(1+offset*resFetchSize)+'&key=AIzaSyD13KrpqJeuGPQkGWMbT2Jh660z-gdny9A&cx=010156962332903148230:oevsm_yefzu&searchType=image&q='+term)
          .then(res => res.json())
          .then(json => { cacheResult({json, term, offset}); return json })
          .then(json => send(res, 200, formatResponse(json) ));
          console.log("****Fetching with API :" + term);
      }
    });

  insertNew(term);
};
