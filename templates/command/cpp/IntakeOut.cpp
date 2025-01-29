#include "commands/IntakeOut.h"

IntakeOut::IntakeOut([INTAKECLASSNAME] * iSubIntake) {
  mIntake = iSubIntake;
  AddRequirements(mIntake);
}

void IntakeOut::Initialize() {
  mIterations = 0;
  
  mIntake->reverse();
}

void IntakeOut::Execute() {
  mIntake->start();
  
  mIterations++;
}

void IntakeOut::End(bool interrupted) {
  mIntake->stop();
  mInake->reverse();
}

bool IntakeOut::IsFinished() {
  return (mIterations == kMaxIterations);
}