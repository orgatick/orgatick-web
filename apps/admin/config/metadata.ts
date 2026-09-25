import type { Metadata } from "next";

const metadataConfig: Metadata = {
  metadataBase: new URL("https://orgatick.in"),
  title: {
    default: "Orgatick Admin",
    template: "%s | Orgatick Admin",
  },
  description: "Orgatick platform admin panel. Manage users, organizations, and platform operations.",
  applicationName: "Orgatick Admin",
  category: "Admin",
  creator: "Orgatick Team",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default metadataConfig;
