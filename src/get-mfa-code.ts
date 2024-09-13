import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN_PATH = path.join(__dirname, "../token.json");
const CREDENTIALS_PATH = path.join(__dirname, "../credentials.json");

interface Credentials {
  installed: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  };
}

async function loadCredentials(): Promise<OAuth2Client> {
  const credentials: Credentials = JSON.parse(
    fs.readFileSync(CREDENTIALS_PATH, "utf8")
  );
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
  oAuth2Client.setCredentials(token);

  return oAuth2Client;
}

export async function getMfaCode({
  senderEmail,
  subject,
}: {
  senderEmail: string;
  subject: string;
}): Promise<string | null> {
  const auth = await loadCredentials();
  const gmail = google.gmail({ version: "v1", auth });

  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 5 * 60;

  while (true) {
    const res = await gmail.users.messages.list({
      userId: "me",
      q: `from:${senderEmail} subject:${subject} after:${fiveMinutesAgo}`,
    });

    const messages = res.data.messages;
    if (messages && messages.length > 0) {
      for (const message of messages) {
        const msg = await gmail.users.messages.get({
          userId: "me",
          id: message.id!,
        });

        const snippet = msg.data.snippet || "";
        const codeMatch = snippet.match(/\b\d{6}\b/);
        if (codeMatch) {
          return codeMatch[0];
        }
      }
    }

    console.log("No messages found. Checking again in 10 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}
