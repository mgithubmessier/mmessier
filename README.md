# mmessier

## Summary

- This is a react monorepo where I'll be:
  - Managing personal web application projects
  - Building up highly extensible component libraries

## Application TODOs

- Add a validator for react-hook-form that detects: any links/ domains, javascript, or SQL
- Add a snackbar that gives feedback upon a POST, PATCH, PUT, or DELETE request
- Whenever a user is viewing the contact section, check the contact database to see if they have sent an email within the last hour, if so, then show the contents of their email and show a different button element which is disabled and does not have an onclick handler (so that a user cannot manually undisable it)
- We want a custom domain name that allows us to have APIs to be hit from it

  - Can we do something like `api.matthewmessier.com`?

- **Authentication Service**

  - This lambda accepts an unauthenticated request with an IP address as its payload

- **Authentication Service TODO**

  - The nextjs app should also validate that the request header's IP matches the one attached in the body prior to firing the request to the lambda
  - We need to have a shared function in another library with the logic to verify the contents of the JWT in other services
    - This is because we do not want to re-invoke the authentication lambda simply because of separation of concerns
    - Only the Contact Service needs to implement this because it is a request that must be fired from cient components and cannot be hidden from view
    - We may also need to do this for paginating the experience contents, so we may scrap the whole concept of pre-rendering the experiences in general

- **Contact Service**

  - Uses sendgrid's API since they allow up to 100 free emails / day
  - Requirements of the service:
    - Sends an email to my personal email account with the message and contact information of the person reaching out
    - Track how many successful executions of the service have occurred in a given calendar day and return an error if that exceeds 100, the free tier of sendgrid
    - Whenever a user sends an email, drop their IP, and the details of their request in a database temporarily (for an hour)
    - Add a character limit on the email that is in line with the costs of whatever email service you go with
    - Sanitize any potential malicious content within text fields

- **For projects tab**

  - could add the drifting shapes animation in the background, maybe separate it out into its own library
    - might be cool if I add a visual boxes depicting how it works, maybe allowing someone to choose the colors they want to use in a sub-view
  - use query parameter hook
    - clean up this form a bit to be a clearer walkthrough

- **GenAI Service**

  - ChatGPT Lambda
    - Hit ChatGPT on landing of each page and stream the response in real time to the UI asking it to summarize the contents on the experience
    - Make sure to put a throttle on your API token here through OpenAI if they offer that in case some bad actor keeps reloading your page -- cap it at like a dollar per month or something super low

- **Other tasks**
  - Use the query parameter hook to manage the current page key for the experiences that you are on
    - As you iterate through DynamoDB pages, you should push them into the zustand state and remember how many pages that the client has already visited and allow them to go back to them
  - Use the query parameter hook to ingest locations from which guests come and visit your website
  - It may be interesting to personalize the experience of the site in some way based on the location the user came from, or have a database or serve that gets incremented based on the source
  - We could bring in some of the abstract-server project to nx by using the go plugin
    - https://github.com/nx-go/nx-go

## Principles

- Looks like the library is pushing us to naturally separate UI, Feature, and DataAccess layers like I'm used to
  - Feature
    - /component/component.tsx
  - UI
    - /component/component.client.tsx
  - DataAccess
    - /api/route.ts
    - Some GET requests should not be put behind these routes, specifically the ones we are using to statically render server-side components
      - This is because we cannot make requests to the app we are building itself
      - So in those cases, we hit the API directly from the server side component and not through the next js api routes itself

## Next.js Gotchas

- In dev mode only, there is a double render that occurs due to a React 18 feature
  - https://github.com/vercel/next.js/issues/35822
  - https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode

## Service Layer

- Currently we are using an API Gateway with a custom lambda authorizer which authenticates the requests to our experience service lambda, the experience service lambda then access dynamodb and return the contents of the requested experiences
- The following AWS diagram generally depicts the pattern
  - https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html

### Service Layer Future

- A VPC would be better because we could ditch the API Gateway and the authorization lambda and hit the experience service lambda directly with our NextJS app if they are on the same VPC
  - The current blocker on this is that the VPC in AWS is likely going to cost far too much
  - https://aws.amazon.com/blogs/mobile/accessing-resources-in-a-amazon-virtual-private-cloud-amazon-vpc-from-next-js-api-routes/

## Database Layer

- DynamoDB is the cheapest way to pull off my currect way of doing things
- Always use the `Query` operation over the `Scan` operation, due to the difference in compute and expense
- The current DynamoDB schema is as follows:
  - A single Partition Key like, called `entityName`
    - ex.) for experience service, this is `"experience"`
  - Many different Sort Keys `sortedUniqueId`
    - ex.) for experience service, this is an ISO date representing the start date of each experience `"2023-12-24T00:00:00.000Z"`

### Database Layer Future

- Get the schema for the DynamoDB table stored in a terraform file and associate it with the other existing scripts instead of hardcoding its ARN

## App Deployment

- We currently deploy using AWS Amplify, tied to a specific github branch, `application/mmessier`

### App Deployment Future

- AWS has permissions to get updates on commits to that branch and then will run the pipeline to deploy it
- In the future, I may want to take that CI/CD pipeline back and run it in github actions, and then just do an amplify deploy via terraform
  - I also learned that terraform has a cloud, which I created a free account for, but if I wanted to run all of my operations from there, then I would need to deploy all of the assets for the lambdas and whatnot there as well
  - For the time being I've altered the "Execution Mode" at app.terraform.io to be "local" instead of "remote", read more on terraform execution modes [here](https://developer.hashicorp.com/terraform/cloud-docs/run/remote-operations#remote-operations-1)
