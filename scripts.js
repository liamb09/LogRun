let runs

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
    if (!localStorage.getItem("numRuns")) {
        localStorage.setItem("numRuns", "0")
    }
    if (!localStorage.getItem("runs")) {
        runs = []
        localStorage.setItem("runs", JSON.stringify([]))
    } else {
        runs = JSON.parse(localStorage.getItem("runs"))
    }
    let newRun = {
        title: document.getElementById("record-run-title").value,
        mi: document.getElementById("record-run-distance").value,
        time: `${document.getElementById("record-run-time-hr").value.toString()}:${document.getElementById("record-run-time-min").value.toString()}:${document.getElementById("record-run-time-sec").value.toString()}`,
        date: document.getElementById("record-run-date").value,
        type: (document.getElementById("run-type-selector").value == "other" ? document.getElementById("record-run-other-textbox").value : document.getElementById("run-type-selector").value),
        backgroundColor: document.getElementById("record-run-color-input").value,
        textColor: document.getElementById("record-run-text-color-input").value,
        details: document.getElementById("record-run-details").value
    }
    // Insert in array based on date
    if (runs.length > 0) {
        let startLength = runs.length
        for (let i = 0; i < runs.length; i++) {
            let currentRunDate = runs[i]["date"].split("-")
            let newRunDate = newRun["date"].split("-")
            if (parseInt(newRunDate[0]) > parseInt(currentRunDate[0])) {
                runs.splice(i, 0, newRun)
                break
            } else if (parseInt(newRunDate[0]) == parseInt(currentRunDate[0])) {
                if (parseInt(newRunDate[1]) > parseInt(currentRunDate[1])) {
                    runs.splice(i, 0, newRun)
                    break
                } else if (parseInt(newRunDate[1]) == parseInt(currentRunDate[1]) && parseInt(newRunDate[2]) >= parseInt(currentRunDate[2])) {
                    runs.splice(i, 0, newRun)
                    break
                }
            }
        }
        if (runs.length == startLength) {
            runs.push(newRun)
        }
    } else {
        runs.push(newRun)
    }
    console.log(runs)
    localStorage.setItem("runs", JSON.stringify(runs))
    localStorage.setItem("mi", (Math.round((parseFloat(localStorage.getItem("mi")) + parseFloat(document.getElementById("record-run-distance").value))*100)/100).toString())
    localStorage.setItem("numRuns", (parseInt(localStorage.getItem("numRuns")) + 1).toString())
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

function updateLog () {
    // Countup Animations
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
    if (localStorage.getItem("numRuns")) {
        totalRuns = parseInt(localStorage.getItem("numRuns"))
    } else {
        totalRuns = 0
        localStorage.setItem("numRuns", "0")
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

    // Runs
    runs = JSON.parse(localStorage.getItem("runs"))
    if (runs) {
        for (let i = 0; i < runs.length; i++) {
            document.getElementById("runs-container").innerHTML += 
            `<div id="log-details-container" style="color: ${runs[i]["textColor"]} !important; background-color: ${runs[i]["backgroundColor"]} !important;">
                <div id="log-details-number" style="padding-left: 20px !important; padding-top: 0 !important; line-height: 200px !important;">
                    ${runs[i]["type"][0].toUpperCase() + runs[i]["type"].slice(1)}
                </div>
                <div id="log-details-description">
                    <span id="log-details-title" style="float: left;">${runs[i]["title"]}</span><span id="log-details-title" style="float: right;">${formatDate(runs[i]["date"])}</span><br><br><br>${runs[i]["details"]}
                </div>
                <div id="log-details-number">
                    ${runs[i]["mi"]}<br>Miles
                </div>
                <div id="log-details-number">
                    ${formatTime(runs[i]["time"])}<br>Time
                </div>
                <div id="log-details-number">
                    ${(calcAvgPace(runs[i]["time"], runs[i]["mi"])) == "0:00" ? "-" : calcAvgPace(runs[i]["time"], runs[i]["mi"])}<br>Avg. Pace
                </div>
            </div><br id="between-run">`
        }
    } else {
        document.getElementById("runs-container").innerHTML = "<br><h2 style=\"text-align: center; color: var(--blue);\"><i>You have not recorded any runs yet</i></h2>"
    }
}

function calcAvgPace (time, dist) {
    let inSecs = 0
    for (let i = 0; i < time.split(":").length; i++) {
        if (time.split(":")[i] != "") {
            inSecs += parseInt(time.split(":")[i]) * (60 ** (time.split(":").length-i-1))
        }
    }
    let avgPaceInSecs = inSecs/dist
    return ((avgPaceInSecs - (avgPaceInSecs % 60))/60).toString() + ":" + ((Math.round(avgPaceInSecs%60)).toString().length == 1 ? "0"+(Math.round(avgPaceInSecs%60)).toString() : (Math.round(avgPaceInSecs%60)).toString())
}

function formatDate (date) {
    return date.split("-")[1] + "/" + date.split("-")[2] + "/" + date.split("-")[0]
}

function formatTime (raw) {
    if (raw != "::") {
        let separated = raw.split(":")
        let result = ""
        if (separated[0] != "") {
            if (separated[0].length == 1) {
                result += "0" + separated[0]
            } else {
                result += separated[0]
            }
            result += ":"
        } else {
            result += "00:"
        }
        if (separated[1] != "") {
            if (separated[1].length == 1) {
                result += "0" + separated[1]
            } else {
                result += separated[1]
            }
            result += ":"
        } else {
            result += "00:"
        }
        if (separated[2] != "") {
            if (separated[2].length == 1) {
                result += "0" + separated[2]
            } else {
                result += separated[2]
            }
        } else {
            result += "00"
        }
        return result
    } else {
        return "-"
    }
}