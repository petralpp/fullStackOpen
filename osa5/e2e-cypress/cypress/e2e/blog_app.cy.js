describe('Blog app', () => {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })
  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('Login').click()
      cy.contains('Matti Luukkainen logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluu')
      cy.get('#password').type('salainen')
      cy.contains('Login').click()
      cy.contains('invalid username or password')
    })
  })
})