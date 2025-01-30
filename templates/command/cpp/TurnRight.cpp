#include "commands/TurnRight.h"

TurnRight::TurnRight([DRIVETRAINCLASSNAME] * iDrivetrain, [IMUCLASSNAME] * iIMU) {
  mDrivetrain = iDrivetrain;
  mIMU = iIMU;

  AddRequirements(mDrivetrain);
  AddRequirements(mIMU);
}

void TurnRight::Initialize() {
  mBaseAngle = mIMU.getAngleYaw();

  mRotationPID.SetP(TurnRightConstants::kP);
  mRotationPID.SetI(TurnRightConstants::kI);
  mRotationPID.SetD(TurnRightConstants::kD);
  mRotationPID.SetSetPoint(mBaseAngle + kTargetedAngle);
  mRotationPID.SetTolerance(0.5);
}

void TurnRight::Execute() {
  mOutput = mRotationPID.Calculate(mIMU.getAngleYaw());

  [EXECUTE]
}

void TurnRight::End(bool interrupted) {
  [END]
}

bool TurnRight::IsFinished() {
  return mRotationPID.AtSetPoint();
}