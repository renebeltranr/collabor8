/* eslint-disable no-undef */
describe('New Collab', ()=> {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.contains('Login').click();
    cy.url().should('include', '/login')
    cy.get('[data-cy="username"]')
      .type('mariawaria')
      .should('have.value', 'mariawaria')

    cy.get('[data-cy="password"]')
      .type('12345678')
      .should('have.value', '12345678')

    cy.get('.mainForm button[type="submit"]').click()

  })

  it('should create a new collab', function () {
    cy.visit('http://localhost:3000/profile/mariawaria') 
    
  })

})