import { Resend } from "resend";
import { RESEND_API_KEY } from "./envConfig.js";
const resend = new Resend(RESEND_API_KEY);
export default resend;
