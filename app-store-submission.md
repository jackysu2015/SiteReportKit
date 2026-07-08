# SiteReportKit App Store Submission Notes

Last updated: 2026-07-07

## App Store Connect Values

- App name: `SiteReportKit`
- Bundle ID: `com.sitereportkit.sitereportkit`
- SKU: `sitereportkit-ios-001`
- Primary language: English (U.S.)
- Subtitle: `Snag & Punch List Reports`
- Primary category: Business
- Secondary category: Productivity
- Price: Free for launch
- Future Pro unlock: Non-consumable in-app purchase, target USD 49.99 launch price
- Availability: All countries and regions
- Support URL: `https://sitereportkit.com/support`
- Marketing URL: `https://sitereportkit.com`
- Privacy policy URL: `https://sitereportkit.com/privacy`
- Copyright: `2026 SiteReportKit`

## Version Metadata

Promotional text:

```text
Create punch lists, snagging reports, and closeout PDFs on site. Capture photos, mark up issues, assign actions, and export offline.
```

Keywords:

```text
punch list,snagging,inspection,defect,site report,construction,PDF,CSV,closeout,property
```

## App Privacy

Recommended current answer:

- Data collection: No, the developer does not collect data from this app.
- Tracking: No.
- Third-party advertising: No.
- Analytics SDKs: None in the current codebase.
- Developer-operated account or server upload: None in the current codebase.

Apple in-app purchase processing is handled by the App Store. Update this answer before release if cloud sync, accounts, analytics, crash reporting, support ticket uploads, developer-operated payment processing, or integrations are added.

## Pro In-App Purchase

- Product type: Non-consumable
- Product ID: `sitereportkit_pro`
- Reference name: `SiteReportKit Pro`
- Display name: `SiteReportKit Pro`
- Launch price target: USD 49.99
- Unlocks: unlimited local reports, custom branded PDF/CSV exports, and archive imports beyond the free report limit.
- Free plan guardrail: 3 local reports. Free exports use SiteReportKit Free branding, and archive imports count against the free report limit.
- Required app UI: `Unlock Pro`, `Buy Pro`, and `Restore` are available from the project tools menu and limit dialog.
- Local testing: create a StoreKit configuration with `sitereportkit_pro`, attach it to the Xcode Run scheme, and test purchase, cancel, restore, and interrupted transaction states before App Review.
- Entitlement limitation: the current MVP persists a local Pro unlock after a successful purchase or restore. It does not yet run developer-side receipt validation or automatically downgrade an already-unlocked device after refund/revocation.

Detailed billing release steps live in `docs/billing-release-checklist.md`.

## Google Play Billing

- Product type: One-time product
- Product ID: `sitereportkit_pro`
- Launch price target: USD 49.99 or local equivalent
- Required Play Console setup: base plan/price, tester license accounts, closed testing track, and managed product activation.
- Release verification: confirm the merged Android manifest includes the billing permission from the Billing plugin and that purchases are acknowledged through `in_app_purchase`.

## Age Rating

Recommended target: 4+.

Use `None` or `No` for violence, mature content, medical content, gambling, contests, unrestricted web access, location services, and social or public user-generated content, based on the current codebase.

## Remaining Release Blockers

- Publish `docs/` to `https://sitereportkit.com` so `/privacy` and `/support` resolve.
- Generate App Store Connect compliant screenshots for iPhone and iPad.
- Create the non-consumable in-app purchase `sitereportkit_pro` at the USD 49.99 price tier, with review screenshot and review notes.
- Add a StoreKit configuration file for local purchase and restore testing.
- Produce a real App Store distribution build: update `pubspec.yaml` with the next build number, open `ios/Runner.xcworkspace`, select the Apple Developer Team and App Store provisioning profile, then run `flutter build ipa --release` or Xcode Product > Archive.
- Upload the archive with Xcode Organizer or Transporter, then attach the TestFlight/App Store build to the version. Do not use the existing development-signed IPA.
- Complete App Information after App Store Connect renders the form: subtitle and categories.
- Add build, screenshots, age rating, export compliance, IAP review screenshot, and review notes before adding the version for review.
