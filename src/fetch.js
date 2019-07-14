const axios = require('axios');

const getData = (url) => {
  return axios.get(url)
    .then(result => {
      return result.data;
    })
    .catch((e) => {
      console.log(e)
      return {}
    })
}

export default getData;