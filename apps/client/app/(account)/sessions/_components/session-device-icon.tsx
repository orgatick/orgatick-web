import type { SessionResponse } from "@orgatick/contracts";
import {
  IconBrandAndroid,
  IconBrandApple,
  IconBrandChrome,
  IconBrandEdge,
  IconBrandFirefox,
  IconBrandOpera,
  IconBrandSafari,
  IconBrandUbuntu,
  IconBrandWindows,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconTerminal2,
  IconWorld,
} from "@tabler/icons-react";
import { parseSessionMeta } from "./session-utils";

interface SessionDeviceIconProps {
  session: SessionResponse;
  className?: string;
}

export function SessionDeviceIcon({ session, className = "size-5" }: SessionDeviceIconProps) {
  const meta = parseSessionMeta(session);
  const browserLower = meta.browserName.toLowerCase();

  if (meta.deviceType === "client") {
    return <IconTerminal2 className={className} />;
  }

  if (browserLower.includes("chrome")) {
    return <IconBrandChrome className={className} />;
  }
  if (browserLower.includes("firefox")) {
    return <IconBrandFirefox className={className} />;
  }
  if (browserLower.includes("safari")) {
    return <IconBrandSafari className={className} />;
  }
  if (browserLower.includes("edge")) {
    return <IconBrandEdge className={className} />;
  }
  if (browserLower.includes("opera")) {
    return <IconBrandOpera className={className} />;
  }

  if (meta.deviceType === "mobile") {
    return <IconDeviceMobile className={className} />;
  }
  if (meta.deviceType === "tablet") {
    return <IconDeviceTablet className={className} />;
  }

  return <IconDeviceDesktop className={className} />;
}

export function SessionPlatformIcon({ session, className = "size-3.5" }: SessionDeviceIconProps) {
  const meta = parseSessionMeta(session);
  const platformLower = meta.platformName.toLowerCase();

  if (platformLower.includes("mac") || platformLower.includes("ios") || platformLower.includes("apple")) {
    return <IconBrandApple className={className} />;
  }
  if (platformLower.includes("win")) {
    return <IconBrandWindows className={className} />;
  }
  if (platformLower.includes("linux") || platformLower.includes("ubuntu")) {
    return <IconBrandUbuntu className={className} />;
  }
  if (platformLower.includes("android")) {
    return <IconBrandAndroid className={className} />;
  }

  return <IconWorld className={className} />;
}
