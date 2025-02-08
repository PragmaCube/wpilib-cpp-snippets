#include "commands/ElevatorPosition[ELEVATORPOSITION].h"

#include "Constants.h"

ElevatorPosition[ELEVATORPOSITION]::ElevatorPosition[ELEVATORPOSITION]([ELEVATORCLASSNAME] * iElevator) {
  mElevator = iElevator;
  AddRequirements(mElevator);
}

void ElevatorPosition[ELEVATORPOSITION]::Initialize() {
  mElevatorPID.SetSetPoint([POSITION]);
  mElevatorPID.SetP(ElevatorPosition[ELEVATORPOSITION]PIDConstants::kP);
  mElevatorPID.SetI(ElevatorPosition[ELEVATORPOSITION]PIDConstants::kI);
  mElevatorPID.SetD(ElevatorPosition[ELEVATORPOSITION]PIDConstants::kD);
}

void ElevatorPosition[ELEVATORPOSITION]::Execute() {
  mElevator->move(mElevatorPID.Calculate(mElevator.getPosition()));
}

void ElevatorPosition[ELEVATORPOSITION]::End(bool interrupted) {
  mElevator->stop();
}

bool ElevatorPosition[ELEVATORPOSITION]::IsFinished() {
  return mElevatorPID.AtSetPoint();
}