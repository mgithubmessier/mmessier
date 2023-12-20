# mmessier

## Summary

- This is a react monorepo where I'll be:
  - Publishing npm modules for anyone's use
  - Managing personal web application projects
  - Building up highly extensible component libraries

## Application TODOs

- mmessier

  - APIs to enable

    - Decide on an API to send emails to yourself containing the sender email and the content of their message, then set up a lambda that can execute that
      - Throttle that lambda
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

## Servic Layer

- Currently we are using an API Gateway with a custom lambda authorizer which authenticates the requests to our experience service lambda, the experience service lambda then access dynamodb and return the contents of the requested experiences
- The following AWS diagram generally depicts the patter
  - https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html

### Service Layer Future

- A VPC would be better because we could ditch the API Gateway and the authorization lambda and hit the experience service lambda directly with our NextJS app if they are on the same VPC
  - The current blocker on this is that the VPC in AWS is likely going to cost far too much
  - https://aws.amazon.com/blogs/mobile/accessing-resources-in-a-amazon-virtual-private-cloud-amazon-vpc-from-next-js-api-routes/

## App Deployment

- We currently deploy using AWS Amplify, tied to a specific github branch, `application/mmessier`

### App Deployment Future

- AWS has permissions to get updates on commits to that branch and then will run the pipeline to deploy it
- In the future, I may want to take that CI/CD pipeline back and run it in github actions, and then just do an amplify deploy via terraform
  - I also learned that terraform has a cloud, which I created a free account for, but if I wanted to run all of my operations from there, then I would need to deploy all of the assets for the lambdas and whatnot there as well
  - For the time being I've altered the "Execution Mode" at app.terraform.io to be "local" instead of "remote", read more on terraform execution modes [here](https://developer.hashicorp.com/terraform/cloud-docs/run/remote-operations#remote-operations-1)
