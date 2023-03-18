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
    } else {
        alert('fuck');
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

    titles.style.textAlign = "center";
    footer.style.textAlign = "center";
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
