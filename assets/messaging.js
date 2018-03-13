  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAUT3mY8ly8eMeZ6ZJAbHlj3b_UK1KTJwo",
    authDomain: "cocode-5453e.firebaseapp.com",
    databaseURL: "https://cocode-5453e.firebaseio.com",
    projectId: "cocode-5453e",
    storageBucket: "cocode-5453e.appspot.com",
    messagingSenderId: "279389961862"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var chatData = database.ref("/chat");
 // CHAT LISTENERS
  // Chat send button listener, grabs input and pushes to firebase. (Firebase's push automatically creates a unique key)
  $("#chat-send").click(function(event) {
    event.preventDefault()
  
    if ($("#chat-input").val() !== "") {
  
      var message = $("#chat-input").val();

      chatData.push({
        displayName: displayName,
        userID : uid,
        message: message,
        time: firebase.database.ServerValue.TIMESTAMP,
      });
  
      $("#chat-input").val("");
    }
  });

  chatData.on("child_added", function(snapshot) {
      var msg = snapshot.val();
      $("#chat-messages").append(msg.displayName + " :  " + msg.message + "  | " + moment(msg.time).format("hh:mm") + "<br>");
  });