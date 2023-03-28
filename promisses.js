const axios = require("axios");

const ApiTest = new Promise((resolve, reject) => {
  axios
    .get("https://jsonplaceholder.typicode.com/posts/1/comments")
    .then((response) => resolve(response.data))
    .catch((error) => reject(error.message));
});

ApiTest.then(handleFulfilledA, handleRejectedA).then((processedData) =>
  console.log(processedData)
);

function handleFulfilledA(data) {
  return new Promise((resolve, reject) => {
    const processedData = data.map((post) => ({
      name: post.name,
      email: post.email,
    }));
    resolve(processedData);
  });
}

function handleRejectedA(error) {
  if (error === "Request failed with status code 404") {
    return axios
      .get("https://jsonplaceholder.typicode.com/posts/1/comment")
      .then((response) => response.data)
      .catch((retryError) => {
        console.error("Error retrying request:", retryError.message);
      });
  } else {
    return Promise.reject(error);
  }
}
