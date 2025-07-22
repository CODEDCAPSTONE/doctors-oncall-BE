import express, { Request, Response } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!
);

router.get("/google", (req: Request, res: Response) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });

  res.redirect(url);
});

router.get("/google/callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) return res.status(400).send("No code provided");

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.json(tokens); // Here you can save refresh_token to DB or env
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting tokens");
  }
});

export default router;