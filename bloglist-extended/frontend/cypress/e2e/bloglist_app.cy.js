describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = { username: "testuser", password: "password" };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
    cy.get("input");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("password");
      cy.get("#login-btn").click();

      cy.contains("logged in as testuser");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("wrong");
      cy.get("#login-btn").click();

      cy.contains("Login");
      cy.get(".alert").contains("wrong username or password");
      cy.get("html").should("not.contain", "logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "password" });
    });

    it("A blog can be created", function () {
      cy.contains("Create new").click();
      cy.get("#title").type("testblog");
      cy.get("#author").type("author");
      cy.get("#url").type("url");
      cy.contains("create").click();

      cy.contains("testblog");
      cy.contains("By author");
      cy.get(".alert").contains("New entry created: testblog");

      cy.request("GET", `${Cypress.env("BACKEND")}/blogs`).then(({ body }) => {
        expect(body.length).to.eq(1);
      });
    });

    describe("and after creating three blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test1",
          author: "user1",
          url: "link1",
        });
        cy.createBlog({
          title: "test2",
          author: "user2",
          url: "link2",
        });
        cy.createBlog({
          title: "test3",
          author: "user3",
          url: "link3",
        });
      });

      it("User can like a blog", function () {
        cy.contains("test1").contains("view").click();
        cy.contains("Likes: 0");
        cy.contains("like").click();
        cy.contains("Likes: 1");
      });

      it("User can delete their own blog", function () {
        cy.contains("test1").contains("view").click();
        cy.contains("remove").click();
        cy.get("html").should("not.contain", "test1");
      });

      it("Another user cannot see the remove button", function () {
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
          username: "user2",
          password: "password",
        });
        cy.contains("logout").click();
        cy.login({ username: "user2", password: "password" });
        cy.contains("test1").contains("view").click();
        cy.contains("remove").should("not.be.visible");
      });

      it.only("Sorts blogs from highest to lowest likes", function () {
        cy.contains("test1").contains("view").click();
        for (let i = 0; i < 4; i += 1)
          cy.get(".moreInfo").eq(0).contains("like").click();

        cy.contains("test2").contains("view").click();
        for (let i = 0; i < 9; i += 1)
          cy.get(".moreInfo").eq(1).contains("like").click();

        cy.contains("test3").contains("view").click();
        for (let i = 0; i < 11; i += 1)
          cy.get(".moreInfo").eq(2).contains("like").click();

        cy.visit("");

        cy.get(".blog").eq(0).should("contain", "test3");
        cy.get(".blog").eq(1).should("contain", "test2");
        cy.get(".blog").eq(2).should("contain", "test1");
      });
    });
  });
});
