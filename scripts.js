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