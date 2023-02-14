# Vesting for the team
This smart contract is a token vesting contract that allows approved addresses to withdraw a certain amount of tokens gradually over a specified period of time. It uses the OpenZeppelin library and the ERC20 interface to interact with a specific token.

The contract has several functions for adding, modifying, and disabling approved addresses that can withdraw tokens, and a function for users to withdraw their available tokens. The amount of tokens a user can withdraw is based on their vesting period, monthly allowance, and the total amount of tokens assigned to them.

Additionally, the contract has some external getter functions that allow users to retrieve certain data, such as the duration of their vesting period and the amount of tokens they have yet to withdraw.


This contract is a token vesting contract that gradually unlocks tokens for pre-approved addresses over time. Here are the key calculations and how they are being done:

- The addInvestor() function adds a new strategic investor address, along with the monthly allowance and the duration of the vesting period in days. The function first checks that the investor does not already have an allocation. It then calculates the daily allowance based on the yearly and monthly allowances provided, and multiplies this by the number of days in the vesting period to get the total amount of tokens that the investor will receive. This total amount is stored in balances[_investor].remainingCoins.
- The modifyInvestor() function modifies the monthly allowance of an existing investor. The function first checks that the investor has an allocation. It then calculates the amount of tokens that are available to the investor based on how much time has passed since the vesting period started, and deducts this amount from the total allocation. It then adds the new monthly allowance to this remaining amount, and stores this as the new total allocation in balances[_investor].remainingCoins.
- The getAvailableTokens() function calculates the amount of tokens that are currently available for an investor to withdraw, based on how much time has passed since the vesting period started. The function takes four inputs:
	- timePassed: the number of seconds that have passed since the vesting period started.
	- remainingCoins: the total allocation of tokens for the investor.
	- supply: the original total allocation of tokens for the investor, which is used to calculate the amount that has already been withdrawn.
	- duration: the total duration of the vesting period in seconds.
The function first calculates the number of days that have passed based on the timePassed input. It then calculates the daily allowance based on the total allocation and the duration, and multiplies this by the number of days that have passed. Finally, it subtracts the amount that has already been withdrawn (which is supply - remainingCoins) from this amount, to get the total amount of tokens that are currently available to withdraw.

- The withdraw() function allows an investor to withdraw their available tokens. The function first checks that the vesting period has started and that the investor has an allocation. It then calls the getAvailableTokens() function to calculate the amount of tokens that are currently available to withdraw. It subtracts this amount from the remaining allocation, and transfers the available tokens to the investor using the SafeERC20 library.
