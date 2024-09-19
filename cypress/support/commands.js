// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... }
import * as customerManagerLanding from "../pages/CustomerManagerLanding"
import * as userCustomersLogin from "../pages/userCustomerLogin"
import * as managerCustomerSearch from "../pages/managerCustomerSearch"
import * as managerLanding from "../pages/managerLanding"
import * as customerLandingPage from "../pages/CustomerLandingPage"



Cypress.Commands.add('login',(usernanme)=>{
    cy.contains(customerManagerLanding.custLogin_btn).click()
    cy.get(userCustomersLogin.select_user).select(usernanme)
    cy.contains(userCustomersLogin.login_btn).should('be.visible').click()
})

Cypress.Commands.add('checkInitialAmount',()=>{
    cy.get(customerLandingPage.amount_text).eq(0).invoke('text').as('accountNumber')
    cy.get(customerLandingPage.amount_text).eq(1).invoke('text').as('InitialAmount').then((text)=>{
        cy.wrap(text).as('basicInitial')
        cy.log("Base Initial Amount is : "+ text)
    })
    cy.get(customerLandingPage.amount_text).eq(2).invoke('text').as('currency')
})

Cypress.Commands.add('DepositMoneyToAccount',(AmountToBeDeposited)=>{
        cy.contains(customerLandingPage.deposit_Link_to_open_btn).click()
        let inputAmount=AmountToBeDeposited
        cy.get(customerLandingPage.enter_amount).type(inputAmount)
        cy.get(customerLandingPage.submit_btn).contains('Deposit').click()
        cy.get(customerLandingPage.message).should('have.text','Deposit Successful')

})

Cypress.Commands.add('VerifyCurrentTransaction',(AmountDeposited, TimeString)=>{
    cy.wait(2000)
    cy.contains(customerLandingPage.transaction_modal_open_btn).click()
    cy.get(customerLandingPage.transaction_table_amount_text).each((el, index, list)=>{
    expect(Number(el.text())).to.equal(AmountDeposited)
         expect(el.prev().text()).to.contains(TimeString)
})
})

Cypress.Commands.add('ManagerLogin',()=>{
    cy.contains(customerManagerLanding.managerLogin_btn).click()
})

Cypress.Commands.add('ClickToViewCustomer',()=>{
        cy.contains(managerLanding.select_user).click()     
})

Cypress.Commands.add('SearchCustomerByAnyOptionAndVerifyTheResult',(SearchString)=>{
    let searchText=SearchString
        cy.get(managerCustomerSearch.select_user).type(searchText)
        cy.wait(1000)
        cy.get(managerCustomerSearch.table_row_picker).each((el, index, list)=>{
            expect((el.find('td').text()).toLowerCase()).contains(searchText.toLowerCase())
                })
    })

