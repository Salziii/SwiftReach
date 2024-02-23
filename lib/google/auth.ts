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

const token = {
 access_token:
  "ya29.a0AfB_byDxLuf02sg3T0JtxcS7vV3B1v2cjduVZzART1l5lCTaGaFfOKCkuFPi8ER1NdbZnZfRT7JTrcSDrDyG5Co9EA-pbsgsnAXU1D0LTNXJwUqvwSWNl3YkDCeakLa04a7V6_uSvcz1xXXjN5kqsSmvipLmprVOIYtZaCgYKAcISARISFQHGX2MiBBSZCoFPMxmkdZeDAKgWwA0171",
 refresh_token:
  "1//09jqsJoreQEibCgYIARAAGAkSNwF-L9Ir0HQCtswswvRx7L-CyhCPFX-41Gh6OII7HuX0euznPNCPtryGFLL4J9r50sWeaj-21rQ",
 scope: "https://www.googleapis.com/auth/calendar",
 token_type: "Bearer",
 expiry_date: 1706815297103,
};

const getOAuth2Client = () =>
 new Promise<OAuth2Client>((resolve, reject) => {
  const { client_secret, client_id, redirect_uris } = credentials.web;

  const oAuth2Client = new google.auth.OAuth2(
   client_id,
   client_secret,
   redirect_uris[0]
  );

  oAuth2Client.setCredentials(token);

  return resolve(oAuth2Client);
 });

export { getOAuth2Client };
