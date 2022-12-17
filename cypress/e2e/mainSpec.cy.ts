/// <reference types="cypress" />
// @ts-check
import {BASE_URL} from "../../src/api/constants";

const user = {
  email: "sum2108@yandex.ru",
  password: "123123"
}
const localhost = 'http://localhost:3000/login';

describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept("POST", `${BASE_URL}/auth/login`).as("login");
    cy.intercept("GET", `${BASE_URL}/ingredients`).as("ingredients");
    cy.intercept("POST", `${BASE_URL}/orders`).as("orders");

    cy.visit(localhost)
    cy.get("[name^=email]").type(user.email);
    cy.get("[name^=password]").type(user.password);
    cy.get("button").contains("Войти").click();
    cy.wait("@login");
  })

  it('should open ingredient popup', () => {
    cy.wait("@ingredients");
    cy.get("[class^=IngredientGroup_ingredient__]").first().click();
    cy.get("[class^=Modal_head__] button").click();
  })

  it("should send order", () => {
    cy.get("[class^=IngredientGroup_ingredient__]")
        .contains("булка")
        .first()
        .as("bun")

    cy.get("[class^=IngredientGroup_ingredient__]")
        .contains("Филе Люминесцентного тетраодонтимформа")
        .first()
        .as("file")

    cy.get("[class^=IngredientGroup_ingredient__]")
        .contains("Хрустящие минеральные кольца")
        .first()
        .as("rings")

    cy.get("[class^=BurgerConstructor_ingredients_container__").as("constructor");

    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@file").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@rings").trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    cy.get("button").contains("Оформить заказ").as("submit");
    cy.get("@submit").click().wait("@orders");
    cy.get("[class^=Modal_head__] button").click();
  })
})