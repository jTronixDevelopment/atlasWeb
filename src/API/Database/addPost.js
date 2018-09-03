import axios from 'axios';

export default async function ({
  data,
}) {
  axios.put('http://localhost:3000/api/database/addpost', {
      data,
  })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
