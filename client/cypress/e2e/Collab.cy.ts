describe('Add Collab, accept Collab, denny colab', () => {
  
  const username='cypress@test';
  const password='Cypress';
  const cypressCollab='cypressCollab';
  const cypressYoutubeCode='k5BNqwb4GXU';
  
  
  
  it('should open new Collab form', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Login').click();
    cy.get('.mainForm > input[placeholder="username"]').type(username);
    cy.get('.mainForm > input[placeholder="password"]').type(password).blur();
    cy.get('.mainForm button[type="submit"]').click();
    cy.url().should('include', `/profile/${username}`);
    cy.get('button[data-cy="new-collab"]').click();
  })
  it('should insert cypress collab and click create', ()=> {
    cy.get('input[placeholder="Cool Collab Name"]').type(cypressCollab);
    cy.get('input[placeholder="Youtube Video CODE"]').type(cypressYoutubeCode);
    cy.get('button[data-cy="new-collab"]').click();
  })
  it('should show new collab on profile', ()=> {
    cy.get('.collabList > :nth-child(1)').contains(cypressCollab);
    cy.get('.collabList > :nth-child(1)').contains(cypressYoutubeCode);
    cy.url().should('include', `/profile/${username}`);
  })

})