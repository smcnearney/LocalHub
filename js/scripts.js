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



const characterButton = document.getElementById("eventsButton");

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