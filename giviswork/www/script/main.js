// import React from 'react';
// import ReactDOM from 'react-dom/client';
var currentPage;
const maxPage = 6;
const minPage = 1;

var page1;
var page2;
var page3;
var page4;
var page5;
var page6;

var backButton;
var nextButton;
var submitButton;

var pageTitle;
var pitScoutingh1;
var partName;

var titles;
var footer;

var red1;
var red2;
var red3;
var blue1;
var blue2;
var blue3;

var lastRobotOptionClicked;

var scouterInitials;
var eventInput;
var matchNumberInput;
var teamNumber;

var crossedCableInput;
var dockedInput;
var engagedInput;
var attemptedInput;
var notAttemptedInput;

var lastFloorPickupOptionClicked;

var conesInput;
var cubesInput;
var bothInput;
var notAttemptedInputFloor_Pickup;

var dockingTimerInput;

var driverSkillContainer;
var defenseRatingContainer;

var driverSkillLengthSaver = 0;

var driverSkillLastClick = "Not-Observed-input";
var defenseRatingLastClick = "Did-not-play-defense-input";

//

function launch() {
    currentPage = 1;
    lastRobotOptionClicked = "";

    setUpElements();

    backButton.style.display = "none";
    submitButton.style.display = "none";

    teamNumber.value = 1;

    namer();
    fixPages();
    setUpDriverSkill();
}

function pageGetter() {
    switch (currentPage) {
        case 1:
            return "Pre-Match";
        case 2:
            return "Auton";
        case 3:
            return "Teleop";
        case 4:
            return "Endgame";
        case 5:
            return "Miscellaneous";
    }
    return "error";
}

function back() {
    setUpElements();

    currentPage -= 1;

    fixPages();
    fixButtons();
    namer();
    catchInfo();
}

function setUpRadio(radioName) {
    let objArr = "";
    let funcString = "radioChange";
    let pageName = pageGetter();
    let addString = "";
    let className = "";
    var container = null;
    var lengthSaver;
    var defaultRadio;
    if (radioName === "Driver-Skill") {
        objArr = [
            "Not Effective",
            "Average",
            "Very Effective",
            "Not Observed"
        ];
        funcString = "driverSkillRadioChange";
        className = pageName + "option-input";
        container = driverSkillContainer;
        lengthSaver = driverSkillLengthSaver;
        defaultRadio = driverSkillLastClick;
    } else if (radioName === "Defense-Rating") {
        objArr = [
            "Terrible",
            "Bad",
            "Below Average",
            "Average",
            "Good",
            "Excellent",
            "Did not play defense"
        ];
        funcString = "defenseRatingRadioChange";
        className = pageName + "option-input";
        container = defenseRatingContainer;
        defaultRadio = defenseRatingLastClick;
    }

    if (container !== null && pageName !== "error" && lengthSaver === 0) {
        addString += "<label id=\"" + radioName + "-label\" class=\"" + pageName + "-label\"> " + radioName.replace("-", " ") + ": </label>"
        addString += "<div class=\"radioContainer\">"
        for (var i = 0; i < objArr.length; i++) {
            let objId = objArr[i].replace(" ", "-") + "-input";
            addString += "<input id=\"" + objId + "\" onchange=\"" + funcString + "(\'" + objId + "\')\" type=\"radio\" name=\"" + objArr[i].replace(" ", "-") + "\" value=\"" + objArr[i] + "\" class=\"" + className + "\" /> " + objArr[i] + "<br>";
        }
        addString += "</div>";
        document.getElementById(defaultRadio).checked = true;
    }
    container.innerHTML += addString;
    lengthSaver = container.innerHTML.length;
    if (radioName === "Driver-Skill") {
        driverSkillLengthSaver = lengthSaver;
    } else if (radioName === "Defense-Rating") {
        defenseRatingLengthSaver = lengthSaver;
    }
    setUpElements();
}

function defenseRatingRadioChange(id) {
    defenseRatingLastClick = id;
    objArr = [
        "Terrible-input",
        "Bad-input",
        "Below-Average-input",
        "Average-input",
        "Good-input",
        "Excellent-input",
        "Did-not-play-defense-input"
    ];
    for (var i = 0; i < objArr.length; i++) {
        document.getElementById(objArr[i]).checked = false;
    }
    if (!document.getElementById(id).checked) {
        document.getElementById(id).checked = true;
    } else {
        document.getElementById(id).checked = false;
    }
}

function driverSkillRadioChange(id) {
    driverSkillLastClick = id;
    objArr = [
        "Not-Effective-input",
        "Average-input",
        "Very-Effective-input",
        "Not-Observed-input"
    ];
    for (var i = 0; i < objArr.length; i++) {
        document.getElementById(objArr[i]).checked = false;
    }
    if (!document.getElementById(id).checked) {
        document.getElementById(id).checked = true;
    } else {
        document.getElementById(id).checked = false;
    }
}

function allInfoWasGiven() {
    setUpElements();
    switch (currentPage) {
        case 1:
            if (scouterInitials.value == "" || eventInput.value == "" || matchNumberInput.value == "" || teamNumber.value == "") {
                return "Fill out all the fields!";
            } else {
                for (var i = 1; i <= 9; i++) {
                    if (scouterInitials.value.includes(i.toString())) {
                        return "No numbers allowed in the Scouter Initials field!";
                    }
                }
                return true;
            }
    }
    return true;
}

function next() {
    setUpElements();

    if (allInfoWasGiven() == true) {
        currentPage += 1;
        fixPages();
        fixButtons();
        namer();
        catchInfo();
        switch (currentPage) {
            case 5:
                setUpRadio("Driver-Skill");
                setUpRadio("Defense-Rating");
        }
    } else {
        alert(allInfoWasGiven());
    }
    // footer.style.margin = "0 auto";
}

