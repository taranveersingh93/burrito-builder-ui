describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: 'fetchedOrders'
    })
  })
  it('passes', () => {
    cy.visit('localhost:3000')
  })
})