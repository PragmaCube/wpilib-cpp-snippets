#include "commands/GoToTag.h"

GoToTag::GoToTag([DRIVETRAINCLASSNAME] * iDriveTrain) {
  mDriveTrain = iDriveTrain;
  
  addRequirements(mDriveTrain);
}

void GoToTag::Initialize() {}

void GoToTag::Execute() {}

void GoToTag::End(bool interrupted) {}

bool GoToTag::IsFinished() {
  return false;
}