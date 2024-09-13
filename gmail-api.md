## Setting up Google Cloud Gmail API:

### How to Obtain `credentials.json`

1. **Create a Google Cloud Project:**

   - Go to the [Google Cloud Console](https://console.developers.google.com/).
   - Click on the project drop-down at the top and select "New Project".
   - Enter a name for your project and click "Create".

2. **Enable the Gmail API:**

   - Once your project is created, go to the [Gmail API Library](https://console.developers.google.com/apis/library/gmail.googleapis.com).
   - Click on "Enable" to enable the Gmail API for your project.

3. **Create OAuth 2.0 Credentials:**

   - Go to the [Credentials page](https://console.developers.google.com/apis/credentials).
   - Click on "Create Credentials" and select "OAuth 2.0 Client ID".
   - If prompted, configure the OAuth consent screen by providing necessary details like application name, support email, etc.
   - After configuring the consent screen, proceed to create the OAuth 2.0 Client ID.

4. **Configure OAuth Consent Screen:**

   - Fill out the necessary fields such as Application Name, Authorized domains, etc.
   - Add scopes if required (for Gmail API, the scope is usually `https://www.googleapis.com/auth/gmail.readonly`).
   - Save and continue to the next step.

5. **Create OAuth Client ID:**

   - Select "Desktop app" as the Application type.
   - Provide a name for the OAuth client ID (e.g., "Gmail API Client").
   - Click "Create".

6. **Download `credentials.json`:**
   - After creating the OAuth client ID, you will see a dialog with your client ID and client secret.
   - Click on "Download JSON" to download the `credentials.json` file.
   - Save this file in your project directory

### Generate `token.json`

1. **Ensure the `credentials.json` File Exists:**

   - Place the `credentials.json` file in the root of your project directory (where `package.json` is located).

1. **Run Authorization Script:**

   - Run the authorization script to generate the token.
     ```sh
     npm run authorize
     ```

You're now ready to use the `getMfaCode` function to retrieve MFA codes from your Gmail account.
