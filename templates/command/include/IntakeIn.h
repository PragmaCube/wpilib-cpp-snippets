#pragma once

#include <frc2/command/Command.h>
#include <frc2/command/CommandHelper.h>

#include "subsystems/[INTAKECLASSNAME].h"

class IntakeIn
    : public frc2::CommandHelper<frc2::Command, IntakeIn> {
 public:
  IntakeIn([INTAKECLASSNAME] *);

  void Initialize() override;

  void Execute() override;

  void End(bool interrupted) override;

  bool IsFinished() override;

 private:
  [INTAKECLASSNAME] * mIntake;

  constexpr kMaxIterations = [MAXITERATIONS];
  int mIterations;
};