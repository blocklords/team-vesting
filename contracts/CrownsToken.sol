// contracts/Crowns.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CrownsToken is ERC20 {
    constructor() ERC20("FakeCrownsToken", "FCWS") {
        _mint(msg.sender, 10000000 * 10**decimals());
    }
}
