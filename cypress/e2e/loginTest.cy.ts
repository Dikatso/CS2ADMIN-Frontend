context(`Login Page`, () => {

  beforeEach(() => {

    cy.visit(`http://localhost:3000/login`);

  });  
  
  it('Enter Email Address', () => {
    cy.get("input[name=loginEmail]").type('convener@gmail.com')
    cy.get("input[name=loginEmail]").should('have.value', 'convener@gmail.com')
  });

  it('Enter Password', () => {
    cy.get("input[name=loginPassword]").type('convener')
    cy.get("input[name=loginPassword]").should('have.value', 'convener')
  });


  it(`Submit button `, () => {

    cy.get(`button[name=loginButton]`).click();

  });


});