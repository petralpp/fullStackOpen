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
  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })
    it('a blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('The Test Blog')
      cy.get('#author').type('The Tester')
      cy.get('#url').type('http://www.tester.com')
      cy.contains('Add').click()

      cy.contains('The Test Blog The Tester')
    })

    describe('and when there are blogs created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'The Test Blog',
          author: 'The Tester',
          url: 'http://www.tester.com'
        })
        cy.createBlog({
          title: 'Another Test Blog',
          author: 'The Tester',
          url: 'http://www.tester.com'
        })
      })
      it('a blog can be liked', function() {
          cy.contains('The Test Blog').contains('View').click()
          cy.contains('Like').click()
          cy.get('.blog-div').contains('1')
        })

    })
  })
})