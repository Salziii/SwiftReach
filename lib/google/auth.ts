import { readFile } from "fs";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const credentials = {
 web: {
  client_id:
   "427582304524-sh0giji5giacs4osbh93rukckb6h678h.apps.googleusercontent.com",
  project_id: "swiftreach-website",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: "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",
  redirect_uris: [
   "http://localhost:3000/api/auth/callback/google",
   "https://swiftreach.de",
  ],
  javascript_origins: ["http://localhost:3000", "https://swiftreach.de"],
 },
};

const getOAuth2Client = () =>
 new Promise<OAuth2Client>((resolve, reject) => {
  const { client_secret, client_id, redirect_uris } = credentials.web

  const oAuth2Client = new google.auth.OAuth2(
   client_id,
   client_secret,
   redirect_uris[0]
  );

  readFile("./token.json", (err, token) => {
   if (!err) oAuth2Client.setCredentials(JSON.parse(token.toString()));
   else
    console.error("Could not set Credentials to oAuth2Client, due to " + err);

   return resolve(oAuth2Client);
  });
 });

export { getOAuth2Client };
