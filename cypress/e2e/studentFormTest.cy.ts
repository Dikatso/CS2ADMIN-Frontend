context(`Enquiry Submition Page`, () => {

  beforeEach(() => {

    cy.visit(`http://localhost:3000/student/create`);

  });  
  
  it('Enter Course Code', () => {
    cy.get("input[name=courseInput]").type('CSC2001F')
    cy.get("input[name=courseInput]").should('have.value', 'CSC2001F')
  });
   
  it('Choose enquiry test', () => {
    cy.get('input[name=selectComponent]').select('TestConcession').should('have.value', 'TestConcession')
  });


  it('Upload File', () => {
    cy.get('input[name=file]').selectFile('file.json')
  });

  it('Enter Additional Code', () => {
    cy.get("input[name=addInfo]").type('Additional Info.....')
    cy.get("input[name=addInfo]").should('have.value', 'Additional Info.....')
  });


  it(`Submit button should be pressed`, () => {

    cy.get(`button[name=Submit]`).click();

  });


});