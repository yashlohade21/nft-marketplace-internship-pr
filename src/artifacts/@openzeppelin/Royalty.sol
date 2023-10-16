// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract RoyaltyToken is ERC721, Ownable {
    using SafeMath for uint256;

    // Mapping from token ID to royalty percentage
    mapping(uint256 => uint256) public royaltyPercentage;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    // Set royalty percentage for a specific token
    function setRoyaltyPercentage(uint256 tokenId, uint256 percentage) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        royaltyPercentage[tokenId] = percentage;
    }

    // Calculate the royalty amount for a given token ID and sale price
    function calculateRoyalty(uint256 tokenId, uint256 salePrice) public view returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        uint256 percentage = royaltyPercentage[tokenId];
        return salePrice.mul(percentage).div(100);
    }

    // Mint a new token
    function mintWithRoyalty(address to, uint256 tokenId, uint256 _royaltyPercentage) public onlyOwner {
        _mint(to, tokenId);
        royaltyPercentage[tokenId] = _royaltyPercentage;
    }
}
