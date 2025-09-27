describe("Authentication Flow", () => {
  it("should log in successfully with correct credentials and redirect to admin", () => {
    cy.intercept("POST", "**/login", { fixture: "loginSuccess.json" }).as(
      "loginRequest"
    );
    cy.visit("/login");
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("password123");
    cy.get("button[type='submit']").click();
    cy.wait("@loginRequest");
    cy.url().should("include", "/admin");
    cy.contains("h1", "Welcome, TestUser!").should("be.visible");
  });

  it("should display an error message with incorrect credentials", () => {
    cy.intercept("POST", "**/login", {
      statusCode: 401,
      body: { message: "Invalid email or password." },
    }).as("failedLoginRequest");
    cy.visit("/login");
    cy.get("#email").type("wrong@example.com");
    cy.get("#password").type("wrongpassword");
    cy.get("button[type='submit']").click();
    cy.wait("@failedLoginRequest");
    cy.contains("Invalid email or password.").should("be.visible");
  });

  it("should register a new user successfully and redirect to login", () => {
    cy.intercept("POST", "**/register", { fixture: "registerSuccess.json" }).as(
      "registerRequest"
    );

    cy.visit("/register");

    cy.get("#email").type("newuser@example.com");
    cy.get("#password").type("newpassword123");
    cy.get("#nickname").type("newbie");
    cy.get("#fullname").type("New User");
    cy.get("#corporate_name").type("New Corp");
    cy.get("#corporate_code").type("NC123");
    cy.get("#corporate_address").type("123 New Street");

    cy.get("button[type='submit']").click();

    cy.wait("@registerRequest");

    cy.contains("Registration successful! Please log in.").should("be.visible");

    cy.url().should("include", "/login");
  });
});
