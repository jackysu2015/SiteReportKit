# SiteReportKit Flutter Stack

## Current Bootstrap

The first runnable MVP uses `shared_preferences` to persist the project list as
JSON. This is intentionally lightweight so the core flow can become editable
quickly across iOS, Android, web, and desktop.

This bootstrap store is not the final data architecture. It is suitable for
early prototypes, demos, and validating the report workflow before media and
PDF storage become heavy.

Issue photos are currently stored as compressed base64 records inside the same
JSON bootstrap store, including a lightweight caption string for evidence notes.
This is only for validating the capture -> issue -> PDF workflow. It is not
suitable for production-scale reports with many phone photos because base64
inflates storage and JSON save/load duplicates large blobs in memory.

The lightweight markup MVP exports the composed photo plus red drawing strokes
as a PNG and replaces the issue photo record while preserving caption and after
photo metadata. This keeps the first offline workflow simple enough to validate
on every platform. Production media storage should preserve the original photo
and save annotated copies separately.

Issue cards expose a photo details dialog for existing photos. It edits each
photo caption, toggles per-photo after evidence, and can launch markup for a
selected photo. `ProjectStore.updateIssuePhoto` replaces a single photo by ID
and recalculates the issue's after-photo state from current photo metadata.

Inspector and client signatures are also stored as modest PNG base64 strings in
the bootstrap project JSON so sign-off can be validated before the production
media layer exists. Treat these as local report artifacts, not cryptographic
e-signature proof.

Project-level report branding is also stored in the bootstrap JSON for now:
company name, email, phone, small normalized PNG logo, report accent color,
report layout style, report disclaimer, and Letter/A4 paper size. These fields
are preserved through project edits and copy operations, and they render into
the generated PDF cover, summary disclaimer block, page format, issue-photo
density, and footer. The logo storage is only a bootstrap path for small marks;
production should move logos into the media/file layer with the rest of report
assets.

Global report defaults are stored separately in SharedPreferences under
`site_report_kit.app_settings.v1`. They cover inspector name, company contact
details, logo, accent color, report layout style, disclaimer, default market,
default report type, and default paper size. New projects are prefilled from
these settings, while existing projects keep their own branding snapshot so
changing defaults does not rewrite previous reports.

The current PDF layer uses `pdf` to generate report bytes from domain models and
`printing` to preview/share them from the Flutter UI. The first template includes
a cover, summary, issue index, issue detail sections, real issue photos,
remaining placeholders for legacy sample counts, and a sign-off page with saved
inspector/client signatures when present. Project layout style controls the
issue-detail photo density: Standard balances text and photos, Photo-forward
uses larger evidence photos, and Compact keeps action-list exports denser. It
also renders photo captions as the primary evidence label when present and
groups real photos into issue evidence versus after/closeout evidence sections,
while preserving a legacy after-photo fallback for older issue-level flags. It
now supports three report variants: full report, contractor action list, and
closeout report. The PDF service owns variant filtering so preview, share, and
future export flows can use the same rules. Annotations are implemented;
single-project `.srkproject` import/export archives are available for offline
backup, handoff, and future sample-project downloads.

The bootstrap export layer also generates CSV issue registers for the same
three variants. CSV generation reuses `ReportPdfVariant` filtering, applies
standard field quoting, and guards spreadsheet-leading formula characters. The
current UI exposes CSV preview plus a unified `ExportArtifact` / `ExportService`
path. PDF uses the existing print/share flow on native targets and a generated
download fallback on web. PDF and CSV artifacts can also be saved through
`file_selector`: desktop targets open a save dialog, while web triggers a
browser download. CSV sharing uses the platform share sheet through
`share_plus`, with clipboard copy only when sharing is unavailable.

Project archives use a UTF-8 JSON wrapper around `SiteProject.toJson()` with
format `com.sitereportkit.project-archive` and schema version `1`. The current
importer also accepts bare project JSON for early bootstrap files, renames
project IDs on conflict instead of overwriting local reports, and drops invalid
photo/base64 payloads before constructing the model.

