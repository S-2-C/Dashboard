describe("TS_ListRealtimeContactAnalysisSegments", function () {
    const baseUrl = "http://localhost:3000/connect"; // Replace with the actual base URL
    beforeEach(function () {
        cy.visit("/");
    });

    describe("ListRealtimeContactAnalysisSegments", function () {
        it("handles missing Contact Id parameter", () => {
            cy.request({
                method: "GET",
                url: `${baseUrl}/ListRealtimeContactAnalysisSegments`,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                console.log(response.body);
                expect(response.body.message).to.eq("Please provide a contact Id");
            });
        });

        it("handles invalid contact Id", () => {
            cy.request({
                method: "GET",
                url: `${baseUrl}/ListRealtimeContactAnalysisSegments?contactId=invalid_user_id`,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body.message).to.eq("Contact Id not found please try again.");
            });
        });
    });
});
