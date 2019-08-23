---
title: "Org to Resume"
featuredImage: ../../../images/org-to-resume-one.png
projectLink: "https://org-to-resume.netlify.com"
codeLink: "https://github.com/gainhad/org-to-resume"
---
# Project Description

Org-to-Resume allows users to write Org Markup documents (Org Markup Information), style it with CSS, and then download a PDF of their document. While it works for any type of document, I created the app because I wanted a way to keep my resumes in plain-text (Org markup is plain text, similar to Markdown) that I could track with git, yet still be able to generate clean, well-formatted resumes.

# Future Plans

The app currently only supports a subset of the Org Markup syntax. While I think I have pretty much everything necessary for my use case (resumes), I do hope to add support for more Org features in the future. I would also like to connect the app to Dropbox or Google Drive. Currently, documents are simply stored in localStorage, which is great for preventing lost progress on refresh, but obviously not a long-term storage solution.

# Technology used

## Frontend
- Framework - React (through Create React App) using primarily class components and lifecycle methods
- Style - CSS (SCSS) Modules

## Backend
- Org-to-Resume was originally going to run a headless Google Chrome on the server to render PDFs, but I've since realized a simple print media query in CSS works even better! No backend needed.

## Hosting
Everything is hosted through Netlify. This is my first time using Netlify, but I really enjoy it and will host any other front-end projects with them.
