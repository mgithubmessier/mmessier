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

## Next.js Limitations

- API Calls
  - Using react-query with Next.js
    - https://tanstack.com/query/v4/docs/react/guides/ssr#using-initialdata
    - It just looks like we'll have to use the client to make the requests and lose the benefit of server-side rendering if we make use of react-query at all
  - You are pretty much constrained to their infrastructure for requests -- which is just a different way of thinking as I get into this a bit more

## Principles

### Data Components

- It's very much looking like the way to pass data around here is the have the parent make the initial request and then pass that data to the child component which can then be rendered using the clent if we are using a library like MUI or something of the sort
  - I worry about reactivity and how to properly make different requests when a form is submitted or a filter is applied from within the client-side component -- will we always be providing a callback from the parent to the child to reload the data? It may not be the end of the world if so, but ehhh, we'll see

## App Deployment

- Currently thinking we'll use AWS's next js deployment strategy
  - https://aws.amazon.com/blogs/mobile/amplify-next-js-13/
