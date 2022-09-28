context(`Student Analysis`, () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/login`);
    cy.get(`input[name=loginEmail]`).type(`convener@gmail.com`);
    cy.get(`input[name=loginEmail]`).should(`have.value`, `convener@gmail.com`);

    cy.get(`input[name=loginPassword]`).type(`convener`);
    cy.get(`input[name=loginPassword]`).should(`have.value`, `convener`);

    cy.get(`button[name=loginButton]`).click();
  });

  it(`Upload File`, () => {
    cy.visit(`http://localhost:3000/convener/analysis`);
    cy.get(`input[name=dropFile]`).selectFile(`test/data/CS2withCS1.csv`);
  });
});
