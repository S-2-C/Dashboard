import awsExports from "../../src/aws-exports";
/*
describe("TS_VisState", function () {
  const gqlEndpoint = awsExports.aws_appsync_graphqlEndpoint;
  const apiKey = awsExports.aws_appsync_apiKey;
  const offlineAgentId = "tec@banzo.dev";
  let agentName;
  let agentRole;

  beforeEach(function () {
    cy.visit("/AgentManagement");
  });

  describe("Offline/Online", () => {
    it("changes agent status from offline to online and back", () => {
      // Step 1: Sign in
      cy.get(selectors.emailInput).type("tec@banzo.dev");
      cy.get(selectors.signInPasswordInput).type("Welcome2024");
      cy.get(selectors.signInButton).contains("Sign in").click();
      cy.wait(3000);
      // Step 2: Check if the page is loaded
      cy.get("h1").contains("Agent Management");
      // Step 3: Send appsync query to getAgent to check if the agent is offline and get the agent name
      cy.request({
        url: gqlEndpoint,
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: {
          query: `query GetAgent($id: ID!) {
            getUser(id: $id) {
              id
              name
              role
            }
          }`,
          variables: {
            id: offlineAgentId,
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        console.log(response.body);
        expect(response.body.data.getUser.id).to.eq(offlineAgentId);

        agentName = response.body.data.getUser.name.split(" ")[0];
        agentRole = response.body.data.getUser.role;

        if (response.body.data.getUser.isOnCall) {
          // if the agent is online, error out
          throw new Error("Agent is online, cannot proceed with the test");
        }

        // if the role is supervisor, check if the agent is in the offline supervisors list
        if (agentRole === "SUPERVISOR") {
          cy.get(selectors.offlineSupervisor).contains(agentName);
        } else {
          cy.get(selectors.offlineAgents).contains(agentName);
        }

        // Step 4: Send appsync query to updateAgent to change the agent status to online
        cy.request({
          url: gqlEndpoint,
          method: "POST",
          headers: {
            "x-api-key": apiKey,
          },
          body: {
            query: `mutation UpdateAgent($input: UpdateUserInput!) {
              updateUser(input: $input) {
                needsHelp
                isOnCall
                id
                role
                arn
                createdAt
                name
                profilePic
                updatedAt
              }
            }`,
            variables: {
              input: {
                id: offlineAgentId,
                isOnCall: true,
              },
            },
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data.updateUser).to.be.an("object");
          expect(response.body.data.updateUser.id).to.eq(offlineAgentId);
          expect(response.body.data.updateUser.isOnCall).to.eq(true);
        });

        cy.wait(3000);

        // Step 5: Check if the agent moved to online
        cy.get(selectors.activeUsers).contains(agentName);

        // Step 6: Send appsync query to updateAgent to change the agent status to offline
        cy.request({
          url: gqlEndpoint,
          method: "POST",
          headers: {
            "x-api-key": apiKey,
          },
          body: {
            query: `mutation UpdateAgent($input: UpdateUserInput!) {
              updateUser(input: $input) {
                needsHelp
                isOnCall
                id
                role
                arn
                createdAt
                name
                profilePic
                updatedAt
              }
            }`,
            variables: {
              input: {
                id: offlineAgentId,
                isOnCall: false,
                needsHelp: false,
              },
            },
          },
        });
      });
    });
  });

  describe("Needs Help", () => {
    it("changes agent status from not needing help to needing help and back", () => {
      // Step 1: Sign in
      cy.get(selectors.emailInput).type("tec@banzo.dev");
      cy.get(selectors.signInPasswordInput).type("Welcome2024");
      cy.get(selectors.signInButton).contains("Sign in").click();
      cy.wait(3000);
      // Step 2: Check if the page is loaded

      cy.get("h1").contains("Agent Management");
      // Step 3: Send appsync query to getAgent to check if the agent needs help and get the agent name
      cy.request({
        url: gqlEndpoint,
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: {
          query: `query GetAgent($id: ID!) {
            getUser(id: $id) {
              id
              name
              role
              needsHelp
            }
          }`,
          variables: {
            id: offlineAgentId,
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        console.log(response.body);
        expect(response.body.data.getUser.id).to.eq(offlineAgentId);

        agentName = response.body.data.getUser.name.split(" ")[0];
        agentRole = response.body.data.getUser.role;

        if (response.body.data.getUser.needsHelp) {
          // if the agent needs help, error out
          throw new Error("Agent needs help, cannot proceed with the test");
        }

        // if the role is supervisor, check if the agent is in the offline supervisors list
        if (agentRole === "SUPERVISOR") {
          cy.get(selectors.offlineSupervisor).contains(agentName);
        } else {
          cy.get(selectors.offlineAgents).contains(agentName);
        }

        // Step 4: Send appsync query to updateAgent to change the agent status to needs help and online
        cy.request({
          url: gqlEndpoint,
          method: "POST",
          headers: {
            "x-api-key": apiKey,
          },
          body: {
            query: `mutation UpdateAgent($input: UpdateUserInput!) {
              updateUser(input: $input) {
                needsHelp
                isOnCall
                id
                role
                arn
                createdAt
                name
                profilePic
                updatedAt
              }
            }`,
            variables: {
              input: {
                id: offlineAgentId,
                needsHelp: true,
                isOnCall: true,
              },
            },
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data.updateUser).to.be.an("object");
          expect(response.body.data.updateUser.id).to.eq(offlineAgentId);
          expect(response.body.data.updateUser.needsHelp).to.eq(true);
        });

        cy.wait(3000);

        // Step 5: Check if the agent moved to needs help
        cy.get(selectors.alertUsers).contains(agentName);

        // Step 6: Send appsync query to updateAgent to change the agent status to not needing help
        cy.request({
          url: gqlEndpoint,
          method: "POST",
          headers: {
            "x-api-key": apiKey,
          },
          body: {
            query: `mutation UpdateAgent($input: UpdateUserInput!) {
              updateUser(input: $input) {
                needsHelp
                isOnCall
                id
                role
                arn
                createdAt
                name
                profilePic
                updatedAt
              }
            }`,
            variables: {
              input: {
                id: offlineAgentId,
                needsHelp: false,
                isOnCall: false,
              },
            },
          },
        });
      });
    });
  });
});

export const selectors = {
  // Auth
  emailInput: 'input[type="email"]',
  signInPasswordInput: 'input[type="password"]',
  signInButton: 'button[type="submit"]', // or use '.amplify-button--primary.amplify-button--fullwidth' or 'cy.contains('button', 'Sign in')'
  // Agent Management
  offlineAgents: "#offlineUsers", // id of the offline agents list
  offlineSupervisor: "#offlineSupervisors", // id of the offline supervisors list
  alertUsers: "#alertUsers", // id of the alert users list
  activeUsers: "#activeUsers", // id of the active users list
};
*/