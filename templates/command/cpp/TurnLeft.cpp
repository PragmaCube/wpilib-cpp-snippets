#include "commands/TurnLeft.h"

TurnLeft::TurnLeft([DRIVETRAINCLASSNAME] * iDrivetrain, [IMUCLASSNAME] * iIMU) {
  mDrivetrain = iDrivetrain;
  mIMU = iIMU;

  AddRequirements(mDrivetrain);
  AddRequirements(mIMU);
}

void TurnLeft::Initialize() {
  mBaseAngle = mIMU.getAngleYaw();

  mRotationPID.SetP(TurnLeftConstants::kP);
  mRotationPID.SetI(TurnLeftConstants::kI);
  mRotationPID.SetD(TurnLeftConstants::kD);
  mRotationPID.SetSetPoint(mBaseAngle - kTargetedAngle);
  mRotationPID.SetTolerance(0.5);
}

void TurnLeft::Execute() {
  mOutput = mRotationPID.Calculate(mIMU.getAngleYaw());

  [EXECUTE]
}

void TurnLeft::End(bool interrupted) {
  [END]
}

bool TurnLeft::IsFinished() {
  return mRotationPID.AtSetPoint();
}