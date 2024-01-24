describe('login_And_Logout', () => {
    it('passes', () => {
      cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject', {failOnStatusCode: false});
      cy.contains('Customer Login').click();
      cy.get('#userSelect').select('Hermoine Granger');
      cy.contains('Login').click();
      cy.contains('Logout').click();
    })
})

describe('login_Deposit_Transaction_Check', () => {
  it('passes', () =>{
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject', {failOnStatusCode: false});
    cy.contains('Customer Login').click();
    cy.get('#userSelect').select('Harry Potter');
    cy.contains('Login').click();
    cy.contains('Deposit').click();
    cy.get('input[placeholder="amount"]').type('8800');
    cy.get('.btn-default').click();
    cy.get('.error').should('have.text', 'Deposit Successful');
    cy.wait(2000);
    cy.contains('Transactions').click();
  })
})

describe('withdraw_Without_Deposit', () => {
    it('passes', () =>{
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject', {failOnStatusCode: false});
      cy.contains('Customer Login').click();
      cy.get('#userSelect').select('Ron Weasly');
      cy.contains('Login').click();
      cy.contains('Withdrawl').click();
      cy.get('input[placeholder="amount"]').type('8800');
      cy.get('.btn-default').click();
      cy.get('.error').should('have.text', 'Transaction Failed. You can not withdraw amount more than the balance.');
    })
})

describe('balance_More_Than_Withdraw', () => {
  it('passes', () =>{
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject', {failOnStatusCode: false});
    cy.contains('Customer Login').click();
    cy.get('#userSelect').select('Albus Dumbledore');
    cy.contains('Login').click();
    cy.contains('Deposit').click();
    cy.get('input[placeholder="amount"]').type('8801');
    cy.get('.btn-default').click();
    cy.wait(500);

    cy.contains('Withdrawl').click();
    cy.wait(2000);
    
    cy.get('input[placeholder="amount"]').type('8800');
    cy.wait(500);

    cy.get('.btn-default').click();

    cy.get('.error').should('have.text', 'Transaction successful');
  })
})

describe('withdraw_More_Than_Balance', () => {
  it('passes', () =>{
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject', {failOnStatusCode: false});
    cy.contains('Customer Login').click();
    cy.get('#userSelect').select('Neville Longbottom');
    cy.contains('Login').click();
    cy.contains('Deposit').click();
    cy.get('input[placeholder="amount"]').type('8801');
    cy.get('.btn-default').click();
    cy.get('.error').should('have.text', 'Deposit Successful');
    cy.wait(500);

    cy.contains('Withdrawl').click();

    cy.wait(2000);

    cy.get('input[placeholder="amount"]').type('1231231');
    cy.wait(500);

    cy.get('.btn-default').click();
    cy.get('.error').should('have.text', 'Transaction Failed. You can not withdraw amount more than the balance.');

    cy.wait(2000);
  })
})

// Создание, открытие и удаление аккаунта для кастомера
describe('add_Open_Del_Acc_Customer', () => {
  it('passes', () => {
      cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject', {failOnStatusCode: false});
      cy.contains('Bank Manager Login').click();
      cy.contains('Add Customer').click();
      cy.get('input[placeholder="First Name"]').type('First');
      cy.get('input[placeholder="Last Name"]').type('Last');
      cy.get('input[placeholder="Post Code"]').type('E28228');
      cy.get('.btn-default').click();
      cy.contains('Open Account').click();
      cy.get('#userSelect').select('First Last');
      cy.get('#currency').select('Dollar');
      cy.contains('Process').click();
      cy.contains('Customers').click();
      cy.get('input[placeholder="Search Customer"]').type('First');
      cy.get('button[ng-click="deleteCust(cust)"]').click();
      cy.get('tr.ng-scope').should('not.exist');

  })

})

describe('all_In', () => {
  it('passes', () => {
      
      cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject', {failOnStatusCode: false});
      cy.contains('Bank Manager Login').click();
      cy.contains('Add Customer').click();
      cy.get('input[placeholder="First Name"]').type('First');
      cy.get('input[placeholder="Last Name"]').type('Last');
      cy.get('input[placeholder="Post Code"]').type('E28228');
      cy.get('.btn-default').click();
      cy.contains('Open Account').click();
      cy.get('#userSelect').select('First Last');
      cy.get('#currency').select('Dollar');
      cy.contains('Process').click();
      cy.contains('Customers').click();
      
      // Зайти в аккаунт, провести депозит, проверить транзакцию
      cy.contains('Home').click();
      cy.contains('Customer Login').click();
      cy.get('#userSelect').select('First Last');
      cy.contains('Login').click();
      cy.contains('Deposit').click();
      cy.get('input[placeholder="amount"]').type('8800');
      cy.get('.btn-default').click();
      cy.get('.error').should('have.text', 'Deposit Successful');
      cy.wait(500);
      cy.contains('Transactions').click();
      cy.wait(2000);


      cy.contains('Back').click();

      cy.contains('Withdrawl').click();
      cy.get('input[placeholder="amount"]').type('8800');
      cy.get('.btn-default').click();
      cy.wait(2000);
      cy.get('.error').should('have.text', 'Transaction successful');

  })
})



