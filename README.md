# egcentgroup.com

Static site for Egcent Group.

## Summary
This repository contains the source for egcentgroup.com — a static site intended to be built and deployed (for example, via Netlify).

## Local development
Adjust the commands below if your project uses a different toolchain (Hugo, Gatsby, Jekyll, etc.).

Install dependencies (if applicable):

  npm install

Run a development server (if available):

  npm run dev

Build for production:

  npm run build

The production build output is typically in one of the following folders: `dist/`, `build/`, or `public/` — confirm which one your project uses and set this as the "Publish directory" in Netlify.

## Netlify
- Connect this repository to Netlify (Site settings → Build & deploy → Continuous Deployment → Link to Git provider).
- Set the build command (example: `npm run build`) and the publish directory (example: `build` or `public`).
- Add any required environment variables under Site settings → Build & deploy → Environment.

## GitHub
To create a GitHub repo named `egcentgroup.com` and push this project (example using GitHub CLI):

  cd "C:\\Users\\Gabriel Nya\\OneDrive\\Desktop\\Egcentgroup-Site"
  git init
  git checkout -b main
  git add .
  git commit -m "Initial commit"
  gh repo create egcentgroup.com --public --source=. --remote=origin --push

(or use the web UI to create the repo, then add the remote and push.)

## Notes
- Make sure sensitive files (for example, `.env`) are listed in `.gitignore` before committing.
- The repository name may include dots (egcentgroup.com) — this is valid on GitHub.

If you want, the README can be expanded with deployment details, contributor information, or a license.
