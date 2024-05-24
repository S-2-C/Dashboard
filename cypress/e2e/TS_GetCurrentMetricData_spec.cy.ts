describe("TS_GetCurrentMetricData", function () {
  const baseUrl = "http://localhost:3000/connect"; // Replace with the actual base URL
  beforeEach(function () {
    cy.visit("/");
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
});
