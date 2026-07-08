# SiteReportKit Billing Release Checklist

Last updated: 2026-07-07

## Product Contract

- Free plan: up to 3 local reports.
- Free exports: generated with SiteReportKit Free branding.
- Pro product ID: `sitereportkit_pro`.
- Pro price target: USD 49.99 one-time purchase.
- Pro unlocks: unlimited local reports, custom branded PDF/CSV exports, and project archive imports beyond the free report limit.
- Cloud sync, team workspaces, and accounts are not part of this local Pro purchase.
- Current MVP entitlement is local and store-restorable. It unlocks on successful purchase/restore, but it does not yet run developer-side receipt validation or automatically downgrade an already-unlocked device after refund/revocation.

## iOS App Store

Create a non-consumable in-app purchase in App Store Connect:

- Reference name: `SiteReportKit Pro`
- Product ID: `sitereportkit_pro`
- Display name: `SiteReportKit Pro`
- Description: `Unlock unlimited local reports and custom branded exports.`
- Price: USD 49.99 or matching price tier
- Family Sharing: decide before submission and keep the choice consistent in review notes
- Review screenshot: capture the in-app `Unlock Pro` dialog

Before App Review:

- Verify the app is free to download.
- Verify the project tools menu shows `Unlock Pro` for free users and `Pro active` for unlocked users.
- Verify the limit dialog appears after 3 local reports.
- Verify `Restore` is visible in the Pro dialog.
- Verify sandbox purchase, cancel, restore, and interrupted-purchase behavior.
- Verify refund/revocation states in the store sandbox and document the expected customer-support path; automatic local downgrade requires a later receipt-validation or server entitlement strategy.

## StoreKit Local Testing

Use Xcode to create and maintain the StoreKit configuration file instead of hand-editing JSON:

1. Open `ios/Runner.xcworkspace`.
2. Add a StoreKit Configuration File to the Runner project.
3. Add a non-consumable product with product ID `sitereportkit_pro`.
4. Set the local price to USD 49.99.
5. Edit the Runner scheme.
6. Under Run > Options, select the StoreKit configuration file.
7. Test buy, cancel, restore, and interrupted purchase states in the simulator.
8. Exercise refunded/revoked transaction states in StoreKit, then confirm the current app does not promise automatic downgrade without receipt validation.

The repository intentionally does not hand-author a `.storekit` JSON file because Xcode owns the format and can sync/validate it against App Store Connect.

## Google Play

Create a one-time product in Play Console:

- Product ID: `sitereportkit_pro`
- Name: `SiteReportKit Pro`
- Description: `Unlock unlimited local reports and custom branded exports.`
- Price: USD 49.99 or local equivalent
- Status: Active before release to the testing track

Before Play review:

- Add license test accounts.
- Release to an internal or closed testing track.
- Verify purchase, cancel, restore/query existing purchase, and interrupted-purchase behavior.
- Verify refund/revocation states in Play testing and document the expected customer-support path; automatic local downgrade requires a later receipt-validation or server entitlement strategy.
- Confirm the merged release manifest includes the billing permission from the Billing plugin.
- Confirm purchases are acknowledged by the `in_app_purchase` plugin.

Android release build steps:

1. Update `version` in `pubspec.yaml` so Play receives the next `versionCode` and `versionName`.
2. Copy `android/key.properties.example` to `android/key.properties`.
3. Point `storeFile` at the release keystore and keep the keystore out of source control.
4. Run `find . -name '._*' -type f -delete` before building from an external macOS volume.
5. Build the release artifact with `flutter build appbundle --release`.
6. Upload the generated `.aab` to an internal or closed testing track before production.
7. Confirm Play App Signing and Data safety answers before review.

## Non-Mobile Platforms

Current code only enables store purchases on iOS and Android. Web, macOS, Windows, and Linux use the unavailable purchase service until a separate signed license-file or desktop-store strategy exists.

Before publishing desktop or web builds with Pro claims:

- Implement signed local license import, or
- Remove Pro purchase claims from those platform pages, or
- Distribute through a store with a matching purchase API.

## Regression Gates

Run before submitting a paid build:

```sh
find . -name '._*' -type f -delete
flutter analyze
flutter test
flutter build web
```

For mobile release candidates, also run the platform build scripts and a sandbox purchase pass on device.
