import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.proleague961.app',
  appName: 'ProLeague',
  webDir: 'www',
  server: {
    // The app is a thin native shell around the live site, so it always
    // shows current standings/scores/schedule without needing app updates.
    url: 'https://proleague961.com',
    cleartext: false
  },
  android: {
    allowMixedContent: false
  }
};

export default config;
