import { readFile } from "fs";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const getOAuth2Client = () => new Promise<OAuth2Client>((resolve, reject) => {
 readFile("google/credentials.json", (err, credentials) => {

  if (err) return reject(err)

  const { client_secret, client_id, redirect_uris } = JSON.parse(credentials.toString()).web;

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  readFile("google/token.json"!, (err, token) => {

   if (!err) oAuth2Client.setCredentials(JSON.parse(token.toString()));
   else console.error("Could not set Credentials to oAuth2Client, due to " + err)

   return resolve(oAuth2Client)

  })
 })
})

export { getOAuth2Client }