describe("TS_DeleteUser", function () {
  const baseUrl = "http://localhost:3000/connect"; // Replace with the actual base URL
  beforeEach(function () {
    cy.visit("/");
  });

  describe("DeleteUser", function () {
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
});
