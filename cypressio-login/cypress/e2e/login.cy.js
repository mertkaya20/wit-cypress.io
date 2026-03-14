describe("Login Page", () => {
  //Arrange
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  //Act

  //Success scene
  it("Able to open success page", () => {
    cy.get('[type="email"]').type("General_Leuschke@hotmail.com");
    cy.get('[type="password"]').type("2odFMqYXH2fQasK");
    cy.get('[type="checkbox"]').check();
    cy.get('[type="submit"]').click();

    //Assert
    cy.url().should("include", "/main");
  });

  //Error scenes
  it("Unable to open success page with wrong email", () => {
    cy.get('[type="email"]').type("asd").blur();
    cy.get('[type="password"]').type("2odFMqYXH2fQasK");
    cy.get('[type="checkbox"]').check();

    //Assert
    cy.get('[data-id="email-p"]').should("be.visible");
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("Unable to open success page with wrong password", () => {
    cy.get('[type="email"]').type("General_Leuschke@hotmail.com");
    cy.get('[type="password"]').type("1234512").blur();
    cy.get('[type="checkbox"]').check();

    //Assert
    cy.get('[data-id="password-p"]').should("be.visible");
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("Unable to open succes page with both wrong", () => {
    cy.get('[type="email"]').type("asd").blur();
    cy.get('[type="password"]').type("1234512").blur();
    cy.get('[type="checkbox"]').check();

    //Assert
    cy.get('[data-id="email-p"]').should("be.visible");
    cy.get('[data-id="password-p"]').should("be.visible");
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("Unable to open succes page with unchecked box", () => {
    cy.get('[type="email"]').type("General_Leuschke@hotmail.com");
    cy.get('[type="password"]').type("2odFMqYXH2fQasK");

    //Assert
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("Unable to open success page with valid but unexist credentials", () => {
    cy.get('[type="email"]').type("mert@example.com");
    cy.get('[type="password"]').type("Yanlis1sifre");
    cy.get('[type="checkbox"]').check();
    cy.get('[type="submit"]').click();

    //Assert
    cy.url().should("include", "/error");
  });
});
