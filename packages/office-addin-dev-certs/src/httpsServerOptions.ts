// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as fs from "fs";
import * as defaults from "./defaults";
import { ensureCertificatesAreInstalled } from "./install";

/* global Buffer */

interface IHttpsServerOptions {
  ca: Buffer;
  cert: Buffer;
  key: Buffer;
}

interface Args {
  daysUntilCertificateExpires?: number;
  domain?: string;
  certificateName?: string;
  certificateDirectory?: string;
}
export async function getHttpsServerOptions(args: Args): Promise<IHttpsServerOptions> {
  const { daysUntilCertificateExpires, domain, certificateName, certificateDirectory } = args || {};

  if (domain) defaults.domain.push(domain);
  // @ts-ignore
  if (certificateName) defaults.certificateName = certificateName;
  // @ts-ignore
  if (daysUntilCertificateExpires) defaults.daysUntilCertificateExpires = daysUntilCertificateExpires;
  // @ts-ignore
  if (certificateDirectory) defaults.certificateDirectory = certificateDirectory;

  await ensureCertificatesAreInstalled();

  const httpsServerOptions = {} as IHttpsServerOptions;
  try {
    httpsServerOptions.ca = fs.readFileSync(defaults.caCertificatePath());
  } catch (err) {
    throw new Error(`Unable to read the CA certificate file.\n${err}`);
  }

  try {
    httpsServerOptions.cert = fs.readFileSync(defaults.localhostCertificatePath());
  } catch (err) {
    throw new Error(`Unable to read the certificate file.\n${err}`);
  }

  try {
    httpsServerOptions.key = fs.readFileSync(defaults.localhostKeyPath());
  } catch (err) {
    throw new Error(`Unable to read the certificate key.\n${err}`);
  }

  return httpsServerOptions;
}
