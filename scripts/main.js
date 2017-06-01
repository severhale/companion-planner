// Initialize Firebase
var config = {
  apiKey: "AIzaSyCKLggXck_1fxtoSn0uvjQ00gEapjLJDbM",
  authDomain: "companion-planting-b56b5.firebaseapp.com",
  databaseURL: "https://companion-planting-b56b5.firebaseio.com",
  projectId: "companion-planting-b56b5",
  storageBucket: "companion-planting-b56b5.appspot.com",
  messagingSenderId: "158677284326"
};

window.onload = function() {
firebase.initializeApp(config);

var database = firebase.database();

var input = document.getElementById("input-crop");
var output = document.getElementById("output-crop");
var datalist = document.getElementById("crops");

var companionRef = database.ref("/");
var companions; // this will hold all info about companion crops
companionRef.once('value', function(snapshot) { // runs once with value of data at companionRef held in snapshot
  companions = snapshot.val();
  Object.keys(companions).forEach(function (item) { // for each crop
    var option = document.createElement('option'); // add to datalist so that we can have autocomplete suggestions for user
    option.value = item;
    datalist.appendChild(option);
  });

  input.oninput = function() {
    var val = "";
    var crops = companions[input.value.toLowerCase()];
    if (crops != null) {
      var goodList = crops["good"]; // object containing all complementary crops as its keys
      if (goodList != null) {
        val = Object.keys(goodList).join('</br>'); // kind of a hack, maybe should use an unordered list instead
      }
      else {
        val = "No companion crops found"
      }
    }
    else {
      val = "Crop not found";
    }
    output.innerHTML = val;
  };

  input.oninput(); // we run once so it handles the input already in the box ("Apple")
});

}
