import "../scss/main.scss";

const app = window.app = {
  foo: 1
};

app.start = function() {
  console.log('App started!');
};

window.onload = (ev) => {
  console.log('Document loaded!');
  app.start();
};
