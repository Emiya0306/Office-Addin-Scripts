// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as os from "os";
import * as path from "path";

// Default certificate names
export const certificateDirectory = path.join(os.homedir(), ".office-addin-dev-certs");
export const caCertificateFileName = "ca.crt";
export const localhostCertificateFileName = "localhost.crt";
export const localhostKeyFileName = "localhost.key";
export const caCertificatePath = () => path.join(certificateDirectory, caCertificateFileName);
export const localhostCertificatePath = () => path.join(certificateDirectory, localhostCertificateFileName);
export const localhostKeyPath = () => path.join(certificateDirectory, localhostKeyFileName);

// Default certificate details
export const certificateName = "Developer CA for Microsoft Office Add-ins";
export const getCertificateName = () => certificateName;
export const countryCode = "US";
export const daysUntilCertificateExpires = 30;
export const domain = ["127.0.0.1", "localhost"];
export const locality = "Redmond";
export const state = "WA";
