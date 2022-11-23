/* eslint-disable no-undef */
describe('Homepage', () => {

  it('sucessfully load the page', () => {
    cy.visit('http://localhost:3000/')
  })
  
})


describe('Register', () => {
  
  it('should register new user', () => {
    cy.contains('Register').click()
    cy.url().should('include', '/register')
    cy.get('[data-cy="username"]')
      .type('testUser123')
      .should('have.value', 'testUser123')

    cy.get('[data-cy="password"]')
      .type('12345678')
      .should('have.value', '12345678')

    cy.get('[data-cy="passwordConf"]')
      .type('12345678')
      .should('have.value', '12345678')

    cy.get('[data-cy="country"]')
      .type('Poland')
      .should('have.value', 'Poland')

    cy.get('.mainForm button[type="submit"]').click()

  })
})

describe('Login page', () => {

  it('should login existing user', () => {
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
})

describe('Logout', ()=> {
 
  it('should abort logout when NO button is clicked', () => {
    cy.contains('Logout').click()
    cy.url().should('include', '/logout')

    cy.get('button[data-cy="logout-no"]').click()
  }) 

   it('should logout a user if YES button is clicked', () => {
    cy.contains('Logout').click()
    cy.url().should('include', '/logout')

    cy.get('button[data-cy="logout-yes"]').click()
    cy.visit('http://localhost:3000/')
  })
})