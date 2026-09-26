# ProLeague Android App

A thin native Android wrapper around [proleague961.com](https://proleague961.com).
It's a Capacitor app whose WebView loads the live site directly, so the app
never needs an update when standings, schedules, or results change on the
website — only the app "shell" (icon, splash screen, permissions) is baked
into the APK.

Built with: Capacitor 8 (`@capacitor/android`), Android Gradle project,
GitHub Actions for CI builds (no local Android SDK required).

## Get the APK — no local setup needed

1. Push this folder to a new GitHub repository (see below).
2. GitHub Actions builds the APK automatically on every push to `main`
   (workflow: `.github/workflows/android-build.yml`), or trigger it manually
   from the **Actions** tab → "Build Android APK" → **Run workflow**.
3. When the run finishes (~3-5 minutes):
   - Download from the run's **Artifacts** section (`ProLeague-debug-apk`), or
   - Grab it from the **Releases** page — every push to `main` publishes a
     new release with the APK attached.
4. Transfer `app-debug.apk` to an Android phone and install it (enable
   "Install unknown apps" for whichever app you use to open the file).

## Push this to GitHub for the first time

```bash
cd proleague-android      # this folder
git init
git add .
git commit -m "Initial Android wrapper app for ProLeague"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then open the repo on GitHub → **Actions** tab. If Actions don't run
automatically, click **"I understand my workflows, go ahead and enable
them"** the first time.

## Local build (optional, needs Android Studio / SDK)

```bash
npm install
npx cap sync android
cd android
./gradlew assembleDebug
# APK at: android/app/build/outputs/apk/debug/app-debug.apk
```

## Changing what the app points to

Edit `capacitor.config.ts` → `server.url`. Currently set to
`https://proleague961.com`.

## Signed release build (for the Play Store)

The workflow currently produces a **debug** APK (fine for sideloading/testing,
not for the Play Store). To produce a signed release build later:

1. Generate a keystore: `keytool -genkeypair -v -keystore release.keystore -alias proleague -keyalg RSA -keysize 2048 -validity 10000`
2. Add `RELEASE_KEYSTORE_BASE64`, `RELEASE_KEYSTORE_PASSWORD`,
   `RELEASE_KEY_ALIAS`, `RELEASE_KEY_PASSWORD` as GitHub repo secrets.
3. Ask Claude (or see Capacitor's Android deployment docs) to wire up the
   `signingConfigs` block in `android/app/build.gradle` and a
   `assembleRelease` step in the workflow.

## App identity

- App name: **ProLeague**
- Package ID: `com.proleague961.app`
- Icon/splash: generated from the site's existing `public/icon-512.png`
