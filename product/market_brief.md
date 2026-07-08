# SiteReportKit Market Brief

## Positioning

SiteReportKit is a fast, offline-first punch list and snagging report app for small construction, fit-out, inspection, property, and facilities teams in Western markets. The wedge is not broad construction project management; it is "walk the site, capture issues, export a professional PDF before leaving."

Primary promise: create clean, branded PDF reports from photos, annotations, locations, priorities, and signatures with minimal setup, no training, and no network dependency.

Differentiation:

- Faster and simpler than field management suites such as Fieldwire or PlanRadar for report-only workflows.
- More professional and structured than notes, spreadsheets, Word templates, or camera-roll workflows.
- More modern and cross-platform than legacy punch list apps with limited report customization.
- Privacy-forward by default: local projects, local media, explicit export/share, optional sync later.

## Personas

- Independent building inspector: performs residential or commercial walkthroughs, needs polished client PDFs, cares about speed, disclaimers, branding, and photo evidence.
- Architect or designer: captures site observations and defects during site visits, needs room/area grouping, annotated photos, and a concise action list for contractors.
- Contractor or site manager: runs punch walks before handover, needs trade/assignee/status fields, quick duplicate entry, and report export for subcontractors.
- Property manager or facilities lead: records maintenance issues across units or sites, needs repeatable templates, before/after photos, and simple archives.
- Homeowner or buyer representative: documents snagging items in a new build or renovation, needs a simple guided mode and a credible PDF.

## Core Workflows

1. Create project
   - Add project name, client, address, report type, logo, inspector/company details, date, and optional cover photo.
   - Choose a template: punch list, snagging, site audit, inspection report, or maintenance walk.

2. Capture issues offline
   - Add issue from one tap while walking.
   - Required MVP fields: title, description, photos, location/area, priority, status, category/trade, created date.
   - Fast entry helpers: duplicate previous area/trade, recent locations, voice-to-text using platform dictation where available, photo import/camera capture.

3. Mark up evidence
   - Annotate photos with arrows, circles, text labels, blur/redaction, and crop/rotate.
   - Preserve original photo plus edited version for defensibility.

4. Review and organize
   - Filter by area, priority, status, category/trade.
   - Reorder issues manually or sort by area then priority.
   - Batch update status/category/assignee for selected issues.

5. Generate report
   - Preview PDF locally.
   - Include cover page, summary, issue table, detailed issue pages, photo appendix, signatures, and legal/disclaimer footer.
   - Export/share PDF and optionally CSV.

6. Close out
   - Duplicate project for follow-up visit.
   - Mark issues resolved, add resolution photos/comments, and generate closeout report.

## MVP Scope

Platforms:

- Flutter app for iOS, Android, macOS, Windows, and web-capable codebase.
- Launch priority: iOS and Android first; desktop useful for report review and template setup.

Data model:

- Project, contact/client, report template, issue, photo asset, annotation, signature, company profile.
- Local-first storage with automatic save.
- Exportable project archive file for backup/import before cloud sync exists.

Capture:

- Camera/photo import, multiple photos per issue, basic image annotation, issue fields, area/category/status/priority lists.
- Offline operation for all core capture and report generation.

Reporting:

- Branded PDF generation on device.
- Built-in export variants for full client report, contractor action list, and closeout report.
- PDF preview before share.
- CSV issue register export for full, action-list, and closeout views.

Customization:

- Company logo, accent color, report layout style, inspector details, client details, report title, disclaimer text, page numbering, date format, measurement locale.
- Template toggles for cover page, summary table, detailed photos, signatures, and terms/disclaimer.

Current bootstrap coverage:

- Implemented now: project-level company name, company email, company phone, company logo import, report accent color, report layout style, inspector name, client/site details, disclaimer text, and Letter/A4 paper size. Generated PDFs place the logo or company mark on the cover, apply the selected accent color to report branding, include company contact details in the footer, honor the selected page size, tune issue-photo density for Standard/Photo-forward/Compact layouts, and include a limitations/disclaimer block in the summary.
- Implemented now: global report defaults for inspector name, company contact details, logo, accent color, report layout style, disclaimer, market, report type, and paper size. Defaults prefill new reports while existing reports keep their own brand snapshot.
- Implemented now: export presets for full report, contractor action list, and closeout report. Action lists include open/in-progress items only, while closeout reports include resolved items with resolution evidence.
- Implemented now: photo details and captions for issue evidence. Captions persist in project JSON/archive exports, can be edited from the issue form or photo details panel, after-photo flags can be toggled per photo, issue cards show the primary caption, PDFs group photos into issue evidence and after/closeout evidence sections, and CSV issue registers export caption evidence notes.
- Implemented now: common issue templates for fast punch/snag creation. Templates are filtered by market and report type, prefill title, description, trade, severity, assignee hint, and due date, and remain fully editable before saving.
- Implemented now: downloadable/shareable CSV issue registers for each export preset, including area, trade/category, assignee, due date, action text, resolution note, and photo evidence counts.
- Implemented now: offline `.srkproject` archives for backing up or handing off a single report, with import conflict handling so existing local reports are not overwritten.
- Still planned: cover images, side-by-side before/after pairing controls, photo appendix/compression controls, multiple company profiles, date-format controls, and per-template section toggles.

Quality:

- Autosave, clear empty states, undo for annotation edits where feasible.
- Sample project for onboarding.
- No account required for trial/local use.

Not in MVP:

