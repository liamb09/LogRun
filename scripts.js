function enableOtherTextbox () {
    if (document.getElementById("run-type-selector").value == "other") {
        document.getElementById("record-run-other-textbox").removeAttribute("disabled")
    } else {
        document.getElementById("record-run-other-textbox").setAttribute("disabled", true);
    }
}

function disableColorInput () {
    if (document.getElementById("record-run-color-checkbox").checked) {
        document.getElementById("record-run-color-input").disabled = false
    } else {
        document.getElementById("record-run-color-input").disabled = true
    }
}