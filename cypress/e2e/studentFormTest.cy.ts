context(`Enquiry Submition Page`, () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/login`);

    cy.get(`input[name=loginEmail]`).type(`testEmail@gmail.com`);
    cy.get(`input[name=loginEmail]`).should(
      `have.value`,
      `testEmail@gmail.com`,
    );

    cy.get(`input[name=loginPassword]`).type(`testPassword`);
    cy.get(`input[name=loginPassword]`).should(`have.value`, `testPassword`);

    cy.get(`button[name=loginButton]`).click();
  });

  it(`Enter enquiry details`, () => {
    cy.visit(`http://localhost:3000/student/create`);

    cy.get(`input[name=courseInput]`).type(`CSC2001F`);
    cy.get(`input[name=courseInput]`).should(`have.value`, `CSC2001F`);

    cy.get(`input[name=selectComponent]`)
      .select(`TestConcession`)
      .should(`have.value`, `TestConcession`);

    cy.get(`input[name=file]`).selectFile(`file.json`);

    cy.get(`input[name=addInfo]`).type(`Additional Info.....`);
    cy.get(`input[name=addInfo]`).should(`have.value`, `Additional Info.....`);

    cy.get(`button[name=Submit]`).click();
  });
});