function back() {
    setUpElements();

    currentPage -= 1;

    fixPages();
    fixButtons();
    namer();
    catchInfo();
}

function submit() {
    catchInfo();
}

function timeTimer() {
    setUpElements();
    var startStopTimer = document.getElementById('Start-Stop-Timer');
    if (startStopTimer.innerHTML == "Start") {
        startStopTimer.innerHTML = "Stop";
        setInterval(theTimer, 100);
    } else {
        startStopTimer.innerHTML = "Start";
        clearInterval(timerVariable);
    }
}

function resetTimer() {
    dockingTimerInput.value = 0.0;
    setUpElements();
}

function theTimer() {
    dockingTimerInput.value = parseFloat(dockingTimerInput.value) + 0.1;
}

function finalStatusRadioChange(id) {
    idArr = [
        "Final-Status-Parked-input",
        "Final-Status-Docked-input",
        "Final-Status-Engaged-input",
        "Final-Status-AttemptedButFailed-input"
    ];
    for (var i = 0; i < idArr.length; i++) {
        document.getElementById(idArr[i]).checked = false;
    }
    document.getElementById(id).checked = true;
}

function floorPickupRadioChange(input) {
    conesInput.checked = false;
    cubesInput.checked = false;
    bothInput.checked = false;
    notAttemptedInputFloor_Pickup = false;

    document.getElementById(input).checked = true;
    setUpElements();
    lastFloorPickupOptionClicked = input;
}

function robotRadioChange(input) {
    red1.checked = false;
    red2.checked = false;
    red3.checked = false;
    blue1.checked = false;
    blue2.checked = false;
    blue3.checked = false;

    document.getElementById(input).checked = true;
    setUpElements();
    lastRobotOptionClicked = input;
}

function setUpElements() {
    page1 = document.getElementById('page1');
    page2 = document.getElementById('page2');
    page3 = document.getElementById('page3');
    page4 = document.getElementById('page4');
    page5 = document.getElementById('page5');
    page6 = document.getElementById('page6');

    backButton = document.getElementById('backButton');
    nextButton = document.getElementById('nextButton');
    submitButton = document.getElementById('submitButton');

    pageTitle = document.getElementById('pageTitle');
    pitScoutingh1 = document.getElementById('pitScouting');
    partName = document.getElementById("partName");

    titles = document.getElementById('titles');
    footer = document.getElementById('footer');

    red1 = document.getElementById('R1');
    red2 = document.getElementById('R2');
    red3 = document.getElementById('R3');
    blue1 = document.getElementById('B1');
    blue2 = document.getElementById('B2');
    blue3 = document.getElementById('B3');

    scouterInitials = document.getElementById('Scouter-Initials-input');
    eventInput = document.getElementById('Event-input');
    matchNumberInput = document.getElementById('Match-Number-input');
    teamNumber = document.getElementById('Team-Number-input');

    crossedCableInput = document.getElementById('Crossed-Cable-input');

    dockedInput = document.getElementById('Docked-input');
    engagedInput = document.getElementById('Engaged-input');
    attemptedInput = document.getElementById('Attempted-input');
    notAttemptedInput = document.getElementById('NotAttempted-input');

    conesInput = document.getElementById('Cones-input');
    cubesInput = document.getElementById('Cubes-input');
    bothInput = document.getElementById('Both-input');
    notAttemptedInputFloor_Pickup = document.getElementById('NotAttempted-floorPickup');

    titles.style.textAlign = "center";
    footer.style.textAlign = "center";

    dockingTimerInput = document.getElementById('Docking-Timer-input');

    dockingTimerInput.value = 0.0;

    driverSkillContainer = document.getElementById('Driver-Skill-containerParagraph');

    defenseRatingContainer = document.getElementById('Defense-Rating-containerParagraph');
}

function dockedRadioChange(id) {
    const optionIDs = ['Docked-input', 'Engaged-input', 'Attempted-input', 'NotAttempted-input'];
    for (var i = 0; i < optionIDs.length; i++) {
        if (id !== optionIDs[i]) {
            document.getElementById(optionIDs[i]).checked = false;
        } else {
            document.getElementById(optionIDs[i]).checked = true;
        }
    }
}

function namer() {
    switch (currentPage) {
        case 1:
            partName.innerHTML = "PRE-MATCH";
            break;
        case 2:
            partName.innerHTML = "AUTON";
            break;
        case 3:
            partName.innerHTML = "TELEOP";
            break;
        case 4:
            partName.innerHTML = "ENDGAME";
            break;
        case 5:
            partName.innerHTML = "MISCELLANEOUS";
            break;
        case 6:
            partName.innerHTML = "";
            break;
    }
}

function fixPages() {
    for (var i = 1; i <= 6; i++) {
        document.getElementById("page" + i).style.display = "none";
    }
    document.getElementById("page" + currentPage.toString()).style.display = "inline-block";
}

function catchInfo() {
    //
}

function fixButtons() {
    if (currentPage === 1) {
        backButton.style.display = "none";
        submitButton.style.display = "none";
        nextButton.style.display = "inline-block";
    } else if (currentPage === 6) {
        backButton.style.display = "inline-block";
        submitButton.style.display = "inline-block";
        nextButton.style.display = "none";
    } else {
        backButton.style.display = "inline-block";
        submitButton.style.display = "none";
        nextButton.style.display = "inline-block";
    }
}

function isDisplayed(id) {
    if (document.getElementById(id).display == "none") {
        return false;
    }
    return true;
}

function hide(id) {
    if (document.getElementById(id).display != "block") {
        document.getElementById(id).display = "none";
    }
}

function show(id) {
    if (document.getElementById(id).display != "none") {
        document.getElementById(id).display = "block";
    }
}
