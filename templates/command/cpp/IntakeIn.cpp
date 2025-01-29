#include "commands/IntakeIn.h"

IntakeIn::IntakeIn([INTAKECLASSNAME] * iSubIntake) {
  mIntake = iSubIntake;
  AddRequirements(mIntake);
}

void IntakeIn::Initialize() {
  mIterations = 0;
}

void IntakeIn::Execute() {
  mIntake->start();
  
  mIterations++;
}

void IntakeIn::End(bool interrupted) {
  mIntake->stop();
}

bool IntakeIn::IsFinished() {
  return (mIterations == kMaxIterations);
}