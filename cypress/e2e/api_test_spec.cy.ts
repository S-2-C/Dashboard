// describe("S2C API Tests", function () {
//   const baseUrl = "http://localhost:3000/connect"; // Replace with the actual base URL

//   beforeEach(function () {
//     cy.visit("/"); // Assuming you have some UI to go along with the API
//   });

//   describe("List Users:", () => {
//     it("fetches list of users successfully, response is correct", () => {
//       type User = {
//         Id: string;
//         Username: string;
//       };
//       cy.request(`${baseUrl}/ListUsers`).then((response) => {
//         console.log(response.body);
//         console.log(`${baseUrl}/ListUsers`);
//         expect(response.status).to.eq(200);
//         expect(response.body.message).to.eq(
//           "List of users retrieved successfully."
//         );
//         expect(response.body.data).to.be.an("array").and.have.length.above(0);
//         // Validate each user in the response body
//         response.body.data.forEach((user: User) => {
//           expect(user).to.have.property("Id").that.is.a("string");
//           expect(user).to.have.property("Username").that.is.a("string");
//         });
//       });
//     });
//   });

//   describe("S2C API Tests - ListQueues", function () {
//     it("fetches list of queues successfully, response is correct", () => {
//       type Queue = {
//         Id: string;
//         QueueType: string;
//         Name: string;
//       };
//       cy.request(`${baseUrl}/ListQueues`).then((response) => {
//         expect(response.status).to.eq(200);
//         expect(response.body.message).to.eq(
//           "List of queues retrieved successfully."
//         );
//         expect(response.body.data).to.be.an("array").and.have.length.above(0);
//         // Validate each queue in the response body
//         response.body.data.forEach((queue: Queue) => {
//           expect(queue).to.have.property("Id").that.is.a("string");
//           expect(queue).to.have.property("QueueType").that.is.a("string");
//           expect(queue).to.have.property("Name").that.is.a("string");
//         });
//       });
//     });
//   });

//   describe("S2C API Tests - DeleteUser", function () {
//     it("handles missing userId parameter", () => {
//       cy.request({
//         method: "DELETE",
//         url: `${baseUrl}/DeleteUser`,
//         failOnStatusCode: false,
//       }).then((response) => {
//         expect(response.status).to.eq(400);
//         expect(response.body.message).to.eq("Please provide a userId");
//       });
//     });

//     it("handles invalid userId parameter", () => {
//       cy.request({
//         method: "DELETE",
//         url: `${baseUrl}/DeleteUser?userId=invalid_user_id`,
//         failOnStatusCode: false,
//       }).then((response) => {
//         expect(response.status).to.eq(400);
//         expect(response.body.message).to.eq("Please provide a valid userId");
//       });
//     });
//   });

//   // To add Delete User test, but a flow must be implemented so it creates a user first, then deletes it
// });

describe("S2C API Tests", function () {
  const baseUrl = "http://localhost:3000/connect"; // Replace with the actual base URL

  beforeEach(function () {
    cy.visit("/"); // Assuming you have some UI to go along with the API
  });

  describe("List Users:", () => {
    it("fetches list of users successfully, response is correct", () => {
      type User = {
        Id: string;
        Username: string;
      };
      cy.request(`${baseUrl}/ListUsers`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(
          "List of users retrieved successfully."
        );
        expect(response.body.data).to.be.an("array").and.have.length.above(0);

        response.body.data.forEach((user: User) => {
          expect(user).to.have.property("Id").that.is.a("string");
          expect(user).to.have.property("Username").that.is.a("string");
        });
      });
    });
  });

  describe("List Queues:", () => {
    it("fetches list of queues successfully, response is correct", () => {
      type Queue = {
        Id: string;
        QueueType: string;
        Name: string;
      };
      cy.request(`${baseUrl}/ListQueues`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(
          "List of queues retrieved successfully."
        );
        expect(response.body.data).to.be.an("array").and.have.length.above(0);

        response.body.data.forEach((queue: Queue) => {
          expect(queue).to.have.property("Id").that.is.a("string");
          expect(queue).to.have.property("QueueType").that.is.a("string");
          expect(queue).to.have.property("Name").that.is.a("string");
        });
      });
    });
  });

  describe("Delete User:", () => {
    it("handles missing userId parameter", () => {
      cy.request({
        method: "DELETE",
        url: `${baseUrl}/DeleteUser`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq("Please provide a userId");
      });
    });

    it("handles invalid userId parameter", () => {
      cy.request({
        method: "DELETE",
        url: `${baseUrl}/DeleteUser?userId=invalid_user_id`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq("Please provide a valid userId");
      });
    });
  });

  describe("Get User Metrics:", () => {
    it("fetches user metrics successfully, response is correct", () => {
      cy.request(`${baseUrl}/GetUserMetricData`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  describe("Get Current Metrics:", () => {
    it("fetches current metrics successfully, response is correct", () => {
      cy.request(`${baseUrl}/GetMetricData`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  describe("List Contact Analysis Segments:", () => {
    it("handles missing contactId parameter", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/ListContactAnalysisSegments`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq("Please provide a contact Id");
      });
    });

    it("handles invalid contactId parameter", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/ListContactAnalysisSegments?contactId=invalid_contact_id`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.eq(
          "Contact Id not found please try again."
        );
      });
    });

    it("fetches contact analysis segments successfully, response is correct", () => {
      const validContactId = "your_valid_contact_id"; // Replace with a valid contact ID
      cy.request(
        `${baseUrl}/ListContactAnalysisSegments?contactId=${validContactId}`
      ).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(
          "Contact analysis segments retrieved successfully."
        );
        expect(response.body.data).to.be.an("array").and.have.length.above(0);
        // Add more assertions here as per your response structure
      });
    });
  });

  describe("Create and Delete User:", () => {
    it("creates and deletes a user successfully", () => {
      // Replace with your user creation endpoint and payload
      cy.request("POST", `${baseUrl}/CreateUser`, {
        Username: "testuser",
        // Other required fields
      }).then((createResponse) => {
        expect(createResponse.status).to.eq(201);
        const userId = createResponse.body.data.Id;

        // Now delete the created user
        cy.request("DELETE", `${baseUrl}/DeleteUser?userId=${userId}`).then(
          (deleteResponse) => {
            expect(deleteResponse.status).to.eq(200);
            expect(deleteResponse.body.message).to.eq(
              "User deleted successfully"
            );
          }
        );
      });
    });
  });
});
