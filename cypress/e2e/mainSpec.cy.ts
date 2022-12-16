/// <reference types="cypress" />
// @ts-check
import {_baseURL} from "../../src/api/constants";

describe('empty spec', () => {
  before(() => {
    cy.intercept("POST", `${_baseURL}/auth/login`).as("login");
    cy.intercept("GET", `${_baseURL}/ingredients`).as("ingredients");
    cy.intercept("POST", `${_baseURL}/orders`).as("orders");
    cy.intercept("POST", `${_baseURL}/auth/token`).as("refreshToken");


    cy.visit('http://localhost:3000/login')
    cy.get("[name^=email]").type("sum2108@yandex.ru");
    cy.get("[name^=password]").type("123123");
    cy.get("button").contains("Войти").click();
    cy.wait("@login");
  })

  it('should open ingredient popup, construct and send order', () => {
    cy.wait("@ingredients");
    cy.get("[class^=IngredientGroup_ingredient__]").first().click();
    cy.get("[class^=Modal_head__] button").click();

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
    cy.get("button").contains("Оформить заказ").as("submit");

    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@file").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@rings").trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    cy.get("@submit").click().wait("@orders");
    cy.get("[class^=Modal_head__] button").click();

  })
})