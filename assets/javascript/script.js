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
var photoURL = "";
var count = 0;

localStorage.setItem("count", "0");

// Creates an instance of the GitHub provider object
var provider = new firebase.auth.GithubAuthProvider();

if(localStorage.getItem("count") == 0) {
    $("#loginPage").css("display", "block");
    localStorage.setItem("count", "1");
}



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


    $("#loginPage").css("display", "none");
    // $("body").css('background', '#fff');
    $(".container").css("display", "block");

})

//  Track the Auth state across all your pages
var initApp = function () {

    // on click event for sign out button
    $('#signOutBTN').on('click', function () {
        firebase.auth().signOut();
    });

    // Track the Auth state across all your pages:
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $("#loginPage").css("display", "none");
            $(".container").css("display", "block");
            $("#profilePage").css("display", "block");
            // User is signed in.
            displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            photoURL = user.photoURL;
            uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;

            user.getIdToken().then(function (accessToken) {

                userData.on("value", function (snapshot) {
                    var checker = false;
                    if (!snapshot.val()) {
                        userData.push({
                            displayName: displayName,
                            userID: uid
                        });
                        return;
                    }

                    Object.keys(snapshot.val()).forEach(function (keys) {
                        if (snapshot.val()[keys].displayName === displayName) {
                            checker = true;
                        }
                    });

                    if (!checker) {
                        userData.push({
                            displayName: displayName,
                            userID: uid
                        });
                    }
                });

                if (count === 0) {
                    $('#account-details').append("<div id='bio'><b class='text'>"+displayName+"</b><img src='" + photoURL + "' alt='Profile Photo'><br>" + email + "<br></div>");
                }

                count = 1;

                $("#profileLink").on("click", function () {
                    $("#profilePage").css("display", "block");
                    $("#mapSpace").css("display", "none");
                    $("#jobsPage").css("display", "none");
                    $("#messagePage").css("display", "none");
                    $("#contactPage").css("display", "none");
                });

                $("#mapLink").on("click", function () {
                    $("#profilePage").css("display", "none");
                    $("#mapSpace").css("display", "block");
                    $("#jobsPage").css("display", "none");
                    $("#messagePage").css("display", "none");
                    $("#contactPage").css("display", "none");

                });

                $("#jobsLink").on("click", function () {
                    $("#profilePage").css("display", "none");
                    $("#mapSpace").css("display", "none");
                    $("#jobsPage").css("display", "block");
                    $("#messagePage").css("display", "none");
                    $("#contactPage").css("display", "none");

                });
                $("#messagingLink").on("click", function () {
                    $("#profilePage").css("display", "none");
                    $("#mapSpace").css("display", "none");
                    $("#jobsPage").css("display", "none");
                    $("#messagePage").css("display", "block");
                    $("#contactPage").css("display", "none");
                });
                $("#contactLink").on("click", function () {
                    $("#profilePage").css("display", "none");
                    $("#mapSpace").css("display", "none");
                    $("#jobsPage").css("display", "none");
                    $("#messagePage").css("display", "none");
                    $("#contactPage").css("display", "block");
                });

            });
        } else {
            // User is signed out.
            $("#loginPage").css("display", "block");
            $(".container").css("display", "none");
            $("#profilePage").css("display", "none");
            $("#mapSpace").css("display", "none");
            $("#jobsPage").css("display", "none");
            $("#messagePage").css("display", "none");
            $("#contactPage").css("display", "none");
            localStorage.setItem("count", "0");
            // Adds login button again

        }
    }, function (error) {
        console.log(error);
    });
};

// Event listener for when the page is loaded.
// Runs the initApp to determine if the user is logged in or not
window.addEventListener('load', initApp);
