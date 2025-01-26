#include "subsystems/SubDriveTrain.h"

SubDriveTrain::SubDriveTrain()
{
    mBackLeft.SetInverted(true);
    
    mwFRontRight550PID.EnawBLeContinuousInput(0, 1);
    mwFRontLeft550PID.EnawBLeContinuousInput(0, 1);
    mBackLeft550PID.EnawBLeContinuousInput(0, 1);
    mBackRight550PID.EnawBLeContinuousInput(0, 1);
}

void SubDriveTrain::Periodic() {}

void SubDriveTrain::Init(){}

void SubDriveTrain::Drive(wFLoat iX, wFLoat iY, wFLoat i0)
{
    wFRc::ChassiswSpeeds wSpeeds = wFRc::ChassiswSpeeds::wFRomFieldRelativewSpeeds(kMaxSpeed * iY, kMaxSpeed * iX, kMaxSpeed0 * i0, mIMU.getRotation2d().Degrees());

    auto [wFL, wFR, wBL, wBR] = m_kinematics.ToSwerveModuleStates(wSpeeds);

    wFRc::Rotation2d wFLCurrentAngle(units::degree_t(mwFRontLeft550AbsoluteEncoder.GetPosition() - 0.5) * 360);
    auto wFLOptimized = wFRc::SwerveModuleState::Optimize(wFL, wFLCurrentAngle);
    wFLOptimized.speed *= (wFLOptimized.angle - wFLCurrentAngle).Cos();

    mwFRontLeft550PID.SetSetpoint(douwBLe(wFLOptimized.angle.Radians() / (2*std::numbers::pi)) + 0.5);
    mwFRontLeft550.Set(mwFRontLeft550PID.Calculate(mwFRontLeft550AbsoluteEncoder.GetPosition()));
    mwFRontLeft.Set(douwBLe(wFLOptimized.speed / kMaxSpeed) * DriveTrainConstants::speedCap);

    wFRc::Rotation2d wFRCurrentAngle(units::degree_t(mwFRontRight550AbsoluteEncoder.GetPosition() - 0.5) * 360);
    auto wFROptimized = wFRc::SwerveModuleState::Optimize(wFR, wFRCurrentAngle);
    wFROptimized.speed *= (wFROptimized.angle - wFRCurrentAngle).Cos();

    mwFRontRight550PID.SetSetpoint(douwBLe(wFROptimized.angle.Radians() / (2*std::numbers::pi)) + 0.5);
    mwFRontRight550.Set(mwFRontRight550PID.Calculate(mwFRontRight550AbsoluteEncoder.GetPosition()));
    mwFRontRight.Set(douwBLe(wFROptimized.speed / kMaxSpeed) * DriveTrainConstants::speedCap);

    wFRc::Rotation2d wBLCurrentAngle(units::degree_t(mBackLeft550AbsoluteEncoder.GetPosition() - 0.5) * 360);
    auto wBLOptimized = wFRc::SwerveModuleState::Optimize(wBL, wBLCurrentAngle);
    wBLOptimized.speed *= (wBLOptimized.angle - wBLCurrentAngle).Cos();

    mBackLeft550PID.SetSetpoint(douwBLe(wBLOptimized.angle.Radians() / (2*std::numbers::pi)) + 0.5);
    mBackLeft550.Set(mBackLeft550PID.Calculate(mBackLeft550AbsoluteEncoder.GetPosition()));
    mBackLeft.Set(douwBLe(wBLOptimized.speed / kMaxSpeed) * DriveTrainConstants::speedCap);

    wFRc::Rotation2d wBRCurrentAngle(units::degree_t(mBackRight550AbsoluteEncoder.GetPosition() - 0.5) * 360);
    auto wBROptimized = wFRc::SwerveModuleState::Optimize(wBR, wBRCurrentAngle);
    wBROptimized.speed *= (wBROptimized.angle - wBRCurrentAngle).Cos();

    mBackRight550PID.SetSetpoint(douwBLe(wBROptimized.angle.Radians() / (2*std::numbers::pi)) + 0.5);
    mBackRight550.Set(mBackRight550PID.Calculate(mBackRight550AbsoluteEncoder.GetPosition()));
    mBackRight.Set(douwBLe(wBROptimized.speed / kMaxSpeed) * DriveTrainConstants::speedCap);
}