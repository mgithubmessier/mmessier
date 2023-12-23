# mmessier

## Summary

- This is a react monorepo where I'll be:
  - Managing personal web application projects
  - Building up highly extensible component libraries

## Application TODOs

- mmessier

  - **We need a better way of handling terraform and services**

    - Currently, we have:
      - The experience service and its authorizer as deployable code
      - The terraform module supporting the AWS configuration for the API Gateway, Lambdas, and Authorizer infrastructure
    - In the future, we want
      - The contact service, which will also share the authorizer that the experience service uses
      - Additional routes defined under the API Gateway and the Lambda deployment logic for it
    - What is wrong with our current structure
      - We have the module named `experience-service`, but it should probably be something more abstract, akin to `AWS` or something
        - This is because we have the issue that terraform only allows us to store its configuration in one directory
          - We could do something with modules and child modules, but the shared configuration could get destroyed in one terraform state and then lost in another's state, so it's WAYYY simpler to keep them all in one directory
    - Potential Solution
      - Lift the terraform configuration files up into a new directory called `terraform` and have them refer to the other projects which only contain the deployable code
      - We then add nx dependencies in the `terraform` project.json on the other services, splitting the deployable code out into:
        - authorization-service
        - experience-service
        - contact-service
      - It's important that we split them out because we only want to install the bare minimum dependencies that each one of them have

  - **Contact Service**

    - Decide on an API to send emails to yourself containing the sender email and the content of their message, then set up a lambda that can execute that

      - Could use sendgrid's api, https://docs.sendgrid.com/for-developers/sending-email/api-getting-started
      - Could use google's api, https://developers.google.com/gmail/api/guides/sending#python

    - Requirements of the service:
      - Whenever a user sends an email, drop their IP, and the details of their request in a database temporarily (for an hour)
      - Whenever a user is viewing the contact section, check the contact database to see if they have sent an email within the last hour, if so, then show the contents of their email and show a different button element which is disabled and does not have an onclick handler (so that a user cannot manually undisable it)
      - Add a character limit on the email that is in line with the costs of whatever email service you go with
      - Sanitize any potential malicious content within text fields
        - Add a validator for react-hook-form that detects: any links/ domains, javascript, or SQL

  - **APIs to enable**

    - We want a custom domain name that allows us to have APIs to be hit from it

      - Can we do something like `api.matthewmessier.com`?

    - ChatGPT Lambda
      - Hit ChatGPT on landing of each page and stream the response in real time to the UI asking it to summarize the contents on the experience
      - Make sure to put a throttle on your API token here through OpenAI if they offer that in case some bad actor keeps reloading your page -- cap it at like a dollar per month or something super low

  - **For projects tab**

    - could add the drifting shapes animation in the background, maybe separate it out into its own library
      - might be cool if I add a visual boxes depicting how it works, maybe allowing someone to choose the colors they want to use in a sub-view
    - use query parameter hook
      - clean up this form a bit to be a clearer walkthrough

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
    - /lib/entity.ts

## Next.js Gotchas

- In dev mode only, there is a double render that occurs due to a React 18 feature
  - https://github.com/vercel/next.js/issues/35822
  - https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode

## Service Layer

- Currently we are using an API Gateway with a custom lambda authorizer which authenticates the requests to our experience service lambda, the experience service lambda then access dynamodb and return the contents of the requested experiences
- The following AWS diagram generally depicts the patter
  - https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html

### Service Layer Future

- A VPC would be better because we could ditch the API Gateway and the authorization lambda and hit the experience service lambda directly with our NextJS app if they are on the same VPC
  - The current blocker on this is that the VPC in AWS is likely going to cost far too much
  - https://aws.amazon.com/blogs/mobile/accessing-resources-in-a-amazon-virtual-private-cloud-amazon-vpc-from-next-js-api-routes/

## Database Layer

- DynamoDB is the cheapest way to pull off my currect way of doing things
- We want to be using the `Query` operation, not the `Scan` operation, due to the difference in compute and expense
- The difficulty is that `Query` requires that we always input a matching `Partition key`, and we cannot leverage the `Sort key` independently on a `Query`
- The current setup is the following:
  - A single Partition Key like, called `uuid` which share the name `matthewmessier.com-experiences`
  - Many different Sort Keys `startDate`

## App Deployment

- We currently deploy using AWS Amplify, tied to a specific github branch, `application/mmessier`

### App Deployment Future

- AWS has permissions to get updates on commits to that branch and then will run the pipeline to deploy it
- In the future, I may want to take that CI/CD pipeline back and run it in github actions, and then just do an amplify deploy via terraform
  - I also learned that terraform has a cloud, which I created a free account for, but if I wanted to run all of my operations from there, then I would need to deploy all of the assets for the lambdas and whatnot there as well
  - For the time being I've altered the "Execution Mode" at app.terraform.io to be "local" instead of "remote", read more on terraform execution modes [here](https://developer.hashicorp.com/terraform/cloud-docs/run/remote-operations#remote-operations-1)
