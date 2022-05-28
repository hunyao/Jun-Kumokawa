var express = require('express');
var router = express.Router();
var fetch = require("node-fetch")

const escapeParams = (params = {}) => {
  const searchParams = new URLSearchParams();
  Object
  .entries(params)
  .forEach(([ key, value ]) => {
    // return key + '=' + encodeURIComponent(value);
    searchParams.append(key, value);
  })
  // .join('&')
  //
  return searchParams;
}
const clientId = 'c8197b9538a81b217aa1';
const clientSecret = 'bf42e26a95e0b561d94e0f4c0d26415168b5aa34';
router.get('/response', function(req, res, next) {
  const {
    code
  } = req.query;

  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: escapeParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: 'http://localhost:3001/oauth2/github/response/token'
    })
  }).then(response => {
    return response.text()
  }).then(response => {
    console.log('request', response)
    res.redirect('http://localhost:3000/?' + response);
  })

})
router.get('/response/token', function(req, res, next) {
  console.log('token', req)

  res.send();
})

module.exports = router;
