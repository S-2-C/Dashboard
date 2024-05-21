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

  describe("Get Current Metrics:", () => {
    it("fetches user metrics successfully, response is correct", () => {
      cy.request(`${baseUrl}/GetCurrentMetricData`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  describe("Get Current Metrics 2:", () => {
    it("returns data in the correct format", () => {
      cy.request(`${baseUrl}/GetCurrentMetricData`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("MetricResults"); // Adjust to the actual response property
        expect(response.body.MetricResults).to.be.an("array");
      });
    });
  });

  describe("Get Current Metrics 3:", () => {
    it("fetches user metrics successfully, response is correct", () => {
      cy.request(`${baseUrl}/GetCurrentMetricData`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body)
          .to.have.property("MetricResults")
          .that.is.an("array");

        type MetricResult = {
          Collections: {
            Metric: {
              Name: string;
              Unit: string;
            };
            Value: number;
          }[];
          Dimensions: {
            Queue: {
              Id: string;
              Arn: string;
            };
            Channel: string;
          };
        };

        response.body.MetricResults.forEach((metric: MetricResult) => {
          expect(metric).to.have.property("Collections").that.is.an("array");
          metric.Collections.forEach((collection) => {
            expect(collection).to.have.property("Metric").that.is.an("object");
            expect(collection.Metric)
              .to.have.property("Name")
              .that.is.a("string");
            expect(collection.Metric)
              .to.have.property("Unit")
              .that.is.a("string");
            expect(collection).to.have.property("Value").that.is.a("number");
          });

          expect(metric).to.have.property("Dimensions").that.is.an("object");
          expect(metric.Dimensions)
            .to.have.property("Queue")
            .that.is.an("object");
          expect(metric.Dimensions.Queue)
            .to.have.property("Id")
            .that.is.a("string");
          expect(metric.Dimensions.Queue)
            .to.have.property("Arn")
            .that.is.a("string");
          expect(metric.Dimensions)
            .to.have.property("Channel")
            .that.is.a("string");
        });
      });
    });
  });

  describe("Get Historic Metrics:", () => {
    it("fetches historic metrics successfully, response is correct", () => {
      cy.request(`${baseUrl}/GetMetricDataV2`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  describe("Get Historic Metrics 2:", () => {
    it("returns data in the correct format", () => {
      cy.request(`${baseUrl}/GetMetricDataV2`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data1");
        expect(response.body).to.have.property("data2");

        expect(response.body.data1).to.be.an("object");
        expect(response.body.data2).to.be.an("object");

        expect(response.body.data1)
          .to.have.property("MetricResults")
          .that.is.an("array");

        expect(response.body.data2)
          .to.have.property("MetricResults")
          .that.is.an("array");
      });
    });
  });

  describe("Get Historic Metrics 3:", () => {
    it("fetches historic metrics successfully, response is correct", () => {
      cy.request(`${baseUrl}/GetMetricDataV2`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data1").that.is.an("object");
        expect(response.body).to.have.property("data2").that.is.an("object");

        type MetricCollection = {
          Metric: {
            Name: string;
          };
          Value?: number;
        };

        type MetricResult = {
          Collections: MetricCollection[];
        };

        expect(response.body.data1)
          .to.have.property("MetricResults")
          .that.is.an("array");
        response.body.data1.MetricResults.forEach((metric: MetricResult) => {
          expect(metric).to.have.property("Collections").that.is.an("array");
          metric.Collections.forEach((collection) => {
            expect(collection).to.have.property("Metric").that.is.an("object");
            expect(collection.Metric)
              .to.have.property("Name")
              .that.is.a("string");
            if (collection.Value !== undefined) {
              expect(collection).to.have.property("Value").that.is.a("number");
            }
          });
        });

        expect(response.body.data2)
          .to.have.property("MetricResults")
          .that.is.an("array");
        response.body.data2.MetricResults.forEach((metric: MetricResult) => {
          expect(metric).to.have.property("Collections").that.is.an("array");
          metric.Collections.forEach((collection) => {
            expect(collection).to.have.property("Metric").that.is.an("object");
            expect(collection.Metric)
              .to.have.property("Name")
              .that.is.a("string");
            if (collection.Value !== undefined) {
              expect(collection).to.have.property("Value").that.is.a("number");
            }
          });
        });
      });
    });
  });

  describe("API Tests Chat Bot", () => {
    it("Returns results for a valid question", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:3000/chatBot?question=delivery",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("ragChainResult");
        expect(response.body).to.have.property("retrievedDocs");
      });
    });
  });
});
