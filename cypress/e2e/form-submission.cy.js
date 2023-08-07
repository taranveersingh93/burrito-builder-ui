describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: 'fetchedOrders'
    }).as('getOrders')
    cy.visit('localhost:3000')
    cy.wait('@getOrders')
  })
  it('should open with the right form values', () => {
    cy.get('input[name="name"]').should('have.value', '')
    cy.get('form').find('p').contains('Order: Nothing selected')
    cy.get('form').find('button').should('be.disabled')
    cy.get('form').children().should('have.length', 15)
  })

  it('should submit an order', () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      statusCode: 201,
      fixture: 'postResponse'
    }).as('postOrder')
    cy.get('input[name="name"]').type('Test').should('have.value', 'Test')
    cy.get('form').find('button').should('be.disabled')
    cy.get('button[name="steak"]').click()
    cy.get('form').find('button').should('be.enabled')
    cy.get('form').find('p').contains('Order: steak')
    cy.get('button[name="beans"]').click()
    cy.get('button[name="hot sauce"]').click()
    cy.get('form').find('p').contains('Order: steak, beans, hot sauce')
    cy.get('form').find('button').last().click()
    cy.wait('@postOrder').then(() => {
      cy.get('.order').should('have.length', 4)
      cy.get('.order').eq(3).find('h3').contains('Test')
      cy.get('.order').eq(3).find('li').eq(0).contains('steak')
      cy.get('.order').eq(3).find('li').eq(1).contains('beans')
      cy.get('.order').eq(3).find('li').eq(2).contains('hot sauce')
    })
  })
})