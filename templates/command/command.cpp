// TEMPLATE FOR THE CPP FILE FOR A COMMAND

#include "commands/[CLASSNAME].h"

[CLASSNAME]::[CLASSNAME]([REQUIREMENTS_INPUTS]) {
  [REQUIREMENTS]
}

void [CLASSNAME]::Initialize() {}

void [CLASSNAME]::Execute()
{
    [EXECUTE]
}

void [CLASSNAME]::End(bool interrupted)
{
    [END]
}

bool [CLASSNAME]::IsFinished() {
  [ISFINISHED]
}