import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import * as readline from "readline";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const TOKEN_PATH = path.join(__dirname, "../token.json");
const CREDENTIALS_PATH = path.join(__dirname, "../credentials.json");

interface Credentials {
  installed: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  };
}

function authorize(credentials: Credentials): Promise<OAuth2Client> {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  return new Promise((resolve, reject) => {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        return getNewToken(oAuth2Client).then(resolve).catch(reject);
      }
      oAuth2Client.setCredentials(JSON.parse(token.toString()));
      resolve(oAuth2Client);
    });
  });
}

function getNewToken(oAuth2Client: OAuth2Client): Promise<OAuth2Client> {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject("Error retrieving access token");
        oAuth2Client.setCredentials(token!);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        resolve(oAuth2Client);
      });
    });
  });
}

async function main() {
  const credentials: Credentials = JSON.parse(
    fs.readFileSync(CREDENTIALS_PATH, "utf8")
  );
  await authorize(credentials);
  console.log("Authorization successful.");
}

main().catch(console.error);
