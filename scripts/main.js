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
var companions;
companionRef.once('value', function(snapshot) {
  companions = snapshot.val();
  Object.keys(companions).forEach(function (item) {
    var option = document.createElement('option');
    option.value = item;
    datalist.appendChild(option);
  });

  input.oninput = function() {
    var val = "";
    var crops = companions[input.value.toLowerCase()];
    if (crops != null) {
      var goodList = crops["good"];
      if (goodList != null) {
        val = Object.keys(goodList).join('</br>');
      }
      else {
        val = "No companion crops found"
      }
    }
    else {
      val = "Crop not found";
    }
    output.innerHTML = val;
    console.log(val);
  };

  input.oninput();
});

}
