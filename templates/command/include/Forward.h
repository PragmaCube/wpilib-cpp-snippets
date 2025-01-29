#pragma once

#include <frc2/command/Command.h>
#include <frc2/command/CommandHelper.h>

#include "subsystems/[DRIVETRAINCLASSNAME].h"

class Forward
    : public frc2::CommandHelper<frc2::Command, Forward> {
 public:
  Forward([DRIVETRAINCLASSNAME] *);

  void Initialize() override;

  void Execute() override;

  void End(bool interrupted) override;

  bool IsFinished() override;

 private:
  [DRIVETRAINCLASSNAME] * mDrivetrain;

  constexpr int kMaxIterations = [MAXITERATIONS];
  int mIterations;
};