// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenB.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BridgeB is Ownable {
    TokenB public token;
    address public counterpartBridge;

    event TokensReleased(address indexed to, uint256 amount);

    constructor(address _token) {
        token = TokenB(_token);
    }

    function setCounterpartBridge(address _counterpartBridge)
        external
        onlyOwner
    {
        counterpartBridge = _counterpartBridge;
    }

    function releaseTokens(address to, uint256 amount) external {
        // require(msg.sender == counterpartBridge, "Only counterpart bridge can release tokens");
        token.mint(to, amount); // Call the mint function of TokenB
        emit TokensReleased(to, amount);
    }
}