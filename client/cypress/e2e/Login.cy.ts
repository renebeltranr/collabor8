describe('Register, Login, Logout', () => {
  const username='cypress@test';
  const password='Cypress';

  it('should load home page', () => {
    cy.visit('http://localhost:3000');
  })

  it('should be redirected successfully to login', () => {
    
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  
  });

  it('should successfully login', () => {
    
    cy.get('.mainForm > input[placeholder="username"]').type(username);
    cy.get('.mainForm > input[placeholder="password"]').type(password).blur();
    cy.get('.mainForm button[type="submit"]').click();

  })

  it('should successfully login and redirect to profile', () => {
    
    cy.url().should('include', `/profile/${username}`);

  })

  it('should successfully logout', () => {
    
    cy.contains('Logout').click();
    new Promise(()=>setTimeout(() => {
      return null
    }, 1500)).then();
    cy.get('button[data-cy="logout-yes"]').click();
    cy.visit('http://localhost:3000');
    cy.contains('Login');

  })

})