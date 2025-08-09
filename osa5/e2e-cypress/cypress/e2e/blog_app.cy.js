describe('Blog app', () => {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
})
  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })
})