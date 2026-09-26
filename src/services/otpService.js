import redis from "../config/redisConfig.js";
import resend from "../config/resendConfig.js";

const OTP_TTL = 60 * 10; // 10 minutes

const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

export const sendOTP = async (email) => {
    const otp = generateOTP();
    await redis.setex(`otp:${email}`, OTP_TTL, otp);

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your verification code",
        html: `
      <h2>AI Study Assistant</h2>
      <p>Your verification code is:</p>
      <h1 style="letter-spacing: 8px;">${otp}</h1>
      <p>This code expires in 10 minutes.</p>
    `,
    });
};

export const verifyOTP = async (email, otp) => {
    const stored = await redis.get(`otp:${email}`);
    if (!stored) throw new Error("OTP expired or not found");
    if (stored.trim() !== otp) throw new Error("Invalid OTP");
    await redis.del(`otp:${email}`);
};
