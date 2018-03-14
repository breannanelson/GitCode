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
var photoURL ="";


// Creates an instance of the GitHub provider object
var provider = new firebase.auth.GithubAuthProvider();

// onclick event for Sign In button
$("#signInBTN").on("click", function () {

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
    $('signOutBTN').on('click', function () {
        firebase.auth().signOut();
    });

    // Track the Auth state across all your pages:
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            photoURL = user.photoURL;
            uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            // Removes Sign In button and replaces it with Sign Out button
          
            // document.getElementById('messagingBTN').style.display = 'block';
    
            user.getIdToken().then(function (accessToken) {

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


                $("#messagingLink").on("click", function () {
                    $("#profileDiv").css("display", "none");
                    $("#messageDiv").css("display", "block");
                
                    // $.ajax({
                    //     url: "message.html",
                    //     method: "GET",
                    // }).then(function (obj) {
                    //     $("#msgDiv").html(obj);
                    //     $("#chat-send").on("click", function(event){
                    //         ChatUserInput(event);
                    //     });
                    // })
        
                });

                

                $("#profileLink").on("click", function () {
                    $("#profileDiv").css("display", "block");
                    $("#messageDiv").css("display", "none");
        
                });
          

            
            });
        } else {
            // User is signed out.
            console.log("Hellooooooo")
            $("#messageDiv").css("display", "none");
            $("#profileDiv").css("display", "none");
    
            // Adds login button again
        

        }
    }, function (error) {
        console.log(error);
    });
};

// Event listener for when the page is loaded.
// Runs the initApp to determine if the user is logged in or not
window.addEventListener('load', initApp);












