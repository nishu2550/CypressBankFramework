/// <reference types="cypress" />

describe('Customer Scenarios',function(){
    let bankdata
        beforeEach(function() { 
            cy.visit(Cypress.env('url'))
            cy.fixture('bank').then(function(data) {
                bankdata = data
                cy.log(bankdata.CustomerDataToSearch+"asadsdasdasdsadsa")
                })
             })
    
    it("Framing all",()=>{

        cy.ManagerLogin()
        cy.ClickToViewCustomer()
        cy.SearchCustomerByAnyOptionAndVerifyTheResult(bankdata.CustomerDataToSearch)
        
    })
})
