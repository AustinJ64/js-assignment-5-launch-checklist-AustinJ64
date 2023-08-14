// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.querySelector("div[id=missionTarget]");
    let myHtml = "<h2>Mission Destination</h2>"
    myHtml += "<ol>"
    myHtml += `<li>Name: ${name}</li>`
    myHtml += `<li>Diameter: ${diameter}</li>`
    myHtml += `<li>Star: ${star}</li>`
    myHtml += `<li>Distance from Earth: ${distance}</li>`
    myHtml += `<li>Number of Moons: ${moons}</li>`
    myHtml += "</ol>"
    myHtml += `<img src='${imageUrl}'>`
    missionTarget.innerHTML = myHtml

    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
}

function validateInput(testInput) {
    if (!testInput) {
        return 'Empty'
    } else if (isNaN(testInput)) {
        return 'Not a Number'
    } else {
        return 'Is a Number'
    };
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.querySelector("li[id=pilotStatus]");
    let copilotStatus = document.querySelector("li[id=copilotStatus]");
    let fuelStatus = document.querySelector("li[id=fuelStatus]");
    let cargoStatus = document.querySelector("li[id=cargoStatus]");
    let launchStatus = document.querySelector("h2[id=launchStatus]")
    let pilotLaunchStatus = false
    let copilotLaunchStatus = false
    let fuelLaunchStatus = false
    let cargoLaunchStatus = false
    let validInfoCheck = true
    list.style.visibility = 'hidden'
    launchStatus.textContent = "Shuttle Not Ready for Launch"

    if (validateInput(pilot) === "Empty") {
        pilotStatus.textContent = `pilot not ready`
    } else if (validateInput(pilot) === "Is a Number") {
        validInfoCheck = false
    } else {
        pilotStatus.textContent = `Pilot ${pilot} is ready for launch`
        pilotLaunchStatus = true;
    }
    if (validateInput(copilot) === "Empty") {
        copilotStatus.textContent = `Co-pilot not ready`
    } else if (validateInput(copilot) === "Is a Number") {
        validInfoCheck = false
    } else {
        copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`
        copilotLaunchStatus = true;
    }
    if (validateInput(fuelLevel) === "Empty") {
        fuelStatus.textContent = "Fuel level too low for launch"
    } else if (validateInput(fuelLevel) === "Not a Number") {
        fuelStatus.textContent = "Fuel level too low for launch"
        validInfoCheck = false
    } else {
        if (fuelLevel < 10000) {
            fuelStatus.textContent = "Fuel level too low for launch"
        } else {
            fuelStatus.textContent = "Fuel level high enough for launch"
            fuelLaunchStatus = true;
        };
    }
    if (validateInput(cargoLevel) === "Empty") {
        cargoStatus.textContent = "Cargo mass low enough for launch"
        cargoLaunchStatus = true;
        alert("All fields are required!")
    } else if (validateInput(cargoLevel) === "Not a Number") {
        cargoStatus.textContent = "Cargo mass too heavy for launch"
        validInfoCheck = false
    } else {
        if (cargoLevel > 10000) {
            cargoStatus.textContent = "Cargo mass too heavy for launch"
        } else {
            cargoStatus.textContent = "Cargo mass low enough for launch"
            cargoLaunchStatus = true;
        }
    };
    list.style.visibility = 'visible'
    if (pilotLaunchStatus && copilotLaunchStatus && fuelLaunchStatus && cargoLaunchStatus) {
        launchStatus.textContent = "Shuttle is Ready for Launch"
        launchStatus.style.color = "rgb(65, 159, 106)"
    } else {
        launchStatus.textContent = "Shuttle Not Ready for Launch"
        launchStatus.style.color = 'rgb(199, 37, 78)'
    }
    if (!validInfoCheck) {
        alert("Make sure to enter valid information for each field")
    };
};

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let pickedPlanetIndex = Math.floor(Math.random() * 6);
    let pickedPlanet = planets.at(pickedPlanetIndex);
    return pickedPlanet
};

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
