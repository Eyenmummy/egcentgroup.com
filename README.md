# egcentgroup.com

Official source for the Egcent Group website.

## Project summary
This repository contains the static site files and small serverless functions used by egcentgroup.com. The site is intended to be built and deployed on a static host such as Netlify. The repository includes images, HTML/CSS/JS, and a couple of Netlify Functions under `netlify/functions/`.

## Quick start (local)
1. Open the project folder:

   cd "C:\Users\Gabriel Nya\OneDrive\Desktop\Egcentgroup-Site"

2. Install dependencies (if applicable):

   npm install

3. Run a local dev server (if your project provides one):

   npm run dev

4. Build for production:

   npm run build

By default the production output may be in `build/`, `dist/` or `public/`. Confirm which one your site uses and set Netlify's Publish directory to match.

## Netlify
- Connect the repository to Netlify and enable Continuous Deployment (Site settings → Build & deploy → Link to Git provider).
- Set the Build command (for example `npm run build`) and the Publish directory (`build` / `dist` / `public`).
- Add any required environment variables under Site settings → Build & deploy → Environment.

## GitHub
- Repository name: `egcentgroup.com` (dot in name is allowed).
- To push locally (HTTPS):

  git remote add origin https://github.com/YOUR_USERNAME/egcentgroup.com.git
  git branch -M main
  git push -u origin main

- For authentication, use a GitHub Personal Access Token (PAT) with `repo` scope for HTTPS, or configure SSH keys and use the SSH remote `git@github.com:YOUR_USERNAME/egcentgroup.com.git`.

## Resolving merge conflicts
This README replaced a conflicted file during a merge. If you need pieces of the previous README (remote or local), check Git history:

  git log -- README.md
  git show origin/main:README.md   # remote version (before merge)
  git show HEAD~1:README.md        # previous local version

## Large media and repository size
- This repo contains many images and some video files. To avoid large repo size and slow clones, consider:
  - Moving large media to an object store (S3, DigitalOcean Spaces) or a CDN and referencing their URLs.
  - Using Git LFS for large binaries if you must keep them in the repo.

## .gitignore
Ensure `.gitignore` excludes sensitive files such as `.env`, local build output (`dist/`, `build/`), and dependency folders (`node_modules/`). There is already a `.gitignore` in this repo — review it before pushing.

## License & contributors
Add a LICENSE file if you want to apply an open-source license. Add contributor and contact information in CONTRIBUTING.md or in the README if desired.

## Contact
For questions about this repository or deployment, contact the site maintainer.
