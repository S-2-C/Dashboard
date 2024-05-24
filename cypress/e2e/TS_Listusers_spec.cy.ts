describe("TS_Listusers", function () {
  const baseUrl = "http://localhost:3000/connect"; // Replace with the actual base URL

  beforeEach(function () {
    cy.visit("/");
  });

  describe("ListUsers", () => {
    it("fetches list of users successfully, response is correct", () => {
      type User = {
        Id: string;
        Username: string;
      };
      cy.request(`${baseUrl}/ListUsers`).then((response) => {
        console.log(response.body);
        console.log(`${baseUrl}/ListUsers`);
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(
          "List of users retrieved successfully."
        );
        expect(response.body.data).to.be.an("array").and.have.length.above(0);
        // Validate each user in the response body
        response.body.data.forEach((user: User) => {
          expect(user).to.have.property("Id").that.is.a("string");
          expect(user).to.have.property("Username").that.is.a("string");
        });
      });
    });
  });
});
