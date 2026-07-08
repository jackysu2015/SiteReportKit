# SiteReportKit Website Deployment

This folder is ready for GitHub Pages hosting.

## Recommended GitHub Pages setup

1. Push the repository to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Set **Source** to **Deploy from a branch**.
5. Select the `main` branch and the `/docs` folder.
6. Save.
7. In the custom domain field, use `sitereportkit.com`.

`docs/CNAME` already contains `sitereportkit.com`, so GitHub Pages can keep the custom domain after future pushes.

## DNS

Point the domain to GitHub Pages:

- Apex domain `sitereportkit.com`: use GitHub Pages A records.
- Optional `www.sitereportkit.com`: add a CNAME record pointing to your GitHub Pages hostname.

After DNS is active, enable **Enforce HTTPS** in GitHub Pages settings.

## Local preview

From the project root:

```sh
python3 -m http.server 4173 --directory docs
```

Then open:

```text
http://127.0.0.1:4173/
```
