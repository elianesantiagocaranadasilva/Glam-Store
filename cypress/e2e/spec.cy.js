describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  });

  it('botões clicaveis', function() {
    cy.visit('http://127.0.0.1:5500/index.html')
    
  });
})