- Real-time collaboration.
- Cloud dashboards.
- BIM, plan sheet takeoff, RFIs, submittals, schedules, or deep construction management.
- Complex checklist engine beyond reusable issue templates/categories.

## Post-MVP Scope

- Optional encrypted cloud sync and multi-device continuity.
- Team workspaces with roles, shared templates, and report history.
- Client portal links for viewing reports without app install.
- Assignee notifications and due dates.
- Plan/floor drawing import with issue pins.
- Advanced checklist templates and recurring inspection schedules.
- OCR and AI-assisted issue titles/summaries from photos and notes.
- Custom report designer for agencies and enterprise users.
- White-label reports and domain branding.
- Integrations: Google Drive, OneDrive, Dropbox, Procore, Autodesk Construction Cloud, Zapier/webhooks.
- Analytics: issue counts by trade, aging, repeat defects, closeout progress.

## Report Template Requirements

PDF output must feel credible enough to send directly to a client, contractor, landlord, or insurer.

Required sections:

- Cover page: report title, project/client, address, date, prepared by, company logo, optional cover image.
- Executive summary: total issues, open/resolved counts, priority breakdown, areas inspected, limitations/disclaimer.
- Issue index: compact table with ID, area, title, category/trade, priority, status, and page reference.
- Issue detail pages: issue ID, title, area, category/trade, priority, status, description, recommendation/action required, photos, annotations, timestamps.
- Photo handling: multiple photos per issue, captions, before/after evidence sections, side-by-side pairing controls, clear scaling, compression controls.
- Sign-off: inspector signature, client/contractor acknowledgement, date, optional notes.
- Footer/header: company details, page numbers, confidentiality/disclaimer text.

Template controls:

- US, UK, Canada, Australia, and New Zealand friendly date/address defaults.
- Letter and A4 page sizes.
- Terminology switch: punch list, snag list, defects, observations, items.
- Report density: compact table-heavy mode and photo-forward client mode.
- Export presets: client PDF, contractor action list, closeout PDF, CSV issue register.

## Pricing Hypothesis

Market signal checked July 7, 2026:

- Site Audit Pro has a low one-time entry price around GBP 12.90 / USD 12.90 with optional cloud subscriptions around GBP 6.99/month or GBP 59.99/year. Its paid app includes local report generation, so it anchors the solo/offline buyer expectation low.
- SafetyCulture publishes Premium pricing around USD 24 per seat/month billed annually or USD 29 monthly.
- Fieldwire publishes Pro at USD 39 per user/month billed annually.
- PlanRadar publishes Basic around USD 32 per user/month and higher tiers above USD 100 per user/month.
- Home Inspector Pro has a much higher installed-software anchor at USD 999, but it serves a deeper home-inspection workflow and often still requires office/mobile subscriptions.

Hypothesis:

- Offer a generous local trial to reduce friction: 3 active projects or watermark on exported PDFs.
- Individual Pro launch target: USD 49.99 one-time per platform for unlimited local projects, custom branded PDF/CSV exports, and archive imports beyond the free project limit.
- Individual Pro regular target after validation: USD 79 one-time per platform if the report quality, templates, and archive workflow justify the jump.
- Avoid a local-only monthly subscription at launch. Without cloud storage, team sync, server-side automation, or hosted collaboration, monthly pricing competes poorly with Site Audit Pro's low local entry price and can feel less honest to solo users.
- Team: USD 15-19/user/month annually once cloud sync, shared templates, and team roles exist.
- Agency/white-label: USD 299-799/year add-on for advanced report branding, multiple company profiles, custom domains/client portal when available.

Pricing should intentionally sit above throwaway utility apps by emphasizing report quality, offline reliability, archive portability, and professional presentation, while staying well below broad construction management suites until team/cloud capabilities exist.

## Website Plan: sitereportkit.com

Primary goal: convert field professionals searching for punch list, snagging, and site report apps into trial downloads.

Pages:

- Home: clear promise, product screenshots, "Create punch list PDFs offline in minutes", platform badges, sample report download.
- Use cases: punch lists, snagging reports, site audits, property inspections, maintenance walkthroughs.
- Sample reports: downloadable PDF examples for each template and region terminology.
- Pricing: simple local Pro plan first, team waitlist or "coming soon" if sync is not ready.
- Compare: lightweight pages for spreadsheet/Word workflows, SafetyCulture-style inspection tools, Fieldwire/PlanRadar-style construction suites, and legacy site audit apps.
- Resources: snagging checklist, punch list template, site inspection report template, PDF report examples.
- Support: knowledge base, contact, release notes, privacy/security.

SEO targets:

- "punch list app", "snagging app", "site inspection report app", "site audit PDF report", "construction punch list PDF", "property inspection report app", "defect list app".

Launch assets:

- Real product screenshots from mobile capture and PDF preview.
- Downloadable sample PDF with watermark.
- Short walkthrough video showing create project -> add photos -> annotate -> export PDF.
- Trust copy around offline use, local data, no account required for trial, and professional report output.

The current generated website asset pack is documented in
`docs/product/website_assets.md` and built with
`dart run tool/prepare_website_assets.dart`.

Reference pricing sources checked July 7, 2026:

- Site Audit Pro website and app store listings: https://siteauditpro.com/ and https://apps.apple.com/us/app/site-audit-pro/id430234732
- SafetyCulture pricing: https://safetyculture.com/pricing
- PlanRadar pricing: https://www.planradar.com/us/pricing/
- Fieldwire pricing: https://www.fieldwire.com/pricing/
- Home Inspector Pro pricing: https://homeinspectorpro.com/home-inspection-software-pricing/
