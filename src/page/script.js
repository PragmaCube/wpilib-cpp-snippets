function changeFileTypeForm() {
    const formSub = document.getElementById('subsystem-type');
    formSub.classList.toggle('hidden', !document.getElementById('subsystem').checked);

    const formCmd = document.getElementById('command-type');
    formCmd.classList.toggle('hidden', !document.getElementById('command').checked);
}

function changeSubsystemTypeForm() {
    const formDrivetrain = document.getElementById('drivetrain-type');
    formDrivetrain.classList.toggle('hidden', !document.getElementById('drivetrain').checked);
    const formElevator = document.getElementById('elevator-controllers');
    formElevator.classList.toggle('hidden', !document.getElementById('elevator').checked);
    const formIntake = document.getElementById('intake-controllers');
    formIntake.classList.toggle('hidden', !document.getElementById('intake').checked);
}

function toogleSwerve() {
    const form = document.getElementById('drivetrain-crontrollers');
    form.classList.toggle('hidden', document.getElementById('swerve').checked);
}

document.getElementById('choice').addEventListener('change', function() {
    const additionalComponents = document.getElementById('additional-components');
    additionalComponents.classList.toggle('hidden', !this.checked);
    const choiceText = document.getElementById('choice-text');
    choiceText.innerHTML = this.checked ? 'Yes' : 'No';
});

document.getElementById('motor-controller').addEventListener('change', function() {
    const motorOptions = document.getElementById('motor-controller-options');
    motorOptions.classList.toggle('hidden', !this.checked);

    if (!this.checked) {
        document.getElementById('spark').checked = false;
        document.getElementById('talon').checked = false;
        document.getElementById('talonsrx').checked = false;
        document.getElementById('victorspx').checked = false;
        document.getElementById('sparkmax').checked = false;
        document.getElementById('spark-div').classList.add('hidden');
        document.getElementById('talon-div').classList.add('hidden');
        document.getElementById('talonsrx-div').classList.add('hidden');
        document.getElementById('victorspx-div').classList.add('hidden');
        document.getElementById('sparkmax-div').classList.add('hidden');
    }
});

document.getElementById('spark').addEventListener('change', function() {
    document.getElementById('spark-div').classList.toggle('hidden', !this.checked);
});

document.getElementById('talon').addEventListener('change', function() {
    document.getElementById('talon-div').classList.toggle('hidden', !this.checked);
});

document.getElementById('talonsrx').addEventListener('change', function() {
    document.getElementById('talonsrx-div').classList.toggle('hidden', !this.checked);
});

document.getElementById('victorspx').addEventListener('change', function() {
    document.getElementById('victorspx-div').classList.toggle('hidden', !this.checked);
});

document.getElementById('sparkmax').addEventListener('change', function() {
    document.getElementById('sparkmax-div').classList.toggle('hidden', !this.checked);
});

document.getElementById('camera').addEventListener('change', function() {
    const cameraOptions = document.getElementById('camera-options');
    cameraOptions.classList.toggle('hidden', !this.checked);

    if (!this.checked) {
        document.getElementById('usb').checked = false;
        document.getElementById('axis').checked = false;
    }
});

var data = {command: "generateTextFile", filename: "none", filetype: "none", subsystemType:"none", drivetrain:"none", driveTraincontrollers:[["none", 0], ["none", 0], ["none", 0], ["none", 0]], elevatorControllers:[["none", 0], ["none", 0]], intakeControllers:[["none", 0], ["none", 0]], additionalComponents:[[["none", 0, 0], ["none", 0, 0], ["none", 0, 0], ["none", 0, 0], ["none", 0, 0]], ["none", "none"]], commandType:"none"};

const vscode = acquireVsCodeApi();

