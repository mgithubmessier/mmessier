# mmessier

## Summary

- This is a react monorepo where I'll be:
  - Publishing npm modules for anyone's use
  - Managing personal web application projects
  - Building up highly extensible component libraries

## Application TODOs

- mmessier

  - APIs to enable

    - Create DynamoDB table, anything under 25GB is free!
      - resume information
      - project information
    - Decide on an API to send emails to yourself containing the sender email and the content of their message, then set up a lambda that can execute that
      - Throttle that lambda
    - Standup the website inside of AWS via some sort of server and see if that server can then reach other to other endpoints internally without having to leave the VPC it is running on
    - ChatGPT Lambda
      - Hit ChatGPT on landing of each page and stream the response in real time to the UI asking it to summarize the contents on the experience
      - Make sure to put a throttle on your API token here through OpenAI if they offer that in case some bad actor keeps reloading your page -- cap it at like a dollar per month or something super low

  - For projects

    - could add the drifting shapes animation in the background, maybe separate it out into its own library
      - might be cool if I add a visual boxes depicting how it works, maybe allowing someone to choose the colors they want to use in a sub-view
    - use query parameter hook
      - clean up this form a bit to be a clearer walkthrough

  - Other tasks:
    - Use the query parameter hook to ingest locations from which guests come and visit your website
    - It may be interesting to personalize the experience of the site in some way based on the location the user came from, or have a database or serve that gets incremented based on the source

## Principles

- Looks like the library is pushing us to naturally separate UI, Feature, and DataAccess layers like I'm used to
  - Feature
    - /component/component.tsx
  - UI
    - /component/component.client.tsx
  - DataAccess
    - /lib/entity.ts

## Next.js Gotchas

- In dev mode only, there is a double render that occurs due to a React 18 feature
  - https://github.com/vercel/next.js/issues/35822
  - https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode

## App Deployment

- Currently thinking we'll use AWS's next js deployment strategy
  - https://aws.amazon.com/blogs/mobile/amplify-next-js-13/
- This diagram/ article is ideally what would be set up
  - https://aws.amazon.com/blogs/mobile/accessing-resources-in-a-amazon-virtual-private-cloud-amazon-vpc-from-next-js-api-routes/
    - Could be great for a future idea, but I think the VPC would cost too much
- Instead the infrastructure will be:
  1. API Gateway
  - We'll want to take a look at rate limiting here, to some kind of really low number -- like one request every second or something
  - We'll also want to allowlist only the arn of my amplify resource, if that's possible for the API Gateway
  2. Lambda
  - This lambda will be pretty straightforward, just a simple DynamoDB lookup to start with
  - Then, I'll add an endpoint to add items to it that has an api_token that locks it -- one that I'll store in an env variable in AWS and that I'll hit
  - It'd be cool if the lambda code could live on this repository along with a terraform script that deploys it
  3. DynamoDB
