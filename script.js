// Write your JavaScript code here!




window.addEventListener("load", function () {
    let form = document.querySelector("form");
    let list = document.querySelector("div[id=faultyItems]");
    list.style.visibility = 'hidden'
    document.querySelector("h2[id=launchStatus]").textContent = "Shuttle Not Ready for Launch"
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let pilot = document.querySelector("input[name=pilotName]");
        let copilot = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel");
        let cargoLevel = document.querySelector("input[name=cargoMass");
        formSubmission(document, list, pilot.value, copilot.value, fuelLevel.value, cargoLevel.value);
    });
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        // console.log(listedPlanets);
        // let myPlanet = pickPlanet(listedPlanets);
        // addDestinationInfo(document, myPlanet.name, myPlanet.diameter, myPlanet.star, myPlanet.distance, myPlanet.moons, myPlanet.image)
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let myPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, myPlanet.name, myPlanet.diameter, myPlanet.star, myPlanet.distance, myPlanet.moons, myPlanet.image);
    })

});