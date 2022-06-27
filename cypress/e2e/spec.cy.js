describe('User Onboarding', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("sanity check", () => {
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5); 
    expect({}).not.to.equal({});
    expect({}).to.eql({}); 
  })

  const fooInput = () => cy.get("input[name=foobar]")
  const userInput = () => cy.get("input[name=username]");
  const emailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const tosInput = () => cy.get("input[name=tos]");
  const submitBtn = () => cy.get("input[name=submit]");

  it("the proper elements are showing", () => {
    userInput().should("exist");
    emailInput().should("exist");
    passwordInput().should("exist");
    fooInput().should("not.exist");
    tosInput().should("exist");
    submitBtn().should("exist");
  })

  describe("Filling out inputs and cancelling", () => {
    
    it("submit button starts off disabled", () => {
      submitBtn().should("be.disabled");
    })

    it("can type in the inputs", () => {
      userInput()
        .should("have.value", "")
        .type("testing one two")
        .should("have.value", "testing one two")

      emailInput()
      .should("have.value", "")
      .type("testing one two three")
      .should("have.value", "testing one two three")

      passwordInput()
      .should("have.value", "")
      .type("still testing")
      .should("have.value", "still testing")
    })

    it("the submit button enables when inputs are filled out and tos checked", () => {
      userInput().type("Matt");
      emailInput().type("matt@something.com");
      passwordInput().type("foobar");
      tosInput().click();
      submitBtn().should("not.be.disabled");
    })

    it("the submit button does not enable without tos", () => {
      userInput().type("Matt");
      emailInput().type("matt@something.com");
      passwordInput().type("foobar");
      submitBtn().should("be.disabled");
    })
  })

})