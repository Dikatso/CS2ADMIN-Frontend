context(`Register Page`, () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/register`);
  });

  it(`Enter user details and sign up`, () => {
    cy.get(`input[name=registerName]`).type(`testName`);
    cy.get(`input[name=registerName]`).should(`have.value`, `testName`);

    cy.get(`input[name=registerSurname]`).type(`testSurname`);
    cy.get(`input[name=registerSurname]`).should(`have.value`, `testSurname`);

    cy.get(`input[name=registerEmail]`).type(`testEmail@gmail.com`);
    cy.get(`input[name=registerEmail]`).should(
      `have.value`,
      `testEmail@gmail.com`,
    );

    cy.get(`input[name=registerUctNumber]`).type(`testUctNumber001`);
    cy.get(`input[name=registerUctNumber]`).should(
      `have.value`,
      `testUctNumber001`,
    );

    cy.get(`input[name=registerPassword]`).type(`testPassword`);
    cy.get(`input[name=registerPassword]`).should(`have.value`, `testPassword`);

    cy.get(`button[name=registerButton]`).click();
  });
});
