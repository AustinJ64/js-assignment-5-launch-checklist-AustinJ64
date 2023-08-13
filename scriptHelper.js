// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
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
    list.style.visibility = 'visible'
    launchStatus.innerText = "Shuttle not ready for launch"

    if (validateInput(pilot) === "Empty") {
        pilotStatus.innerText = `pilot not ready`
    } else {
        pilotStatus.innerText = `Pilot ${pilot} is ready`
        pilotLaunchStatus = true;
    }
    if (validateInput(copilot) === "Empty") {
        copilotStatus.innerText = `Copilot not ready`
    } else {
        copilotStatus.innerText = `Copilot ${copilot} is ready`
        copilotLaunchStatus = true;
    }
    if (validateInput(fuelLevel) === "Empty") {
        fuelStatus.innerText = "Fuel level too low"
    } else if (validateInput(fuelLevel) === "Not a Number") {
        fuelStatus.innerText = "Fuel level too low"
    } else {
        if (fuelLevel < 10000) {
            fuelStatus.innerText = "Fuel level too low"
        } else {
            fuelStatus.innerText = "Fuel level high enough for launch"
            fuelLaunchStatus = true;
        };
    }
    if (validateInput(cargoLevel) === "Empty") {
        cargoStatus.innerText = "Cargo mass low enough for launch"
        cargoLaunchStatus = true;
    } else if (validateInput(cargoLevel) === "Not a Number") {
        cargoStatus.innerText = "Cargo mass too heavy for launch"
    } else {
        if (cargoLevel > 10000) {
            cargoStatus.innerText = "Cargo mass too heavy for launch"
        } else {
            cargoStatus.innerText = "Cargo mass low enough for launch"
            cargoLaunchStatus = true;
        }
    };
    if (pilotLaunchStatus && copilotLaunchStatus && fuelLaunchStatus && cargoLaunchStatus) {
        launchStatus.innerText = "Shuttle is ready for launch"
        launchStatus.style.color = "green"
    } else {
        launchStatus.innerText = "Shuttle not ready for launch"
        launchStatus.style.color = 'rgb(199, 37, 78)'
    }
};

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
