# pc-graphql
PoC for the Graphql API at Permission Click

**Basic Concepts**

The two most important pieces of a GraphQL server are the `type definitions` and the `resolvers`. 

The types are declared in Schema Definition Language and are used as the "contract" between `backend` and `frontend`.
The resolvers are functions that instruct the GraphQL server how to act when it receives a `query` or `mutation`.

**Type Definitions**

In this project, the `type definitions` are located in the `src/schema.graphql` file. They are also used to generate the `src/types.ts` file which provides TypeScript with the
same types used by the GraphQL server. To do that run `yarn generate`. This way we have a single source of truth for the types in the server.

**Resolvers**

The resolvers are located in the `src/resolvers` folder. They are type safe functions that act like a "router" for the `queries` and `mutations` received by the server.
Every `query` and every `mutation` needs its own resolver function. In this project specifically, the resolver functions map to functions in `Models`. (Temporary name, accepting
better suggestions). These `Models` live on the `src/models` folder and their job is to house functions that call external API's or access databases and return the desired 
result for the `query` or `mutation` that originally called them.

This separation is completely optional. We could have resolver functions directly calling APIs, but by creating this middle step, we can reuse API methods and put business
rules / validations on the models and make the resolver act just like routers to them. This makes the code easier to reuse and maintain.

Besides `queries` and `mutations`, specific fields can have their own resolver functions. As can be seen in the resolvers folder for `DocumentVersion` for example.

**Data Access**

This GraphQL server access data both directly from the database, and using REST APIs. This shows the flexibility of the GraphQL architecture and how it canimprove end user 
experience. The user can get all information it needs from a single request to the GraphQL server, that will then make all the requests necessary to compose the information that 
will be sent back.

**Building and Starting the Server**

From the root folder run `yarn` to install all the dependencies and then `yarn start`. This will start a the GraphQL server and also a GraphQL Playground on `localhost:4000`.
On the GraphQL Playground you can write `queries` and `mutations` and run them against the server. Additionally, it provides access to the server's `Schema` containing all
type definitions and auto generated `Docs`, containing information about what `queries` and `mutations` are available to be executed on this server, what arguments they take and
what is the shape of the data that will be returned.

All this documentation is created automatically when the server instance starts.

**Tests**

TODO

**RoadMap**

- Discuss implementation of the GraphQL layer over REST / Direct access to DB
- Business logic
- Authentication
- Advanced cache (Redis / Azure...)
- Discuss if can be run as Azure Function
