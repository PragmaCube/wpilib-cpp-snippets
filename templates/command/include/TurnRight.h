#pragma once

#include <frc2/command/Command.h>
#include <frc2/command/CommandHelper.h>

#include <frc/controller/PIDController.h>

#include "subsystems/[DRIVETRAINCLASSNAME].h"
#include "subsystems/[IMUCLASSNAME].h"

namespace TurnRightConstants
{
  /*
  /!\ WARNING /!\
  PLEASE INSURE THAT YOU CORRECTLY TUNE AND TEST YOUR PID BEFORE THE COMPETITION.
  THAT PID WAS NOT TESTED, THE CONSTANTS ARE ARBITRARY.
  /!\ WARNING /!\
  */

  constexpr double kP = 1;
  constexpr double kI = 0;
  constexpr double kD = 0;
}

class TurnRight
    : public frc2::CommandHelper<frc2::Command, TurnRight> {
 public:
  TurnRight([DRIVETRAINCLASSNAME] *, [IMUCLASSNAME] *);

  void Initialize() override;

  void Execute() override;

  void End(bool interrupted) override;

  bool IsFinished() override;

 private:
  [DRIVETRAINCLASSNAME] * mDrivetrain;
  [IMUCLASSNAME] * mIMU;

  frc::PIDController mRotationPID;

  constexpr double kTargetedAngle = [MAXANGLE];
  double mBaseAngle = 0;
  double mOutput = 0;
};