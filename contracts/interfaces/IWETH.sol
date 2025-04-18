// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IWETH {
    function deposit() external payable;
    function withdraw(uint) external;
    function approve(address guy, uint wad) external returns (bool);
    function transfer(address dst, uint wad) external returns (bool);
    function transferFrom(address src, address dst, uint wad) external returns (bool);
} 