var chatData = database.ref("/chat");

function ChatUserInput(event) {
    event.preventDefault();
  
    if ($("#chat-input").val() !== "") {
  
      var message = $("#chat-input").val();

      chatData.push({
        displayName: displayName,
        photo: photoURL,
        userID : uid,
        message: message,
        time: firebase.database.ServerValue.TIMESTAMP,
      });
  
      $("#chat-input").val("");
    }
  }

 // CHAT LISTENERS
  // Chat send button listener, grabs input and pushes to firebase. (Firebase's push automatically creates a unique key)
  $("#chat-send").on("click", function(event) {
    ChatUserInput(event);
  });

  chatData.on("child_added", function(snapshot) {
      var msg = snapshot.val();
      console.log(msg)
      $("#chat-messages").append("<img src='" + msg.photo + "' alt='Profile Photo' style='width: 30px; height: 30px;'>" + msg.displayName + " :  " + msg.message + "  | " + moment(msg.time).format("hh:mm") + "<br>")
  });