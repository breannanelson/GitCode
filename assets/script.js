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
var userData = database.ref("/users");

var userArr = [];
var displayName = "";
var uid = "";

function ifExistUser(name){
for(var i = 0; i < userArr.length; i++){
    if(userArr[i].displayName === name){
        return true;
    }
}
return false;
}

// Creates an instance of the GitHub provider object
var provider = new firebase.auth.GithubAuthProvider();

// onclick event for Sign In button
$("#login").on("click", function () {

    // Allows user to create an account with GitHub
    provider.setCustomParameters({
        'allow_signup': 'true'
    });

    // Sign in popup window
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        
    });
})

//  Track the Auth state across all your pages
var initApp = function () {
    // on click event for sign out button
    document.getElementById('signOutBTN').addEventListener('click', function () {
        firebase.auth().signOut();
    });

    // Track the Auth state across all your pages:
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            // Removes Sign In button and replaces it with Sign Out button
            $("#login").empty();
            // document.getElementById('messagingBTN').style.display = 'block';
            document.getElementById('signOutBTN').style.display = 'block';
            user.getIdToken().then(function (accessToken) {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                // document.getElementById('account-details').textContent = JSON.stringify({
                //     displayName: displayName,
                //     email: email,
                //     emailVerified: emailVerified,
                //     phoneNumber: phoneNumber,
                //     photoURL: photoURL,
                //     uid: uid,
                //     accessToken: accessToken,
                //     providerData: providerData
                // }, null, '  ');

          

                userData.on("value", function(snapshot) {
                    var checker = false; 
                    if(!snapshot.val()){ 
                        userData.push({
                            displayName: displayName,
                            userID : uid
                          });
                        return;
                    }
                
                    Object.keys(snapshot.val()).forEach(function(keys){
                        console.log("display  name ==> " +   snapshot.val()[keys].displayName);
                        if(snapshot.val()[keys].displayName === displayName){
                          checker = true;
                        }
                    });
            
                    if (!checker) { 
                        userData.push({
                            displayName: displayName,
                            userID : uid
                          });
                    }  
                })

                $('#account-details').append("<div id='bio'><img src='" + photoURL + "' alt='Profile Photo'><br>" + displayName + "<br>" + email + "<br></div>");


                // document.getElementById('chat').style.display = 'block';
            
            });
        } else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
            document.getElementById('signOutBTN').style.display = 'none';
            // Adds login button again
            $("#login").html("<button id='signInBTN'>Sign In</button>");

        }
    }, function (error) {
        console.log(error);
    });
};

// Event listener for when the page is loaded.
// Runs the initApp to determine if the user is logged in or not
window.addEventListener('load', initApp);




$("#messagingBTN").on("click", function () {
    console.log("Hello Messaging")
    $("#bio").empty();
    $("#messagingBTN").load("message.html");
});



// var searchTerm = $(this).attr("data-name");

// var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mejJaFWSR2V2aY31O2HJaYqpl1cqLjBn&q=" + searchTerm + "&limit=15&offset=0&rating=G&lang=en";

// $.ajax({
//     url: queryURL,
//     method: "GET",
// }).then(function (obj) {
//     console.log(obj)
//     console.log(obj.data)
//     if (obj.data.length === 0) {
//         swal("Im sorry, Giphy Gen couldn't find any results for " + searchTerm + ". Try a different emotion!");
//         $("button[data-name='"+searchTerm+"']").remove();
//     }
//     else {
//         //image
//         for (var i = 0; i <= 10; i = i + 2) {
//             $("#gif").append("<div class='row rounded gifRow'><div class='col-md-6'><img class='img-fluid pic' " +
//                 "src='" + obj.data[i].images["480w_still"].url + "'" +
//                 "data-still='" + obj.data[i].images["480w_still"].url + "'" +
//                 "data-animate='" + obj.data[i].images.fixed_height.url + "'" +
//                 "alt='Gif of " + searchTerm + "' data-state='still' style='width:300px;'><p style='padding-left:30px;'>Rated: " + obj.data[i].rating + "</p></div>" +
//                 "<div class='col-md-6'><img class='img-fluid pic' " +
//                 "src='" + obj.data[i + 1].images["480w_still"].url + "'" +
//                 "data-still='" + obj.data[i + 1].images["480w_still"].url + "'" +
//                 "data-animate='" + obj.data[i + 1].images.fixed_height.url + "'" +
//                 "alt='Gif of " + searchTerm + "' data-state='still' style='width:300px;'><p style='padding-left:30px;'>Rated: " + obj.data[i + 1].rating + "</p></div></div>");
//         }
//     }

// })

// });