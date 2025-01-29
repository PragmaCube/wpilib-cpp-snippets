#pragma once

#include <frc2/command/SubsystemBase.h>
#include <frc/geometry/Translation2d.h>
#include <frc/kinematics/SwerveDriveKinematics.h>
#include <rev/SparkMax.h>
#include <rev/RelativeEncoder.h>
#include <rev/AbsoluteEncoder.h>
#include <tuple>
#include <array>
#include <vector>
#include <frc/controller/PIDController.h>
#include "subsystems/[IMUCLASSNAME].h"

#include "Constants.h"

namespace DrivetrainConstants
{
  [CANID]
  

  /*
  /!\ WARNING /!\
  PLEASE INSURE THAT YOU CORRECTLY TUNE AND TEST YOUR PID BEFORE THE COMPETITION.
  /!\ WARNING /!\
  */
  constexpr double kP = 4.0;
  constexpr double kI = 0.1;
  constexpr double kD = 0.05;
} 


class SubDriveTrain : public frc2::SubsystemBase {
 public:
  SubDriveTrain();

  void Periodic() override;

  void drive(float iX, float iY, float i0);

  //void init();

 private:
  frc::Translation2d mFrontLeftLocation{0.355_m, 0.355_m};
  frc::Translation2d mFrontRightLocation{0.355_m, -0.355_m};
  frc::Translation2d mBackLeftLocation{-0.355_m, 0.355_m};
  frc::Translation2d mBackRightLocation{-0.355_m, -0.355_m};

  frc::SwerveDriveKinematics<4> m_kinematics{mFrontLeftLocation, mFrontRightLocation, mBackLeftLocation, mBackRightLocation};
  
  rev::spark::SparkMax mFrontLeft{DrivetrainConstants::kFrontLeftMotorID, rev::spark::SparkLowLevel::MotorType::kBrushless};
  rev::spark::SparkMax mFrontLeft550{DrivetrainConstants::kFrontLeftMotor550ID, rev::spark::SparkLowLevel::MotorType::kBrushless};

  rev::spark::SparkRelativeEncoder mFrontLeft550Encoder = mFrontLeft550.GetEncoder();
  rev::spark::SparkAbsoluteEncoder  mFrontLeft550AbsoluteEncoder = mFrontLeft550.GetAbsoluteEncoder();
  frc::PIDController mFrontLeft550PID {DrivetrainConstants::kP , DrivetrainConstants::kI , DrivetrainConstants::kD};

  rev::spark::SparkMax mFrontRight{DrivetrainConstants::kFrontRighttMotorID, rev::spark::SparkLowLevel::MotorType::kBrushless};
  rev::spark::SparkMax mFrontRight550{DrivetrainConstants::kFrontRightMotor550ID, rev::spark::SparkLowLevel::MotorType::kBrushless};

  rev::spark::SparkRelativeEncoder mFrontRight550Encoder = mFrontRight550.GetEncoder();
  rev::spark::SparkAbsoluteEncoder  mFrontRight550AbsoluteEncoder = mFrontRight550.GetAbsoluteEncoder();
  frc::PIDController mFrontRight550PID {DrivetrainConstants::kP , DrivetrainConstants::kI , DrivetrainConstants::kD};

  rev::spark::SparkMax mBackLeft{DrivetrainConstants::kBackLeftMotorID, rev::spark::SparkLowLevel::MotorType::kBrushless};
  rev::spark::SparkMax mBackLeft550{DrivetrainConstants::kBackLeftMotor550ID, rev::spark::SparkLowLevel::MotorType::kBrushless};

  rev::spark::SparkRelativeEncoder mBackLeft550Encoder = mBackLeft550.GetEncoder();
  rev::spark::SparkAbsoluteEncoder  mBackLeft550AbsoluteEncoder = mBackLeft550.GetAbsoluteEncoder();
  frc::PIDController mBackLeft550PID {DrivetrainConstants::kP , DrivetrainConstants::kI , DrivetrainConstants::kD};

  rev::spark::SparkMax mBackRight{DrivetrainConstants::kBackRightMotorID, rev::spark::SparkLowLevel::MotorType::kBrushless};
  rev::spark::SparkMax mBackRight550{DrivetrainConstants::kBackRightMotor550ID, rev::spark::SparkLowLevel::MotorType::kBrushless};

  rev::spark::SparkRelativeEncoder mBackRight550Encoder = mBackRight550.GetEncoder();
  rev::spark::SparkAbsoluteEncoder  mBackRight550AbsoluteEncoder = mBackRight550.GetAbsoluteEncoder();
  frc::PIDController mBackRight550PID {DrivetrainConstants::kP , DrivetrainConstants::kI , DrivetrainConstants::kD};
  
  constexpr units::meters_per_second_t kMaxSpeed = 1_mps;
  constexpr units::radians_per_second_t kMaxSpeed0 = units::radians_per_second_t(std::numbers::pi);

  [IMUCLASSNAME] mIMU;
};