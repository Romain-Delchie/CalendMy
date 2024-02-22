module.exports = {
  name: "CalendMy",
  slug: "CalendMy",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    package: "com.roomsrio.calendmy",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    eas: {
      projectId: "bd6ba29d-f61f-4663-a7ad-67ba9e87870e",
    },
  },
};
