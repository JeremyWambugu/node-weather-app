// fetch("http://puzzle.mead.io/puzzle").then(response => {
//   response.json().then(data => {
//     console.log(data);
//   });
// });

const button = document.querySelector("button");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".message-1");
const messageTwo = document.querySelector(".message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${location}`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res);

      if (res.error) {
        messageOne.textContent = res.error;
      } else {
        messageOne.textContent = res.location;
        messageTwo.textContent = res.forecast;
      }
    });
});
