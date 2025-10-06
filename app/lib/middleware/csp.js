import { NextResponse } from "next/server";
//import crypto from "crypto";

export function buildCSP() {
  const dev = process.env.NODE_ENV !== "production";
  const nonce = Buffer.from(globalThis.crypto.randomUUID()).toString("base64");

  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' ${dev ? `'unsafe-eval'` : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
    media-src 'self';
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self';
    frame-src 'self' blob:;
    ${dev ? "" : "upgrade-insecure-requests;"}
    report-uri /csp-report;
  `.replace(/\s{2,}/g, " ").trim();

  return { nonce, csp };
}

export function createResponseWithCSP(req, nonce, cspValue) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspValue);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", cspValue);
  return response;
}