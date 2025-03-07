"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function activate(context) {
    const fastFrc = vscode.commands.registerCommand('wpilib-cpp-snippets.fastfrc', () => {
        const panel = vscode.window.createWebviewPanel('textWindow', 'Text Window', vscode.ViewColumn.One, {
            enableScripts: true
        });
        panel.webview.html = getWebviewContent();
        panel.webview.onDidReceiveMessage(message => {
            if (message.command === 'generateTextFile') {
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (workspaceFolders) {
                    let headerRootPath = workspaceFolders[0].uri.fsPath;
                    let sourceRootPath = workspaceFolders[0].uri.fsPath;
                    var headerContent = "";
                    var sourceContent = "";
                    let pathsFile = JSON.parse(fs.readFileSync(path.join(__dirname, "../templates", "paths.json"), "utf8"));
                    let componentsFile = JSON.parse(fs.readFileSync(path.join(__dirname, "../templates", "components.json"), "utf8"));
                    let methodsFile = JSON.parse(fs.readFileSync(path.join(__dirname, "../templates", "methods.json"), "utf8"));
                    if (message.filetype == "subsystem") {
                        headerContent = fs.readFileSync(path.join(__dirname, "../templates/subsystem", "subsystem.h"), "utf8");
                        sourceContent = fs.readFileSync(path.join(__dirname, "../templates/subsystem", "subsystem.cpp"), "utf8");
                        headerRootPath += "/src/main/include/subsystems/";
                        sourceRootPath += "/src/main/cpp/subsystems/";
                    }
                    else if (message.filetype == "command") {
                        headerContent = fs.readFileSync(path.join(__dirname, "../templates/command", "command.h"), "utf8");
                        sourceContent = fs.readFileSync(path.join(__dirname, "../templates/command", "command.cpp"), "utf8");
                        headerRootPath += "/src/main/include/commands/";
                        sourceRootPath += "/src/main/cpp/commands/";
                    }
                    let headerFilePath = "";
                    let sourceFilePath = "";
                    if (message.subsystemType == "drivetrain") {
                        let controllersText = "";
                        let includesText = [];
                        for (let i = 0; i < message.driveTraincontrollers.length; i++) {
                            if (message.driveTraincontrollers[i][0] == "none") {
                                continue;
                            }
                            else {
                                if (i != 0) {
                                    controllersText += "  ";
                                }
                                if (message.driveTraincontrollers[i][0] == "spark") {
                                    controllersText += componentsFile.MotorControllers[0];
                                    controllersText += componentsFile.Drivetrain.Positions[i];
                                    controllersText += "{" + message.driveTraincontrollers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[0]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[0]);
                                    }
                                }
                                else if (message.driveTraincontrollers[i][0] == "talon") {
                                    controllersText += componentsFile.MotorControllers[1];
                                    controllersText += componentsFile.Drivetrain.Positions[i];
                                    controllersText += "{" + message.driveTraincontrollers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[1]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[1]);
                                    }
                                }
                                else if (message.driveTraincontrollers[i][0] == "talonsrx") {
                                    controllersText += componentsFile.MotorControllers[2];
                                    controllersText += componentsFile.Drivetrain.Positions[i];
                                    controllersText += "{" + message.driveTraincontrollers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[2]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[2]);
                                    }
                                }
                                else if (message.driveTraincontrollers[i][0] == "victorspx") {
                                    controllersText += componentsFile.MotorControllers[3];
                                    controllersText += componentsFile.Drivetrain.Positions[i];
                                    controllersText += "{" + message.driveTraincontrollers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[3]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[3]);
                                    }
                                }
                                else if (message.driveTraincontrollers[i][0] == "sparkmax") {
                                    controllersText += componentsFile.MotorControllers[4];
                                    controllersText += componentsFile.Drivetrain.Positions[i];
                                    controllersText += "{" + message.driveTraincontrollers[i][1] + ", rev::spark::SparkLowLevel::MotorType::kBrushless};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[4]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[4]);
                                    }
                                }
                            }
                        }
                        if (message.drivetrain === "arcadedrive" || message.drivetrain === "tankdrive") {
                            includesText.push("\n" + pathsFile.MotorControllerGroup.path + "\n");
                            includesText.push(pathsFile.Drivetrain.path[0] + "\n");
                            controllersText += componentsFile.Drivetrain.DifferentialDrive;
                            headerContent = headerContent.replace("[COMPONENTS]", controllersText);
                            if (message.drivetrain == "arcadedrive") {
                                headerContent = headerContent.replace("[METHODS]", methodsFile.Subsystem.Drivetrain.DifferentialDrive.ArcadeDrive.header);
                                sourceContent = sourceContent.replace("[METHODS]", methodsFile.Subsystem.Drivetrain.DifferentialDrive.ArcadeDrive.source);
                            }
                            else if (message.drivetrain == "tankdrive") {
                                headerContent = headerContent.replace("[METHODS]", methodsFile.Subsystem.Drivetrain.DifferentialDrive.TankDrive.header);
                                sourceContent = sourceContent.replace("[METHODS]", methodsFile.Subsystem.Drivetrain.DifferentialDrive.TankDrive.source);
                            }
                        }
                        else if (message.drivetrain == "mecanumdrive") {
                            includesText.push(pathsFile.Drivetrain.path[1] + "\n");
                            controllersText += componentsFile.Drivetrain.MecanumDrive;
                            headerContent = headerContent.replace("[COMPONENTS]", controllersText);
                            headerContent = headerContent.replace("[METHODS]", methodsFile.Subsystem.Drivetrain.MecanumDrive.header);
                            sourceContent = sourceContent.replace("[METHODS]", methodsFile.Subsystem.Drivetrain.MecanumDrive.source);
                        }
                        else if (message.drivetrain == "swervedrive") {
                            headerContent = fs.readFileSync(path.join(__dirname, "../templates/subsystem/swerve", "SubDrivetrain.h"), "utf8");
                            sourceContent = fs.readFileSync(path.join(__dirname, "../templates/subsystem/swerve", "SubDrivetrain.cpp"), "utf8");
                            let swerveIDsText = "";
                            for (let i = 1; i < message.swerveOptions.length; i++) {
                                swerveIDsText += componentsFile.Drivetrain.SwerveIDs[i - 1][0] + message.swerveOptions[i][0] + ";\n  " + componentsFile.Drivetrain.SwerveIDs[i - 1][1] + message.swerveOptions[i][1] + ";\n  ";
                            }
                            headerContent = headerContent.replace("[CANID]", swerveIDsText);
                            headerContent = headerContent.replaceAll("[IMUCLASSNAME]", message.swerveOptions[0]);
                        }
                        headerContent = headerContent.replace("[INCLUDES]", includesText.join("\n"));
                        headerContent = headerContent.replaceAll("[CLASSNAME]", "SubDrivetrain");
                        sourceContent = sourceContent.replaceAll("[CLASSNAME]", "SubDrivetrain");
                        headerFilePath = path.join(headerRootPath, "SubDrivetrain.h");
                        sourceFilePath = path.join(sourceRootPath, "SubDrivetrain.cpp");
                    }
                    else if (message.subsystemType == "elevator") {
                        // Only SparkMax based elevator will be supported for the moment
                        let elevatorText = "";
                        let includesText = [];
                        let nbrOfControllers = 1 + (message.elevatorOptions[1][0] == "none" ? 0 : 1);
                        for (let i = 0; i < nbrOfControllers; i++) {
                            if (message.elevatorOptions[i][0] == "none") {
                                continue;
                            }
                            else {
                                if (i != 0) {
                                    elevatorText += "  ";
                                }
                                if (message.elevatorOptions[i][0] == "spark") {
                                    elevatorText += componentsFile.MotorControllers[0];
                                    elevatorText += componentsFile.Elevator.Controller[i + nbrOfControllers - 1];
                                    elevatorText += "{" + message.elevatorOptions[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[0]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[0]);
                                    }
                                }
                                else if (message.elevatorOptions[i][0] == "talon") {
                                    elevatorText += componentsFile.MotorControllers[1];
                                    elevatorText += componentsFile.Elevator.Controller[i + nbrOfControllers - 1];
                                    elevatorText += "{" + message.elevatorOptions[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[1]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[1]);
                                    }
                                }
                                else if (message.elevatorOptions[i][0] == "talonsrx") {
                                    elevatorText += componentsFile.MotorControllers[2];
                                    elevatorText += componentsFile.Elevator.Controller[i + nbrOfControllers - 1];
                                    elevatorText += "{" + message.elevatorOptions[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[2]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[2]);
                                    }
                                }
                                else if (message.elevatorOptions[i][0] == "victorspx") {
                                    elevatorText += componentsFile.MotorControllers[3];
                                    elevatorText += componentsFile.Elevator.Controller[i + nbrOfControllers - 1];
                                    elevatorText += "{" + message.elevatorOptions[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[3]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[3]);
                                    }
                                }
                                else if (message.elevatorOptions[i][0] == "sparkmax") {
                                    elevatorText += componentsFile.MotorControllers[4];
                                    elevatorText += componentsFile.Elevator.Controller[i + nbrOfControllers - 1];
                                    elevatorText += "{" + message.elevatorOptions[i][1] + ", rev::spark::SparkLowLevel::MotorType::kBrushless};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[4]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[4]);
                                    }
                                }
                            }
                        }
                        elevatorText += componentsFile.Elevator.GearRatio + message.elevatorOptions[2] + ";\n";
                        elevatorText += componentsFile.Elevator.AxisDiameter + message.elevatorOptions[3] + ";\n";
                        for (let i = 0; i < message.elevatorPositions.length; i++) {
                            elevatorText += componentsFile.Elevator.Position + String(i + 1) + " = " + String(message.elevatorPositions[i]) + ";\n";
                        }
                        headerContent = headerContent.replace("[INCLUDES]", includesText.join("\n"));
                        headerContent = headerContent.replace("[COMPONENTS]", elevatorText);
                        headerContent = headerContent.replace("[METHODS]", methodsFile.Subsystem.Elevator.header);
                        if (nbrOfControllers == 1) {
                            sourceContent = sourceContent.replace("[METHODS]", methodsFile.Subsystem.Elevator.source.OneController);
                        }
                        else {
                            sourceContent = sourceContent.replace("[METHODS]", methodsFile.Subsystem.Elevator.source.TwoControllers);
                        }
                        headerContent = headerContent.replaceAll("[CLASSNAME]", "SubElevator");
                        sourceContent = sourceContent.replaceAll("[CLASSNAME]", "SubElevator");
                        headerFilePath = path.join(headerRootPath, "SubElevator.h");
                        sourceFilePath = path.join(sourceRootPath, "SubElevator.cpp");
                        let constantsFile = "";
                        try {
                            constantsFile = fs.readFileSync(path.join(workspaceFolders[0].uri.fsPath + "/src/main/include", "Constants.h"), "utf8");
                            if (constantsFile.indexOf("Constant") != -1) {
                                let elevatorConstants = "namespace ElevatorConstants\n{\n";
                                for (let i = 0; i < message.elevatorPositions.length; i++) {
                                    elevatorConstants += `  constexpr double kElevatorPosition${i + 1} = ${message.elevatorPositions[i]};\n`;
                                }
                                elevatorConstants += "\n}\n\n";
                                fs.writeFileSync(path.join(workspaceFolders[0].uri.fsPath + "/src/main/include", "Constants.h"), constantsFile + elevatorConstants);
                            }
                        }
                        catch (err) {
                            vscode.window.showErrorMessage(`The file Constants.h does not exist !`);
                        }
                        if (message.elevatorPositionsToCommand) {
                            let files = [];
                            for (let i = 0; i < message.elevatorPositions.length; i++) {
                                files.push(`ElevatorPosition${i + 1}`);
                            }
                            createElevatorCommands(message.elevatorPositions, [workspaceFolders[0].uri.fsPath + "/src/main/include/commands", workspaceFolders[0].uri.fsPath + "/src/main/cpp/commands"], files);
                        }
                    }
                    else if (message.subsystemType == "intake") {
                        let controllersText = "constexpr bool kInverse = false;\n  constexpr double kSpeed = 0.5;\n";
                        let includesText = [];
                        let nbrOfControllers = 1 + (message.intakeControllers[1][0] == "none" ? 0 : 1);
                        for (let i = 0; i < nbrOfControllers; i++) {
                            if (message.intakeControllers[i][0] == "none") {
                                continue;
                            }
                            else {
                                if (i != 0) {
                                    controllersText += "  ";
                                }
                                if (message.intakeControllers[i][0] == "spark") {
                                    controllersText += componentsFile.MotorControllers[0];
                                    controllersText += componentsFile.Intake[i + nbrOfControllers - 1];
                                    controllersText += "{" + message.intakeControllers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[0]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[0]);
                                    }
                                }
                                else if (message.intakeControllers[i][0] == "talon") {
                                    controllersText += componentsFile.MotorControllers[1];
                                    controllersText += componentsFile.Intake[i + nbrOfControllers - 1];
                                    controllersText += "{" + message.intakeControllers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[1]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[1]);
                                    }
                                }
                                else if (message.intakeControllers[i][0] == "talonsrx") {
                                    controllersText += componentsFile.MotorControllers[2];
                                    controllersText += componentsFile.Intake[i + nbrOfControllers - 1];
                                    controllersText += "{" + message.intakeControllers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[2]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[2]);
                                    }
                                }
                                else if (message.intakeControllers[i][0] == "victorspx") {
                                    controllersText += componentsFile.MotorControllers[3];
                                    controllersText += componentsFile.Intake[i + nbrOfControllers - 1];
                                    controllersText += "{" + message.intakeControllers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[3]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[3]);
                                    }
                                }
                                else if (message.intakeControllers[i][0] == "sparkmax") {
                                    controllersText += componentsFile.MotorControllers[4];
                                    controllersText += componentsFile.Intake[i + nbrOfControllers - 1];
                                    controllersText += "{" + message.intakeControllers[i][1] + ", rev::spark::SparkLowLevel::MotorType::kBrushless};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[4]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[4]);
                                    }
                                }
                            }
                        }
                        headerContent = headerContent.replace("[INCLUDES]", includesText.join("\n"));
                        headerContent = headerContent.replace("[COMPONENTS]", controllersText);
                        headerContent = headerContent.replace("[METHODS]", methodsFile.Subsystem.Intake.header);
                        if (nbrOfControllers == 1) {
                            sourceContent = sourceContent.replace("[METHODS]", methodsFile.Subsystem.Intake.source.OneController);
                        }
                        else {
                            sourceContent = sourceContent.replace("[METHODS]", methodsFile.Subsystem.Intake.source.TwoControllers);
                        }
                        headerContent = headerContent.replaceAll("[CLASSNAME]", "SubIntake");
                        sourceContent = sourceContent.replaceAll("[CLASSNAME]", "SubIntake");
                        headerFilePath = path.join(headerRootPath, "SubIntake.h");
                        sourceFilePath = path.join(sourceRootPath, "SubIntake.cpp");
                    }
                    else if (message.subsystemType == "imu") {
                        headerContent = headerContent.replaceAll("[CLASSNAME]", "SubIMU");
                        sourceContent = sourceContent.replaceAll("[CLASSNAME]", "SubIMU");
                        headerContent = headerContent.replace("[COMPONENTS]", componentsFile.IMU[1]);
                        headerContent = headerContent.replace("[INCLUDES]", pathsFile.IMU.path[1] + "\n");
                        headerContent = headerContent.replace("[METHODS]", methodsFile.Subsystem.IMU.header);
                        sourceContent = sourceContent.replace("[METHODS]", methodsFile.Subsystem.IMU.source);
                        headerFilePath = path.join(headerRootPath, "SubIMU.h");
                        sourceFilePath = path.join(sourceRootPath, "SubIMU.cpp");
                    }
                    else if (message.commandType == "forward") {
                        headerContent = fs.readFileSync(path.join(__dirname, "../templates/command/include", "Forward.h"), "utf8");
                        sourceContent = fs.readFileSync(path.join(__dirname, "../templates/command/cpp", "Forward.cpp"), "utf8");
                        headerContent = headerContent.replaceAll("[DRIVETRAINCLASSNAME]", message.forwardRequirements[0]);
                        headerContent = headerContent.replace("[MAXITERATIONS]", String(message.forwardRequirements[1] / 0.02));
                        sourceContent = sourceContent.replaceAll("[DRIVETRAINCLASSNAME]", message.forwardRequirements[0]);
                        let drivetrainFile = "";
                        try {
                            drivetrainFile = fs.readFileSync(path.join(workspaceFolders[0].uri.fsPath + "/src/main/cpp/subsystems", message.forwardRequirements[0] + ".cpp"), "utf8");
                            if (drivetrainFile.search("ArcadeDrive") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.Forward.Execute.ArcadeDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.Forward.End.ArcadeDrive);
                            }
                            else if (drivetrainFile.search("TankDrive") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.Forward.Execute.TankDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.Forward.End.TankDrive);
                            }
                            else if (drivetrainFile.search("MecanumDrive") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.Forward.Execute.MecanumDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.Forward.End.MecanumDrive);
                            }
                            else if (drivetrainFile.search("Swerve") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.Forward.Execute.SwerveDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.Forward.End.SwerveDrive);
                            }
                            headerFilePath = path.join(headerRootPath, "Forward.h");
                            sourceFilePath = path.join(sourceRootPath, "Forward.cpp");
                        }
                        catch (err) {
                            vscode.window.showErrorMessage(`The file ${message.forwardRequirements[0]} does not exist !`);
                        }
                    }
                    else if (message.commandType == "intakein") {
                        headerContent = fs.readFileSync(path.join(__dirname, "../templates/command/include", "IntakeIn.h"), "utf8");
                        sourceContent = fs.readFileSync(path.join(__dirname, "../templates/command/cpp", "IntakeIn.cpp"), "utf8");
                        headerContent = headerContent.replaceAll("[INTAKECLASSNAME]", message.intakeInRequirements[0]);
                        headerContent = headerContent.replace("[MAXITERATIONS]", String(message.intakeInRequirements[1] / 0.02));
                        sourceContent = sourceContent.replaceAll("[INTAKECLASSNAME]", message.intakeInRequirements[0]);
                        headerFilePath = path.join(headerRootPath, "IntakeIn.h");
                        sourceFilePath = path.join(sourceRootPath, "IntakeIn.cpp");
                    }
                    else if (message.commandType == "intakeout") {
                        headerContent = fs.readFileSync(path.join(__dirname, "../templates/command/include", "IntakeOut.h"), "utf8");
                        sourceContent = fs.readFileSync(path.join(__dirname, "../templates/command/cpp", "IntakeOut.cpp"), "utf8");
                        headerContent = headerContent.replaceAll("[INTAKECLASSNAME]", message.intakeOutRequirements[0]);
                        headerContent = headerContent.replace("[MAXITERATIONS]", String(message.intakeOutRequirements[1] / 0.02));
                        sourceContent = sourceContent.replaceAll("[INTAKECLASSNAME]", message.intakeOutRequirements[0]);
                        headerFilePath = path.join(headerRootPath, "IntakeOut.h");
                        sourceFilePath = path.join(sourceRootPath, "IntakeOut.cpp");
                    }
                    else if (message.commandType == "turnleft") {
                        headerContent = fs.readFileSync(path.join(__dirname, "../templates/command/include", "TurnLeft.h"), "utf8");
                        sourceContent = fs.readFileSync(path.join(__dirname, "../templates/command/cpp", "TurnLeft.cpp"), "utf8");
                        headerContent = headerContent.replaceAll("[DRIVETRAINCLASSNAME]", message.turnLeftRequirements[0]);
                        headerContent = headerContent.replaceAll("[IMUCLASSNAME]", message.turnLeftRequirements[1]);
                        headerContent = headerContent.replace("[MAXANGLE]", String(message.turnLeftRequirements[2]));
                        sourceContent = sourceContent.replaceAll("[DRIVETRAINCLASSNAME]", message.turnLeftRequirements[0]);
                        sourceContent = sourceContent.replaceAll("[IMUCLASSNAME]", message.turnLeftRequirements[1]);
                        let drivetrainFile = "";
                        try {
                            drivetrainFile = fs.readFileSync(path.join(workspaceFolders[0].uri.fsPath + "/src/main/cpp/subsystems", message.turnLeftRequirements[0] + ".cpp"), "utf8");
                            if (drivetrainFile.search("ArcadeDrive") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.TurnLeft.Execute.ArcadeDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.TurnLeft.End.ArcadeDrive);
                            }
                            else if (drivetrainFile.search("TankDrive") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.TurnLeft.Execute.TankDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.TurnLeft.End.TankDrive);
                            }
                            else if (drivetrainFile.search("MecanumDrive") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.TurnLeft.Execute.MecanumDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.TurnLeft.End.MecanumDrive);
                            }
                            else if (drivetrainFile.search("Swerve") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.TurnLeft.Execute.SwerveDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.TurnLeft.End.SwerveDrive);
                            }
                            headerFilePath = path.join(headerRootPath, "TurnLeft.h");
                            sourceFilePath = path.join(sourceRootPath, "TurnLeft.cpp");
                        }
                        catch (err) {
                            vscode.window.showErrorMessage(`The file ${message.turnLeftRequirements[0]} does not exist !`);
                        }
                    }
                    else if (message.commandType == "turnright") {
                        headerContent = fs.readFileSync(path.join(__dirname, "../templates/command/include", "TurnRight.h"), "utf8");
                        sourceContent = fs.readFileSync(path.join(__dirname, "../templates/command/cpp", "TurnRight.cpp"), "utf8");
                        headerContent = headerContent.replaceAll("[DRIVETRAINCLASSNAME]", message.turnRightRequirements[0]);
                        headerContent = headerContent.replaceAll("[IMUCLASSNAME]", message.turnRightRequirements[1]);
                        headerContent = headerContent.replace("[MAXANGLE]", String(message.turnRightRequirements[2]));
                        sourceContent = sourceContent.replaceAll("[DRIVETRAINCLASSNAME]", message.turnRightRequirements[0]);
                        sourceContent = sourceContent.replaceAll("[IMUCLASSNAME]", message.turnRightRequirements[1]);
                        let drivetrainFile = "";
                        try {
                            drivetrainFile = fs.readFileSync(path.join(workspaceFolders[0].uri.fsPath + "/src/main/cpp/subsystems", message.turnRightRequirements[0] + ".cpp"), "utf8");
                            if (drivetrainFile.search("ArcadeDrive") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.TurnRight.Execute.ArcadeDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.TurnRight.End.ArcadeDrive);
                            }
                            else if (drivetrainFile.search("TankDrive") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.TurnRight.Execute.TankDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.TurnRight.End.TankDrive);
                            }
                            else if (drivetrainFile.search("MecanumDrive") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.TurnRight.Execute.MecanumDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.TurnRight.End.MecanumDrive);
                            }
                            else if (drivetrainFile.search("Swerve") != -1) {
                                sourceContent = sourceContent.replace("[EXECUTE]", methodsFile.Command.TurnRight.Execute.SwerveDrive);
                                sourceContent = sourceContent.replace("[END]", methodsFile.Command.TurnRight.End.SwerveDrive);
                            }
                            headerFilePath = path.join(headerRootPath, "TurnRight.h");
                            sourceFilePath = path.join(sourceRootPath, "TurnRight.cpp");
                        }
                        catch (err) {
                            vscode.window.showErrorMessage(`The file ${message.turnRightRequirements[0]} does not exist !`);
                        }
                    }
                    fs.writeFileSync(headerFilePath, headerContent);
                    fs.writeFileSync(sourceFilePath, sourceContent);
                }
                else {
                    vscode.window.showErrorMessage('No workspace folder open.');
                }
            }
        }, undefined, context.subscriptions);
    });
    context.subscriptions.push(fastFrc);
}
function getWebviewContent() {
    let javascript = fs.readFileSync(path.join(__dirname, "../src/page", "script.js"), "utf8");
    let html = fs.readFileSync(path.join(__dirname, "../src/page", "page.html"), "utf8");
    html = html.replace('<script src="script.js"></script>', `<script>${javascript}</script>`);
    return html;
}
function createElevatorCommands(positions, targetPaths, files) {
    let headerContent = "";
    let sourceContent = "";
    for (let i = 0; i < positions.length; i++) {
        headerContent = fs.readFileSync(path.join(__dirname, "../templates/command/include", "ElevatorPosition.h"), "utf8");
        sourceContent = fs.readFileSync(path.join(__dirname, "../templates/command/cpp", "ElevatorPosition.cpp"), "utf8");
        headerContent = headerContent.replaceAll("[ELEVATORPOSITION]", String(i + 1));
        headerContent = headerContent.replaceAll("[ELEVATORCLASSNAME]", files[0]);
        sourceContent = sourceContent.replaceAll("[ELEVATORPOSITION]", String(i + 1));
        sourceContent = sourceContent.replaceAll("[ELEVATORCLASSNAME]", files[0]);
        sourceContent = sourceContent.replaceAll("[POSITION]", `ElevatorConstants::kElevatorPosition${i + 1}`);
        fs.writeFileSync(path.join(targetPaths[0], `${files[i]}.h`), headerContent);
        fs.writeFileSync(path.join(targetPaths[1], `${files[i]}.cpp`), sourceContent);
    }
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map