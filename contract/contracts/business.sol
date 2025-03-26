// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract FedX {
  constructor() {
    businessHashCount = 0;
  }
  struct Business {
    address owner;
    string name;
    uint256 rewardThreshold;
    uint256 rewardAmount;
    bool isActive;
    address paymentAddress;
    string businessContext;
    uint256 productPrice;
    Products[] products;
  }

  uint16 public businessHashCount;
  struct Transaction {
    address user;
    uint256 amount;
    uint256 timestamp;
  }

  struct BusinessEntry {
    uint16 businessHash;
    Business business;
  }

  struct Products {
    string name;
    uint256 price;
  }

  mapping(uint16 => Business) public businesses;
  mapping(uint16 => mapping(address => uint256)) public userPoints;
  mapping(uint16 => Transaction[]) public transactions;

  event RegisterBusinessEvent(string msg);
  event BusinessShutdownEvent(string msg);
  event BuyEvent(string msg);
  event UpdateRewardConfigEvent(string msg);
  event ClaimRewardEvent(string msg);

  modifier onlyBusinessOwner(uint16 businessHash) {
    require(businesses[businessHash].owner == msg.sender, 'Not Authorized');
    _;
  }

  //  ---------SETTERS----------

  function registerBusiness(
    string memory name,
    uint256 rewardThreshold,
    uint256 rewardAmount,
    address paymentAddress,
    string memory businessContext,
    uint256 productPrice,
    Products[] memory products
  ) external returns (uint16) {
    uint16 businessHash = businessHashCount;

    businesses[businessHash] = Business({
      owner: msg.sender,
      name: name,
      rewardThreshold: rewardThreshold,
      rewardAmount: rewardAmount,
      isActive: true,
      paymentAddress: paymentAddress,
      businessContext: businessContext,
      productPrice: productPrice,
      products: products
    });

    businessHashCount += 1;

    return businessHash;
  }

  function buySomething(uint16 businessHash, uint16 productIndex) external payable {
    // require(businesses[businessHash].isActive, 'Business not active');
    // address user = msg.sender;
    // transactions[businessHash].push(
    //   Transaction({ user: user, amount: msg.value, timestamp: block.timestamp })
    // );
    // userPoints[businessHash][user] += 1;
    // payable(businesses[businessHash].owner).transfer(msg.value);
    // (bool success, ) = payable(businesses[businessHash].owner).call{ value: msg.value }('');
    // require(success, 'Transfer failed');
  }

  function buySomething2(uint16 businessHash, uint16 productIndex) external {
    // require(businesses[businessHash].isActive, 'Business not active');
    // address user = msg.sender;
    // transactions[businessHash].push(
    //   Transaction({ user: user, amount: msg.value, timestamp: block.timestamp })
    // );
    userPoints[businessHash][user] += 1;
    // payable(businesses[businessHash].owner).transfer(msg.value);
    // (bool success, ) = payable(businesses[businessHash].owner).call{ value: msg.value }('');
    // require(success, 'Transfer failed');
  }

  function claimReward(uint16 businessHash) external returns (string memory) {
    
    // require(
    //   userPoints[businessHash][msg.sender] >= business.rewardThreshold,
    //   'Insufficient points'
    // );
    Business storage business = businesses[businessHash];

    userPoints[businessHash][msg.sender] -= business.rewardThreshold;

    // payable(msg.sender).transfer(business.rewardAmount);

    // (bool success, ) = payable(msg.sender).call{ value: business.rewardAmount }('');

    // require(success, 'Reward transfer failed');
    return 'Reward claimed';
  }

  function updateRewardConfig(
    uint16 businessHash,
    uint256 newThreshold,
    uint256 newAmount
  ) external onlyBusinessOwner(businessHash) {
    businesses[businessHash].rewardThreshold = newThreshold;
    businesses[businessHash].rewardAmount = newAmount;
  }

  function shutdownBusiness(uint16 businessHash) external onlyBusinessOwner(businessHash) {
    require(businesses[businessHash].isActive, 'Business already shut down');

    businesses[businessHash].isActive = false;
  }

  // -----------GETTERS------------
  function getPoints(uint16 businessHash, address user) external view returns (uint256) {
    return userPoints[businessHash][user];
  }

  function getTransactionCount(uint16 businessHash) external view returns (uint256) {
    return transactions[businessHash].length;
  }

  function getTransactions(uint16 businessHash) external view returns (Transaction[] memory) {
    return transactions[businessHash];
  }

  function getBusinesses() external view returns (BusinessEntry[] memory) {
    uint16 count = businessHashCount;
    BusinessEntry[] memory businessList = new BusinessEntry[](count);

    for (uint16 i = 0; i < count; i++) {
      businessList[i] = BusinessEntry(i, businesses[i]);
    }

    return businessList;
  }

  function getBusinesInfo(uint16 businessHash) external view returns (Business memory) {
    return businesses[businessHash];
  }

  // -------------LLM-EVENTS--------------

  function emitRegisterBusiness() external returns (string memory) {
    emit RegisterBusinessEvent('User wants to register a business');

    return 'Event for registering your business on Loyalty-X has been emitted';
  }

  function emitBusinessShutdown() external returns (string memory) {
    emit BusinessShutdownEvent('User wants to shutdown their event');
    return 'Event for terminating your business on Loyalty-X has been emitted';
  }

  function emitBuy() external returns (string memory) {
    emit BuyEvent('User wants to buy something');
    return 'Event for a buy order to the given business has been emitted';
  }

  function emitUpdateRewardConfig() external returns (string memory) {
    emit UpdateRewardConfigEvent('User wants to update their reward config');
    return 'Event to update the reward config of your business has been emitted';
  }

  function emitClaimReward() external returns (string memory) {
    emit ClaimRewardEvent('User wants to claim their reward');
    return 'Event to claim your reward on the given business has been emitted';
  }
}
