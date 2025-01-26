#pragma once

#include <frc2/command/Command.h>
#include <frc2/command/CommandHelper.h>

#include "subsystems/[DRIVETRAINCLASSNAME].h"

class GoToTag
    : public frc2::CommandHelper<frc2::Command, GoToTag> {
 public:
  GoToTag([DRIVETRAINCLASSNAME] * iDriveTrain);

  void Initialize() override;

  void Execute() override;

  void End(bool interrupted) override;

  bool IsFinished() override;

private:
  [DRIVETRAINCLASSNAME] * mDriveTrain;
};