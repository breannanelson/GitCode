var map;
var marker;
var mapForm;
var address;
var radius;
var type;
var newLoc;
// var name;
var time;
var languages;
var message;
var location;
var state;
var country;
var keyword;

//momentjs is for items on wishlist
var now = moment().format('hh:mmA')

//switches map to day version
$('#lightMap').on('click', function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 33.6694, lng: -117.8265},
      zoom: 12
    });
})

//switches map to night version
$('#darkMap').on('click', function(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 33.6694, lng: -117.8265},
      zoom: 12,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
  }); 
})

function initMap() {
    //creates nightime map instead of light, custom colors
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.6694, lng: -117.8265},
        zoom: 12,
        styles: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]
    }); 

    $('#submitBTN').on('click', function(){
        //declare var for geocoder
        var geocoder= new google.maps.Geocoder();
        //takes input value from address field
        address = $('#address').val().trim();
        //generic radius, produces meters not feet
        radius = '10000'
        //names of places that offer free wifi
        type = 'starbucks|panerabread|mcdonalds|barnesandnoble|arbys|applebees|brewsterscoffee|cornerbakery|dunkindonuts|ihop|leessandwiches|peetscoffee|tullyscoffee|buffalowildwings|peetscoffee'

        //user info to be used at a later time
        // name = $('#name').val().trim();
        // time = $('#time').val().trim();
        // languages = $('#languages').val().trim();
        // message = $('#projInfo').val().trim();
        var contentString = '<button id="messagingLink">Join Chatroom for this Project!</button>';
        // '<p>Working with :<b> '+ languages +'</b></p> ' +
        // '<p>About this project : <b>' + message + '</b></p> ' +
        // '<p>They will be working until ' + time + '</p> ' +
        // '<p>If you would like to collaborate, click the button below.</p>' +
        
    
        geocoder.geocode( {'address': address}, function(results, status) {
            //if status is ok enable set marker function
            if (status == 'OK') {
                // console.log(results)
                map.setCenter(results[0].geometry.location);
                newLoc = results[0].geometry.location;
                var GMurl = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + newLoc + '&radius=' + radius + '&opennow=true&keyword=' + type + '&key=AIzaSyAOASDIikd8pGiO3vLaVh4bhuhpOr3ZAQY' 
                var newUrl = GMurl.replace(/[()]/g, '');
                var newUrl2 = newUrl.replace(/\s+/g, '');
                console.log(newUrl2)

                $.ajax({
                    url : newUrl2,
                    method : 'GET'
                }).then(function(object) {
                    console.log(object)
                    var listView = $('<div id="lists">Nearby Locations : </div>')
                    $('#list').prepend(listView)
                    var resultsLength = object.results.length 
                    for (var i = 0; i < resultsLength; i++) {
                        //gets icon associated with location
                        var icon = object.results[i].icon
                        //gets name of location
                        var objDesc = object.results[i].name
                        //appends to bottom of page to create list of nearby locations
                        var objName = $('<div id="obj"><img src="' + icon + '" width="100px" height="100px"> ' + objDesc + '</div><br>')
                        $('#lists').append(objName);

                        function createMarker(place) {
                            //variable for location of all items on array
                            var placeLoc = object.results[i].geometry.location;
                            //create a marker to place on those locations
                            var marker = new google.maps.Marker({
                              map: map,
                              position: placeLoc
                            });

                            //creates info window for marker
                            var infowindow = new google.maps.InfoWindow({
                                //what the info window contains
                                content: "<div id='place'><b>" + objDesc + "</b></div>" +
                                "<div id='located'>" + object.results[i].vicinity + " </div>" +
                                "<div id='rating'>Rating: " + object.results[i].rating + "/5 </div>" +
                                contentString
                            });
                            
                            //add listener to markers
                            // marker.addListener('click', function() {
                            //     //opens info window on click
                            //     infowindow.open(map, marker);
                            //     //allows user to type into textbox and appends to chat
                            //     $('#chat').on('click', function(){
                            //         var convo = $("#chatroom").val();
                            //         $("#convoBox").append("<p>" + convo + "</p>")
                            //     });
                            // });
                        };
                        createMarker(object.results[i])
                    }
                }) 
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            };
        });
    });
};

//job search, Authentic Jobs API
$('#jobSearchBTN').on('click', function(){
  $('.jobArr').empty()
  city = $('#city').val().trim();
  state = $('#state').val().trim();
  keyword = $('#keyword').val().trim();
  
  var jobsUrl = "https://crossorigin.me/https://authenticjobs.com/api/?api_key=2afda0faadb053f58f7b7c1147b34237&method=aj.jobs.search&format=json&category=" + keyword + "&location=" + city + "," + state + "&perpage=20"
  var newJobUrl = jobsUrl.replace(/[()]/g, '');
  var jobUrl2 = newJobUrl.replace(/\s+/g, '')
  console.log(jobUrl2)
  
  $.ajax({
      url : jobUrl2,
      method : 'GET'
  }).then(function(jobObj) {
      var jobLength = jobObj.listings.listing.length
      for (var i = 0; i < jobLength; i++) {
        console.log(jobObj.listings)
          //returns job title
          var jobTitle = jobObj.listings.listing[i].title
          //returns if job is full-time, part-time, etc.
          var jobType = jobObj.listings.listing[i].type.name
          //returns company name
          var jobName = jobObj.listings.listing[i].company.name
          //returns website link to application
          var jobUrlLink = jobObj.listings.listing[i].apply_url
          //returns location of job
          var jobLocation = jobObj.listings.listing[i].company.location.name
          //variable that puts it all together and onto html page
          var jobList = $("<div class='card''>" +
            "<div class='card-body'>" +
            "<h5 class='card-title'>" + jobTitle + "</h5>" +
            "<h6 class='card-subtitle mb-2 text-muted'>" + jobName + "</h6>" +
            "<h6 class='card-subtitle mb-2 text-muted'>" + jobLocation + "</h6>" +
            "<h6 class='card-subtitle mb-2 text-muted'>" + jobType + "</h6>" +
            "<p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>" +
            "<a href="+jobUrlLink+" class='card-link'>Go To Job Posting</a>" +
            "<a href='#' class='card-link'>Company Website</a>" +
            "</div>" +
            "</div>")
          
          //appends jobs to page
          $('.jobArr').append(jobList)
      }
  })
})

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  var x = document.getElementById("coolButton");
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }

}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  var x = document.getElementById("coolButton"); 
  if (x.style.display === "block") {
      x.style.display = "initial";
  } else {
      x.style.display = "initial";
  } 
}
