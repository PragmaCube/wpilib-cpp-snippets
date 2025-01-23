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
    console.log('Congratulations, your extension "wpilib-cpp-snippets" is now active!');
    const cmd1 = vscode.commands.registerCommand('wpilib-cpp-snippets.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from WPILIB C++ Snippets!');
    });
    const cmd2 = vscode.commands.registerCommand('wpilib-cpp-snippets.fastfrc', () => {
        const panel = vscode.window.createWebviewPanel('textWindow', // Identifies the type of the webview. Used internally
        'Text Window', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
            enableScripts: true
        } // Webview options. More on these later.
        );
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
                        headerContent = fs.readFileSync(path.join(__dirname, "../templates/subsystem", "subsystem.htxt"), "utf8");
                        sourceContent = fs.readFileSync(path.join(__dirname, "../templates/subsystem", "subsystem.cpptxt"), "utf8");
                        headerRootPath += "/src/main/include/subsystems/";
                        sourceRootPath += "/src/main/cpp/subsystems/";
                    }
                    else if (message.filetype == "command") {
                        headerContent = fs.readFileSync(path.join(__dirname, "../templates/command", "command.htxt"), "utf8");
                        sourceContent = fs.readFileSync(path.join(__dirname, "../templates/command", "command.cpptxt"), "utf8");
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
                                headerContent = headerContent.replace("[METHODS]", methodsFile.Drivetrain.DifferentialDrive.ArcadeDrive.header);
                                sourceContent = sourceContent.replace("[METHODS]", methodsFile.Drivetrain.DifferentialDrive.ArcadeDrive.source);
                            }
                            else if (message.drivetrain == "tankdrive") {
                                headerContent = headerContent.replace("[METHODS]", methodsFile.Drivetrain.DifferentialDrive.TankDrive.header);
                                sourceContent = sourceContent.replace("[METHODS]", methodsFile.Drivetrain.DifferentialDrive.TankDrive.source);
                            }
                        }
                        else if (message.drivetrain == "mecanumdrive") {
                            console.log("Coucou");
                            includesText.push(pathsFile.Drivetrain.path[1] + "\n");
                            controllersText += componentsFile.Drivetrain.MecanumDrive;
                            headerContent = headerContent.replace("[COMPONENTS]", controllersText);
                            headerContent = headerContent.replace("[METHODS]", methodsFile.Drivetrain.MecanumDrive.header);
                            sourceContent = sourceContent.replace("[METHODS]", methodsFile.Drivetrain.MecanumDrive.source);
                        }
                        else if (message.drivetrain == "swervedrive") {
                            // Not supported for the moment
                        }
                        headerContent = headerContent.replace("[INCLUDES]", includesText.join("\n"));
                        headerContent = headerContent.replaceAll("[CLASSNAME]", "SubDrivetrain");
                        sourceContent = sourceContent.replaceAll("[CLASSNAME]", "SubDrivetrain");
                        headerFilePath = path.join(headerRootPath, "SubDrivetrain.h");
                        sourceFilePath = path.join(sourceRootPath, "SubDrivetrain.cpp");
                    }
                    else if (message.subsystemType == "elevator") {
                        let controllersText = "";
                        let includesText = [];
                        let nbrOfControllers = 1 + message.elevatorControllers[1][0] == "none" ? 0 : 1;
                        for (let i = 0; i < message.elevatorControllers.length; i++) {
                            if (message.elevatorControllers[i][0] == "none") {
                                continue;
                            }
                            else {
                                if (i != 0) {
                                    controllersText += "  ";
                                }
                                if (message.elevatorControllers[i][0] == "spark") {
                                    controllersText += componentsFile.MotorControllers[0];
                                    controllersText += componentsFile.Elevator[i + nbrOfControllers - 1];
                                    controllersText += "{" + message.elevatorControllers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[0]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[0]);
                                    }
                                }
                                else if (message.elevatorControllers[i][0] == "talon") {
                                    controllersText += componentsFile.MotorControllers[1];
                                    controllersText += componentsFile.Elevator[i + nbrOfControllers - 1];
                                    controllersText += "{" + message.elevatorControllers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[1]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[1]);
                                    }
                                }
                                else if (message.elevatorControllers[i][0] == "talonsrx") {
                                    controllersText += componentsFile.MotorControllers[2];
                                    controllersText += componentsFile.Elevator[i + nbrOfControllers - 1];
                                    controllersText += "{" + message.elevatorControllers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[2]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[2]);
                                    }
                                }
                                else if (message.elevatorControllers[i][0] == "victorspx") {
                                    controllersText += componentsFile.MotorControllers[3];
                                    controllersText += componentsFile.Elevator[i + nbrOfControllers - 1];
                                    controllersText += "{" + message.elevatorControllers[i][1] + "};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[3]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[3]);
                                    }
                                }
                                else if (message.elevatorControllers[i][0] == "sparkmax") {
                                    controllersText += componentsFile.MotorControllers[4];
                                    controllersText += componentsFile.Elevator[i + nbrOfControllers - 1];
                                    controllersText += "{" + message.elevatorControllers[i][1] + ", rev::spark::SparkLowLevel::MotorType::kBrushless};\n";
                                    if (includesText.indexOf(pathsFile.MotorControllers.path[4]) === -1) {
                                        includesText.push(pathsFile.MotorControllers.path[4]);
                                    }
                                }
                            }
                        }
                        headerContent = headerContent.replace("[INCLUDES]", includesText.join("\n"));
                        headerContent = headerContent.replace("[COMPONENTS]", controllersText);
                        headerContent = headerContent.replaceAll("[CLASSNAME]", "SubElevator");
                        sourceContent = sourceContent.replaceAll("[CLASSNAME]", "SubElevator");
                        headerFilePath = path.join(headerRootPath, "SubElevator.h");
                        sourceFilePath = path.join(sourceRootPath, "SubElevator.cpp");
                    }
                    else if (message.subsystemType == "intake") {
                        let controllersText = "constexpr bool kInverse = false;\n  constexpr double kSpeed = 0.5;\n";
                        let includesText = [];
                        let nbrOfControllers = 1 + (message.intakeControllers[1][0] == "none" ? 0 : 1);
                        console.log(nbrOfControllers);
                        console.log(message.intakeControllers);
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
                        headerContent = headerContent.replace("[METHODS]", methodsFile.Intake.header);
                        if (nbrOfControllers == 1) {
                            sourceContent = sourceContent.replace("[METHODS]", methodsFile.Intake.source.OneController);
                        }
                        else {
                            sourceContent = sourceContent.replace("[METHODS]", methodsFile.Intake.source.TwoControllers);
                        }
                        headerContent = headerContent.replaceAll("[CLASSNAME]", "SubIntake");
                        sourceContent = sourceContent.replaceAll("[CLASSNAME]", "SubIntake");
                        headerFilePath = path.join(headerRootPath, "SubIntake.h");
                        sourceFilePath = path.join(sourceRootPath, "SubIntake.cpp");
                    }
                    else if (message.subsystemType == "imu") {
                        headerContent = headerContent.replaceAll("[CLASSNAME]", "SubIMU");
                        sourceContent = sourceContent.replaceAll("[CLASSNAME]", "SubIMU");
                        let imuText = "ctre::phoenix6::hardware::PigeonIMU2 mIMU{0};";
                        let includesText = pathsFile.IMU.path[1] + "\n";
                        headerContent = headerContent.replace("[COMPONENTS]", imuText);
                        headerContent = headerContent.replace("[INCLUDES]", includesText);
                        headerContent = headerContent.replace("[METHODS]", "void reset();\n  double getAngleYaw();\n  frc::Rotation2d getRotation2d();");
                        sourceContent = sourceContent.replace("[METHODS]", "void SubIMU::reset() {\n  mIMU.Reset();\n}\n\n" +
                            "double SubIMU::getAngleYaw() {\n  return mIMU.GetAngle();\n}\n\n" +
                            "frc::Rotation2d SubIMU::getRotation2d() {\n  return frc::Rotation2d();\n}");
                        headerFilePath = path.join(headerRootPath, "SubIMU.h");
                        sourceFilePath = path.join(sourceRootPath, "SubIMU.cpp");
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
    context.subscriptions.push(cmd1);
    context.subscriptions.push(cmd2);
}
function getWebviewContent() {
    let javascript = fs.readFileSync(path.join(__dirname, "../src/page", "script.js"), "utf8");
    let html = fs.readFileSync(path.join(__dirname, "../src/page", "page.html"), "utf8");
    html = html.replace('<script src="script.js"></script>', `<script>${javascript}</script>`);
    return html;
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map