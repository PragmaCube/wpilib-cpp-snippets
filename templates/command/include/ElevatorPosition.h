#pragma once

#include <frc2/command/Command.h>
#include <frc2/command/CommandHelper.h>

#include <frc/controller/PIDController.h>

#include "subsystems/[ELEVATORCLASSNAME].h"

namespace ElevatorPosition[ELEVATORPOSITION]PIDConstants
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
class ElevatorPosition[ELEVATORPOSITION]
    : public frc2::CommandHelper<frc2::Command, ElevatorPosition[ELEVATORPOSITION]> {
 public:
  ElevatorPosition[ELEVATORPOSITION]([ELEVATORCLASSNAME] *);

  void Initialize() override;

  void Execute() override;

  void End(bool interrupted) override;

  bool IsFinished() override;

 private:
  [ELEVATORCLASSNAME] * mElevator;

  frc::PIDController mElevatorPID;
};