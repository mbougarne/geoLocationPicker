# Native Development App

This Expo app is a local runtime playground for `geo-location-picker-native`. It uses a repository-local entry file so Metro resolves the app correctly in the pnpm workspace.

## Run

From the repository root:

```bash
pnpm install
pnpm --filter native-dev typecheck
pnpm --filter native-dev start
```

Then open the project in an iOS simulator, Android emulator, or Expo-compatible device. The app exercises `SelectCountry`, `SelectPhoneCode`, and `GeoLocationPicker`.
