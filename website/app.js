/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//sets bas url and apikey
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=90ba839ea88d03d4d7bc51af66bd3436&units=imperial'; //added units=imperial at the end to get Fahrenheit per api instructions

//Get method to api
const getAPIWeather = async (baseURL, zip, apiKey)=>{

    const res = await fetch(baseURL+zip+apiKey)
    try {
  
      const data = await res.json();
     // console.log(data);

      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

  //GET method from projectdata
  const getProjectData = async (url = '', data = {})=>{
    // Default options are marked with *
    const res = await fetch(url, {
      method: 'GET', 
      credentials: 'same-origin', 
      headers: { 'Content-Type': 'application/json'}
    });

    try {
        const data = await res.json();
        //console.log(data);
        return data;
      }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
  }

// POST method:
const postData = async (url = '', data = {})=>{
    // Default options are marked with *
    const res = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    });

    try {
        const newData = await res.json();
       // console.log(newData);
        return newData;
      }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
  }

  function updateUI(){

    let projectData = getProjectData('/weatherEntry')
    .then (function(projectData){

    //update entryholder divs
    //date
    document.getElementById('date').innerHTML = projectData.date;

    //temp
    document.getElementById('temp').innerHTML = projectData.temp;

    //content
    document.getElementById('content').innerHTML = projectData.fefeelingel;

    //reset zip and feelings for next entry
    document.getElementById('zip').value = "";
    document.getElementById('feelings').value = "";

  })
}

function getWeather() {

//gets the zip data from the zip text field
let zip = document.getElementById('zip').value + ",";
console.log(zip);

let weather = getAPIWeather(baseURL, zip, apiKey);

return weather;

}

  //set event listenser for generate button and runs the getWeather,postData, and updatUI funcitons
  generateButton = document.getElementById("generate");
  generateButton.addEventListener("click", function() {
      getWeather()
      .then(function(data){

        //gets the text from the feelings text box
        let feelings = document.getElementById('feelings').value;

        //post data to the server
        postData('/weatherEntry', {date: newDate, temp: data.main.temp, feeling: feelings});

        updateUI();

      })
  });