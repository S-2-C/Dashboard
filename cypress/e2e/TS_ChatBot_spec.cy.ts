describe("TS_ChatBot", function () {
  const baseUrl = "http://localhost:3000/connect"; // Replace with the actual base URL
  beforeEach(function () {
    cy.visit("/");
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
