/// <reference types="cypress" />
describe('Customer Scenarios',function(){
let bankdata
    beforeEach(function() { 
        cy.visit(Cypress.env('url'))
        cy.fixture('bank').then(function(data) {
            bankdata = data
            cy.log(bankdata.customerName+"asadsdasdasdsadsa")
            })
         })
            
    it("Deposit Amount and Verify",()=>{

        cy.login(bankdata.customerName)
        cy.checkInitialAmount()
        cy.DepositMoneyToAccount(bankdata.Amount)
                cy.get('div[ng-hide="noAccount"] strong').eq(1).then((afterAmount)=>{
            let finalAmount=Number(afterAmount.text())
            cy.log('finalAmount :' + finalAmount)
            
            cy.get('@basicInitial').then((initialAmount)=>{ 
                cy.log("inital Amount : " +initialAmount)
            expect(finalAmount-Number(initialAmount)).to.equal(bankdata.Amount)
            cy.wrap(finalAmount).as('basicInitial')
        })
            })
            
        })
    

    it('Deposit Amount and Verify the entry on Transactions Page',()=>{
        const moment = require('moment');
       
        cy.login(bankdata.customerName)
        cy.DepositMoneyToAccount(bankdata.Amount)
        cy.get('[ng-show="message"]').should('have.text','Deposit Successful')
            const time =moment().format('MMM DD, YYYY h:mm')
        cy.VerifyCurrentTransaction(bankdata.Amount,time)
        
    })
})