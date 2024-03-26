import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
const webpush = require("web-push");
const port = 8443;

import router from "./routes";

const controlCorsIssue = (req: any, res: any, next: () => void) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace * with the appropriate origin if you want to restrict access
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}

const setVapidKeys = (req: any, res: any, next: () => void) => {
  const apikKeys = {
    publicKey:
      "BAPP3Q6SPrY0fDjzugje1gjYNJev7M1c4JeYNnTxIjy2lYX9oPKgDfujFG5skA1ph-kLDEZy3JGYD3lI6DqvS-0",
    privateKey: "0bUwmDofZWCdi2tu7CZIJi4ZPQAjevdHCgE6K4W1R5A",
  };

  webpush.setVapidDetails(
    "mailto: gautu.pinkyar@gmail.com",
    apikKeys.publicKey,
    apikKeys.privateKey
  );

  next();
};

export default express()
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(controlCorsIssue)
  .use(express.json())
  .use(express.raw())
  .use(express.text())
  .use(compression())
  .use(setVapidKeys)
  .use(router);
