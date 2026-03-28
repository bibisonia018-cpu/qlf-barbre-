import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.qlfbarber.chezamir',
  appName: 'QLF Barber',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
