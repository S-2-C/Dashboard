describe('S2C API Tests', function () {
    const baseUrl = 'http://localhost:3000/connect'; // Replace with the actual base URL

    beforeEach(function () {
        cy.visit('/'); // Assuming you have some UI to go along with the API
    });


    describe('List Users:', () => {
        it('fetches list of users successfully, response is correct', () => {
            type User = {
                Id: string;
                Username: string;
            };
            cy.request(`${baseUrl}/ListUsers`).then((response) => {
                console.log(response.body);
                console.log(`${baseUrl}/ListUsers`)
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('List of users retrieved successfully.');
                expect(response.body.data).to.be.an('array').and.have.length.above(0);
                // Validate each user in the response body
                response.body.data.forEach((user: User) => {
                    expect(user).to.have.property('Id').that.is.a('string');
                    expect(user).to.have.property('Username').that.is.a('string');
                });
            });
        });
    });

    describe('S2C API Tests - ListQueues', function () {
        it('fetches list of queues successfully, response is correct', () => {
            type Queue = {
                Id: string;
                QueueType: string;
                Name: string;
            };
            cy.request(`${baseUrl}/ListQueues`).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('List of queues retrieved successfully.');
                expect(response.body.data).to.be.an('array').and.have.length.above(0);
                // Validate each queue in the response body
                response.body.data.forEach((queue: Queue) => {
                    expect(queue).to.have.property('Id').that.is.a('string');
                    expect(queue).to.have.property('QueueType').that.is.a('string');
                    expect(queue).to.have.property('Name').that.is.a('string');
                });
            });
        });
    });

    describe('S2C API Tests - DeleteUser', function () {
        it('handles missing userId parameter', () => {
            cy.request({
                method: 'DELETE',
                url: `${baseUrl}/DeleteUser`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq('Please provide a userId');
            });
        });

        it('handles invalid userId parameter', () => {
            cy.request({
                method: 'DELETE',
                url: `${baseUrl}/DeleteUser?userId=invalid_user_id`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq('Please provide a valid userId');
            });
        });
    });

    // To add Delete User test, but a flow must be implemented so it creates a user first, then deletes it



});
