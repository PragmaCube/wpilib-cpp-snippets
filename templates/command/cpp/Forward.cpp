#include "commands/Forward.h"

Forward::Forward([DRIVETRAINCLASSNAME] * iDrivetrain) {
  mDrivetrain = iDrivetrain;
  AddRequirements(mDrivetrain);
}

void Forward::Initialize() {
  mIterations = 0;
}

void Forward::Execute() {
  [EXECUTE]
  
  mIterations++;
}

void Forward::End(bool interrupted) {
  [END]
}

bool Forward::IsFinished() {
  return (mIterations == kMaxIterations);
}