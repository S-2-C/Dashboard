describe("TS_ListQueues", function () {
  const baseUrl = "http://localhost:3000/connect"; // Replace with the actual base URL
  beforeEach(function () {
    cy.visit("/");
  });

  describe("ListQueues", function () {
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
        // Validate each queue in the response body
        response.body.data.forEach((queue: Queue) => {
          expect(queue).to.have.property("Id").that.is.a("string");
          expect(queue).to.have.property("QueueType").that.is.a("string");
          expect(queue).to.have.property("Name").that.is.a("string");
        });
      });
    });
  });
});
