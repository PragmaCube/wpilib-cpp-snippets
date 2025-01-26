// TEMPLATE FOR THE HEADER FILE FOR A COMMAND

#pragma once

#include <frc2/command/Command.h>
#include <frc2/command/CommandHelper.h>

[INCLUDES]

class [CLASSNAME]
    : public frc2::CommandHelper<frc2::Command, Test> {
 public:
  [CLASSNAME]([REQUIREMENTS_INPUTS]);

  void Initialize() override;

  void Execute() override;

  void End(bool interrupted) override;

  bool IsFinished() override;

private:
    [COMPONENTS]
};
