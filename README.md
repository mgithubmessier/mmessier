# mmessier

## Summary

- This is a react monorepo where I'll be:
  - Publishing npm modules for anyone's use
  - Managing personal web application projects
  - Building up highly extensible component libraries

## Application TODOs

- mmessier
  - Use the query parameter hook to ingest locations from which guests come and visit your website
    - It may be interesting to personalize the experience of the site in some way based on the location the user came from, or have a database or serve that gets incremented based on the source
  - Figure out a way to host this website via Next.js, primarily doing server-side rendering
  - MUI supposedly will not work within the scope of a server-side component because it will need the 'use client' directive
    - I'm curious if after I finish this lesson if there will be something of interest here around how to properly separate out UI vs. server side logic in an _effective_ way
    - Right now I'm wondering if there will be any treeshaking that is worth it if I am applying advanced styling from other libraries like mui often
  - Hit ChatGPT on landing of each page and stream the response in real time to the UI asking it to summarize tthe contents on the experience
