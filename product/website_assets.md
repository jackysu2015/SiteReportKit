# Website Asset Pack

`sitereportkit.com` should use real app outputs instead of placeholder mockups.
The current website-ready pack is generated into `output/website/` with:

```sh
dart run tool/prepare_website_assets.dart
```

The script rebuilds and visually verifies the sample PDFs, regenerates CSV and
project archive samples, then copies stable filenames for website use.

## Screenshots

- `output/website/assets/report-cover.png`: homepage hero report preview.
- `output/website/assets/report-issue-evidence.png`: issue detail section with
  action required, responsibility, due date, and evidence photo.
- `output/website/assets/report-after-evidence.png`: after/closeout evidence
  section for closeout messaging.
- `output/website/assets/action-list-cover.png`: contractor action list example.
- `output/website/assets/closeout-report-page.png`: closeout report example.

## Downloads

- `output/website/downloads/sample-snagging-report.pdf`
- `output/website/downloads/sample-snag-action-list.pdf`
- `output/website/downloads/sample-closeout-report.pdf`
- `output/website/downloads/sample-issue-register.csv`
- `output/website/downloads/sample-snag-action-list.csv`
- `output/website/downloads/sample-project.srkproject`

The script also writes `output/website/website_assets_manifest.json` with alt
text, source paths, file sizes, and first-pass homepage positioning copy.

## Homepage Starting Point

Headline: `Create professional punch list PDFs before leaving site.`

Subhead: `SiteReportKit turns field photos, markup, responsibilities, and
closeout evidence into polished PDF and CSV reports without a heavy construction
platform.`

Primary call to action: `Download sample report`

Secondary call to action: `See action list example`

Use the screenshots as product evidence near the top of the page, then let
pricing and platform details follow. The app promise should remain practical:
offline-first field reporting, clean PDF output, no heavy construction suite.
