'use strict';

let latitude
let longitude

function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      latitude  = position.coords.latitude;
      longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
  }
  
document.querySelector('#find-me').addEventListener('click', geoFindMe);

function geohash() {
    var apikey = '35fcb69df81c4885ba7dd1b123aa7fc5';
    var api_url = 'https://api.opencagedata.com/geocode/v1/json'
    var request_url = api_url
    + '?'
    + 'key=' + apikey
    + `&q=' + ${latitude} + ',' + ${longitude}`
    + '&pretty=1'
  

    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){ 
        // Success!
        var data = JSON.parse(request.responseText);
        //alert(data.results[0].geohash); // print the location
        console.log(data.results.annotations['10']);

    } else if (request.status <= 500){ 
        // We reached our target server, but it returned an error            
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
    } else {
        console.log("server error");
    }
    };

    request.onerror = function() {
    console.log("unable to connect to server");        
    };

    request.send();  // make the request
}
geohash()

const eventsButton = document.getElementById("eventsButton");

eventsButton.addEventListener("click", function (event) {
    event.preventDefault(); //prevents submit action which would reload page 
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer YFdYgO1Va5J6Q_U9Dxrbl7wv4ajE146Tr7hqdjZ3");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api.predicthq.com/v1/events", requestOptions)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        var eventList = data.results.map((individualEvent) => {
            return `<div>
                        <ul>
                            <li>Name: ${individualEvent.title}</li>
                            <li>Description: ${individualEvent.description}</li>
                            <li>Category: ${individualEvent.category}</li>
                        </ul>
                    </div>`;
             });
        document.getElementById("output").innerHTML = eventList;
    })
    .catch(error => console.log('error', error));
});
       
    
    
    
    // const url = 'https://api.predicthq.com/v1/events';
    // fetch(url)
    // .then(function (response) {
    //     return response.json();
    // })
    // .then(function (data) {
    //     var eventList = data.results.map((individualEvent) => {
    //         return `<div>
    //                     <ul>
    //                         <li>Name: ${individualEvent.title}</li>
    //                         <li>Height: ${individualEvent.description}</li>
    //                         <li>Mass: ${individualEvent.category}</li>
    //                     </ul>
    //                 </div>`;
    //          });
    //     document.getElementById("output").innerHTML = eventList;
    // });