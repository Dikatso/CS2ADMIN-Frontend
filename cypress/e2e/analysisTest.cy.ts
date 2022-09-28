context(`STudent Analysis`, () => {

  beforeEach(() => {

    cy.visit(`http://localhost:3000/convener/analysis`);

  });  
  
  it('Upload File', () => {
    cy.get('input[name=dropFile]').selectFile('CS2withCS1.csv')
  });

});