Sample PDF output can be visually checked with `dart run
tool/verify_sample_pdfs.dart`. The tool rebuilds the shared sample PDF matrix,
uses Poppler `pdfinfo` and `pdftoppm` to render every page to
`output/pdf/rendered/`, checks that rendered PNGs match the PDF page counts, and
writes a `visual_qa_manifest.json` for manual layout review and website asset
selection.

Common issue templates are currently built in through `IssueTemplateCatalog`.
They are filtered by project market and report type, then shown only while
creating a new issue. Applying a template pre-fills editable form fields and
does not persist a template ID, so saved issues remain plain `ReportIssue`
records that flow into PDF and CSV exports without special handling.

The current issue list supports local status filters and sorting by report
order, due date, severity, or area. Filter and sort selections are UI-only state
and do not mutate the stored report. Individual issue status changes are saved
through a quick status menu on each issue card for closeout/reinspection walks.
Issues also support a resolution/closeout note that appears on issue cards and
in generated PDFs. Marking an issue as resolved opens a closeout dialog for the
note and can continue into after-photo import.

For Flutter Web, `printing` requires PDF.js. The app vendors PDF.js under
`web/assets/js/pdf/3.2.146/` and points `dartPdfJsBaseUrl` at that local path in
`web/index.html`, so previews do not depend on a CDN. The current web UI uses a
safe generated-PDF fallback with download/share controls; native mobile and
desktop targets use `PdfPreview` for raster preview.

## Production Direction

### Offline Data

Use `drift` with `drift_flutter` for the production local database.

Planned tables:

- `projects`
- `issues`
- `issue_photos`
- `annotations`
- `signatures`
- `exports`
- `company_profiles`
- `report_templates`

Store large media as files on native platforms and keep relative paths plus
metadata in Drift. On web, use Drift's Wasm backend and a web-specific media
store because `path_provider` does not support web.

Move signatures out of JSON with the rest of media storage. Keep them small,
replaceable, and explicitly clearable because they are personal data.

### Files And Media

Use `path_provider` for native app documents, support, cache, and export
locations. Keep a `MediaStore` interface so web and native implementations can
differ without changing the UI.

Use `image_picker` for camera capture and photo import. On Android, recover lost
picker data on app startup. The bootstrap app only auto-attaches recovered
photos when there is exactly one local report with exactly one issue, avoiding
silent attachment to the wrong report. Production should replace this with a
dedicated recovered-photo inbox or persisted pending media queue.

On iOS, add the required camera and photo library plist usage descriptions. On
macOS, include the user-selected read-only entitlement for file/photo imports.

### Photo Annotation

The bootstrap app includes a simple red-ink markup screen for drawing directly
on issue photos. Use `pro_image_editor` later for arrows, shapes, text,
crop/rotate, blur or pixelation, undo/redo, and desktop-friendly editing.

Keep original photos immutable. Save annotated copies separately and link both
to the issue record.

### PDF Reports

Use `pdf` to generate deterministic report bytes from domain data. Use
`printing` for preview, print, and share-style flows where supported.

Reports should be generated from `SiteProject` and `ReportIssue` data rather
than widget screenshots, so output remains stable offline and across platforms.

### Export And Sharing

The small `ExportService` abstraction owns save and share behavior for generated
PDF and CSV artifacts.

Current packages:

- `share_plus` for CSV native share sheets and web share fallback.
- `file_selector` for desktop save-as dialogs and web downloads.
- `path_provider` is a direct dependency for future temporary-file and archive
  work, and is already pulled by sharing packages.

Linux file sharing is limited, so saving/downloading remains a separate
first-class action in the UI.

## Implementation Order

1. Keep the JSON bootstrap store while project and issue forms stabilize.
2. Add PDF generation from the current domain models.
3. Add image import and permanent media storage.
4. Add annotation, before/after image handling, and closeout review controls.
5. Migrate persistence from JSON bootstrap to Drift.
6. Add export archive, backup/import, and optional cloud sync.
