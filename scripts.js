function enableOtherTextbox () {
    if (document.getElementById("run-type-selector").value == "other") {
        document.getElementById("record-run-other-textbox").disabled = false
    } else {
        document.getElementById("record-run-other-textbox").value = ""
        document.getElementById("record-run-other-textbox").disabled = true
    }
}

function disableColorInput (type) {
    let checkboxid
    let colorinputid
    if (type == "back") {
        checkboxid = "record-run-color-checkbox"
        colorinputid = "record-run-color-input"
    } else if (type == "text") {
        checkboxid = "record-run-text-color-checkbox"
        colorinputid = "record-run-text-color-input"
    }
    if (document.getElementById(checkboxid).checked) {
        document.getElementById(colorinputid).disabled = false
        document.getElementById(colorinputid).style.display = "inline"
        if (type == "back") {
            document.getElementById("example-text").style.backgroundColor = document.getElementById("record-run-color-input").value
        } else if (type == "text") {
            document.getElementById("example-text").style.color = document.getElementById("record-run-text-color-input").value
        }
    } else {
        document.getElementById(colorinputid).disabled = true
        document.getElementById(colorinputid).style.display = "none"
        if (type == "back") {
            document.getElementById("example-text").style.backgroundColor = "transparent"
        } else if (type == "text") {
            document.getElementById("example-text").style.color = "#000000"
        }
    }
}

function updateExampleText () {
    document.getElementById("example-text").style.backgroundColor = document.getElementById("record-run-color-input").value
    document.getElementById("example-text").style.color = document.getElementById("record-run-text-color-input").value
}

function updateData () {
    if (!localStorage.getItem("mi")) {
        localStorage.setItem("mi", "0")
    }
    if (!localStorage.getItem("runs")) {
        localStorage.setItem("runs", "0")
    }
    localStorage.setItem("mi", (Math.round((parseFloat(localStorage.getItem("mi")) + parseFloat(document.getElementById("record-run-distance").value))*100)/100).toString())
    localStorage.setItem("runs", (parseInt(localStorage.getItem("runs")) + 1).toString())
}

function setNumberLength (num, normPlaces, decPlaces) {
    let result = num.toString()
    if (!result.includes(".")) {
        result += ".00"
    }
    if (result.split(".")[1].length != decPlaces) {
        for (let i=0; i < decPlaces - result.split(".")[1].length; i++) {
            result += "0"
        }
    }
    if (result.split(".")[0].length != normPlaces) {
        for (let i=0; i < normPlaces - result.split(".")[0].length; i++) {
            result = "0" + result
        }
    }
    return result
}

function updateStats () {
    let totalMiles
    if (localStorage.getItem("mi")) {
        totalMiles = parseFloat(localStorage.getItem("mi"))
    } else {
        totalMiles = 0
        localStorage.setItem("mi", "0")
    }
    let tmnormplaces
    if (totalMiles.toString().includes(".")) {
        tmnormplaces = totalMiles.toString().split(".")[0].length
    } else {
        tmnormplaces = totalMiles.toString().length
    }
    let totalRuns
    if (localStorage.getItem("runs")) {
        totalRuns = parseInt(localStorage.getItem("runs"))
    } else {
        totalRuns = 0
        localStorage.setItem("runs", "0")
    }
    let displayMiles = 0
    let displayRuns = 0
    let frames = Math.floor(totalMiles/(Math.round(totalMiles/2)/100))
    let currentFrame = 0
    let countUp = setInterval(function () {
        currentFrame += 1
        displayMiles += Math.round(totalMiles/2)/100
        displayMiles = Math.round(displayMiles*100)/100
        if (currentFrame % Math.round(frames/totalRuns) == 0) {
            displayRuns += 1
        }
        document.getElementById("micount").innerHTML = setNumberLength(displayMiles, tmnormplaces, 2)
        document.getElementById("runcount").innerHTML = displayRuns
        if (displayMiles >= totalMiles) {
            document.getElementById("micount").innerHTML = setNumberLength(totalMiles, tmnormplaces, 2)
            document.getElementById("runcount").innerHTML = totalRuns
            clearInterval(countUp)
        }
    }, 1)
}