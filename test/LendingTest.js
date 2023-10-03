// Assignment by Divya Bhamerkar
const LendingContract = artifacts.require("Lending");

contract("Lending", (accounts) => {
let lendingInstance;

before(async () => {
    lendingInstance = await LendingContract.new();
});

it("should allow users to make a deposit", async () => {
    const depositAmount = web3.utils.toWei("1", "ether");
    await lendingInstance.deposit({ from: accounts[0], value: depositAmount });

    const userBalance = await lendingInstance.userDeposits(accounts[0]);
    const contractBalance = await lendingInstance.totalLiquidity();

    assert.equal(userBalance, depositAmount, "User balance is incorrect");
    assert.equal(contractBalance, depositAmount, "Contract balance is incorrect");
});

it("should allow users to borrow funds", async () => {
    const borrowAmount = web3.utils.toWei("0.5", "ether");
    await lendingInstance.borrow(borrowAmount, { from: accounts[0] });

    const userBalance = await lendingInstance.userDeposits(accounts[0]);
    const contractBalance = await lendingInstance.totalLiquidity();

    assert.equal(userBalance, web3.utils.toWei("0.5", "ether"), "User balance is incorrect after borrowing");
    assert.equal(contractBalance, web3.utils.toWei("0.5", "ether"), "Contract balance is incorrect after borrowing");
});

it("should not allow users to borrow more than available liquidity", async () => {
    const borrowAmount = web3.utils.toWei("2", "ether");

    try {
        await lendingInstance.borrow(borrowAmount, { from: accounts[0] });
        assert.fail("Borrowing should fail");
    } catch (error) {
        assert.include(error.message, "Insufficient liquidity", "Expected error message not received");
    }
});
});

