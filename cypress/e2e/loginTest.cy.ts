context(`Login Page`, () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/login`);
  });

  it(`Enter user details and login`, () => {
    cy.get(`input[name=loginEmail]`).type(`testEmail@gmail.com`);
    cy.get(`input[name=loginEmail]`).should(
      `have.value`,
      `testEmail@gmail.com`,
    );

    cy.get(`input[name=loginPassword]`).type(`testPassword`);
    cy.get(`input[name=loginPassword]`).should(`have.value`, `testPassword`);

    cy.get(`button[name=loginButton]`).click();
  });
});
