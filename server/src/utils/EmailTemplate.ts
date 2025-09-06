export const otpTemplate = (name: string, otp: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
    <h2 style="color: #4CAF50;">Verify Your Account</h2>
    <p>Hi <b>${name}</b>,</p>
    <p>Thank you for registering. Please use the following OTP to verify your account:</p>
    <div style="font-size: 24px; font-weight: bold; color: #333; margin: 20px 0;">
      ${otp}
    </div>
    <p>This OTP will expire in <b>5 minutes</b>.</p>
    <p>If you did not request this, you can safely ignore this email.</p>
    <br/>
    <p style="font-size: 12px; color: gray;">&copy; ${new Date().getFullYear()} YourApp. All rights reserved.</p>
  </div>
`;
