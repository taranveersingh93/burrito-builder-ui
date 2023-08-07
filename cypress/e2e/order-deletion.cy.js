describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: 'fetchedOrders'
    }).as('getOrders')
    cy.intercept("DELETE", "http://localhost:3001/api/v1/orders/1", {
      statusCode: 204
    }).as('deleteOrder')
    cy.visit('localhost:3000')
    cy.wait('@getOrders')
  })
  it('deletes order', () => {
    cy.get('.order').eq(0).find('button').click()
    cy.wait('@deleteOrder').then(() => {
      cy.get('.order').should('have.length', 2)
    })

  })
})