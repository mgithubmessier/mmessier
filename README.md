# mmessier

## Summary

- This is a react monorepo where I'll be:
  - Publishing npm modules for anyone's use
  - Managing personal web application projects
  - Building up highly extensible component libraries

## Application TODOs

- mmessier

  - Add a search widget to the experience details page where you pre-fill some common keywords to search for (a plug for your existing talents) or allow the user to type in and actively do a case-insensitive search across any details with that text within it
    - force the accordions to stay open while text is being entered
  - For the Home page

    - We should explain that this site is written in NextJS
    - We should explain that we are hosting it ourselves along with the services involved
    - we should provide an email form and not our email itself, we can have a lambda hit us with an email of some kind via a sendgrid integration which we can throttle to a very low amount, whichever keeps us in the free range
    - we should provide the linkedin and github

  - For projects

    - We should provide details about abstractserver, maybe we can make it its own site as well, we just don't want to provide the whole damn codebase

  - For the API we use
    - We can start with some serverless lambda infrastructure that serves up the same mock JSON objects we made inside of the app itself
    - Then we can use AWS DynamoDB, since anything under 25GB is always free!
  - Use the query parameter hook to ingest locations from which guests come and visit your website
    - It may be interesting to personalize the experience of the site in some way based on the location the user came from, or have a database or serve that gets incremented based on the source
  - Hit ChatGPT on landing of each page and stream the response in real time to the UI asking it to summarize tthe contents on the experience
    - Make sure to put a throttle on your API token here through OpenAI if they offer that in case some bad actor keeps reloading your page -- cap it at like a dollar per month or something super low

## Principles

- Looks like the library is pushing us to naturally separate UI, Feature, and DataAccess layers like I'm used to
  - Feature
    - /component/component.tsx
  - UI
    - /component/component.client.tsx
  - DataAccess
    - /lib/entity.ts

## App Deployment

- Currently thinking we'll use AWS's next js deployment strategy
  - https://aws.amazon.com/blogs/mobile/amplify-next-js-13/