document.getElementById('generate-button').addEventListener('click', () => {
  document.getElementById('title').innerText = "Generating...";
  data.filename = document.getElementById('text-input').value;
  data.filetype = document.getElementById('subsystem').checked ? "subsystem" : document.getElementById('command').checked ? "command" : document.getElementById('blank').checked ? "blank" : "none";

    if (data.filetype == "subsystem") {
        data.subsystemType = document.getElementById('drivetrain').checked ? "drivetrain" : document.getElementById('elevator').checked ? "elevator" : document.getElementById('intake').checked ? "intake" : document.getElementById('imu').checked ? "imu" : "none";
        if (data.subsystemType == "drivetrain") {
            data.drivetrain = document.getElementById('arcadedrive').checked ? "arcadedrive" : document.getElementById('mecanumdrive').checked ? "mecanumdrive" : document.getElementById('swerve').checked ? "swervedrive" : document.getElementById('tankdrive').checked ? "tankdrive" : "none";
            if (data.drivetrain != "swervedrive") {
                data.driveTraincontrollers[0][0] = document.getElementById('bl-controller').value;
                data.driveTraincontrollers[0][1] = document.getElementById('bl-port').value;
                data.driveTraincontrollers[1][0] = document.getElementById('br-controller').value;
                data.driveTraincontrollers[1][1] = document.getElementById('br-port').value;
                data.driveTraincontrollers[2][0] = document.getElementById('fl-controller').value;
                data.driveTraincontrollers[2][1] = document.getElementById('fl-port').value;
                data.driveTraincontrollers[3][0] = document.getElementById('fr-controller').value;
                data.driveTraincontrollers[3][1] = document.getElementById('fr-port').value;
            }
        } 
        else if (data.subsystemType == "elevator") {
            data.elevatorControllers[0][0] = document.getElementById('elevator-controller1').value;
            data.elevatorControllers[0][1] = document.getElementById('elevator-controller-port1').value;
            data.elevatorControllers[1][0] = document.getElementById('elevator-controller2').value;
            data.elevatorControllers[1][1] = document.getElementById('elevator-controller-port2').value;
        }
         else if (data.subsystemType == "intake") {
            data.intakeControllers[0][0] = document.getElementById('intake-controller1').value;
            data.intakeControllers[0][1] = document.getElementById('intake-controller-port1').value;
            data.intakeControllers[1][0] = document.getElementById('intake-controller2').value;
            data.intakeControllers[1][1] = document.getElementById('intake-controller-port2').value;
        }
    } else if (data.filetype == "command") {
        data.commandType = document.getElementById('elevatorup').checked ? "elevatorup" : document.getElementById('elevatordown').checked ? "elevatordown" : document.getElementById('forward').checked ? "forward" : document.getElementById('gototag').checked ? "gototag" : document.getElementById('turnright').checked ? "turnright" : document.getElementById('turnleft').checked ? "turnleft" : "none";
    }

    data.additionalComponents[0][0][0] = "spark";
    data.additionalComponents[0][0][1] = document.getElementById('spark-nbr').value;
    data.additionalComponents[0][0][2] = document.getElementById('spark-port').value;
    data.additionalComponents[0][1][0] = "talon";
    data.additionalComponents[0][1][1] = document.getElementById('talon-nbr').value;
    data.additionalComponents[0][1][2] = document.getElementById('talon-port').value;
    data.additionalComponents[0][2][0] = "talonsrx";
    data.additionalComponents[0][2][1] = document.getElementById('talonsrx-nbr').value;
    data.additionalComponents[0][2][2] = document.getElementById('talonsrx-port').value;
    data.additionalComponents[0][3][0] = "victorspx";
    data.additionalComponents[0][3][1] = document.getElementById('victorspx-nbr').value;
    data.additionalComponents[0][3][2] = document.getElementById('victorspx-port').value;
    data.additionalComponents[0][4][0] = "sparkmax";
    data.additionalComponents[0][4][1] = document.getElementById('sparkmax-nbr').value;
    data.additionalComponents[0][4][2] = document.getElementById('sparkmax-port').value;

    data.additionalComponents[1][0] = document.getElementById('usb').checked ? "usb" : "none";
    data.additionalComponents[1][1] = document.getElementById('axis').checked ? "axis" : "none";
    
  vscode.postMessage(data);
});