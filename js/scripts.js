// browser location starts when this function is called 
let geohash;

function getLocation() { 

    // check to make sure geolocation is possible
    if (navigator.geolocation) { 
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else { 
      console.log('Geolocation is not supported')}; 
    } 
  
  
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  
    function success(pos) {
  
        var query = pos.coords.latitude + ',' + pos.coords.longitude;
        console.log('coordinates: ' + query);
        console.log('accuracy: ' + pos.coords.accuracy + ' meters.');
  
    // now we have coordinates, it is time to use them to  
    // do some reverse geocoding to get back the location information
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'
        var apikey = '35fcb69df81c4885ba7dd1b123aa7fc5';
  
        var request_url = api_url
        + '?'
        + 'key=' + apikey
        + '&q=' + encodeURIComponent(query)
        + '&pretty=1'
  
    // now we follow the steps in the OpenCage javascript tutorial 
    // full example:
    // https://opencagedata.com/tutorials/geocode-in-javascript
  
        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);
  
        request.onload = function() {
      // see full list of possible response codes:
      // https://opencagedata.com/api#codes
  
        if (request.status === 200){  // Success!
            var data = JSON.parse(request.responseText);
            geohash = data.results[0].annotations.geohash.substring(0,9);
            console.log(geohash);
        } 
        else if (request.status <= 500){ // We reached our target server, but it returned an error                   
            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log('error msg: ' + data.status.message);
        } 
        else {
            console.log("server error");
        }
    };
    
    request.onerror = function() {
      // There was a connection error of some sort
      console.log("unable to connect to server");
    };
    
    request.send();  // make the request
  
}

locationButton.addEventListener("click", function (event) {
    event.preventDefault(); //prevents submit action which would reload page
    getLocation();
});


function getEvents() {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=kPwc8hRP4lHymySkz8uZDaL5OUA2dXYh&geoPoint=${geohash}&radius=20`;
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        var eventList = json._embedded.events.map((individualEvent) => {
            return `<div>
                        <ul>
                            <li><img src="${individualEvent.images[0].url}" /></li>  
                            <li>Name: ${individualEvent.name}</li>
                            <li>Date: ${individualEvent.dates.start.localDate}</li>
                            <li>Time: ${individualEvent.dates.start.localTime}</li>
                            <li>Tickets: <a href="${individualEvent.url}">Click Here</a></li>
                        </ul>
                    </div>`;
        });
    document.getElementById("output").innerHTML = eventList;    
    });
};

eventsButton.addEventListener("click", function (event) {
    event.preventDefault(); //prevents submit action which would reload page
    getEvents();
});



function getSports() {
    const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=kPwc8hRP4lHymySkz8uZDaL5OUA2dXYh&classificationId=KZFzniwnSyZfZ7v7nE&geoPoint=${geohash}&radius=20`;
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        var eventList = json._embedded.events.map((individualEvent) => {
            return `<div>
                        <ul>
                            <li><img src="${individualEvent.images[0].url}" /></li>  
                            <li>Name: ${individualEvent.name}</li>
                            <li>Date: ${individualEvent.dates.start.localDate}</li>
                            <li>Time: ${individualEvent.dates.start.localTime}</li>
                            <li>Tickets: <a href="${individualEvent.url}">Click Here</a></li>
                        </ul>
                    </div>`;
        });
    document.getElementById("output").innerHTML = eventList;    
    });
};

sportsButton.addEventListener("click", function (event) {
    event.preventDefault(); //prevents submit action which would reload page
    getSports();
});



function getMusic() {
    const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=kPwc8hRP4lHymySkz8uZDaL5OUA2dXYh&classificationId=KZFzniwnSyZfZ7v7nJ&geoPoint=${geohash}&radius=20`;
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        var eventList = json._embedded.events.map((individualEvent) => {
            return `<div>
                        <ul>
                            <li><img src="${individualEvent.images[0].url}" /></li>  
                            <li>Name: ${individualEvent.name}</li>
                            <li>Date: ${individualEvent.dates.start.localDate}</li>
                            <li>Time: ${individualEvent.dates.start.localTime}</li>
                            <li>Tickets: <a href="${individualEvent.url}">Click Here</a></li>
                        </ul>
                    </div>`;
        });
    document.getElementById("output").innerHTML = eventList;    
    });
};

musicButton.addEventListener("click", function (event) {
    event.preventDefault(); //prevents submit action which would reload page
    getMusic();
});