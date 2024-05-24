describe("TS_GetMetricDataV2", function () {
  const baseUrl = "http://localhost:3000/connect"; // Replace with the actual base URL
  beforeEach(function () {
    cy.visit("/");
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
});
