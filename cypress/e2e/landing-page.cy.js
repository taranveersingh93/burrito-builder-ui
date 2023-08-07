describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: 'fetchedOrders'
    }).as('getOrders')
    cy.visit('localhost:3000')
    cy.wait('@getOrders')
  })
  it('checks for the right elements', () => {
    cy.get('h1').contains('Burrito Builder')
    cy.get('form').children().should('have.length', 15)
    cy.get('.order').should('have.length', 3)
    cy.get('.order').eq(0).find('h3').contains('Pat')
    cy.get('.order').eq(0).find('li').eq(0).contains('beans')
    cy.get('.order').eq(0).find('li').eq(1).contains('lettuce')
    cy.get('.order').eq(0).find('li').eq(2).contains('carnitas')
    cy.get('.order').eq(0).find('li').eq(3).contains('queso fresco')
    cy.get('.order').eq(0).find('li').eq(4).contains('jalapeno')

  })
})