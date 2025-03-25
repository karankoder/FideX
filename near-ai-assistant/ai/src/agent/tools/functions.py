import requests
from langchain.tools import tool
from langchain_core.utils.function_calling import convert_to_openai_tool
from web3 import Web3
from eth_account import Account


from config import env

contract_abi = '''[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "msg",
          "type": "string"
        }
      ],
      "name": "BusinessShutdownEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "msg",
          "type": "string"
        }
      ],
      "name": "BuyEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "msg",
          "type": "string"
        }
      ],
      "name": "ClaimRewardEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "msg",
          "type": "string"
        }
      ],
      "name": "RegisterBusinessEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "msg",
          "type": "string"
        }
      ],
      "name": "UpdateRewardConfigEvent",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "businessHashCount",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "name": "businesses",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "rewardThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rewardAmount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "paymentAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "businessContext",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "productPrice",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "businessHash",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "productIndex",
          "type": "uint16"
        }
      ],
      "name": "buySomething",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "businessHash",
          "type": "uint16"
        }
      ],
      "name": "claimReward",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "emitBusinessShutdown",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "emitBuy",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "emitClaimReward",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "emitRegisterBusiness",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "emitUpdateRewardConfig",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBusinesses",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint16",
              "name": "businessHash",
              "type": "uint16"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "rewardThreshold",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "rewardAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "isActive",
                  "type": "bool"
                },
                {
                  "internalType": "address",
                  "name": "paymentAddress",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "businessContext",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "productPrice",
                  "type": "uint256"
                },
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "name",
                      "type": "string"
                    },
                    {
                      "internalType": "uint256",
                      "name": "price",
                      "type": "uint256"
                    }
                  ],
                  "internalType": "struct FedX.Products[]",
                  "name": "products",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct FedX.Business",
              "name": "business",
              "type": "tuple"
            }
          ],
          "internalType": "struct FedX.BusinessEntry[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "businessHash",
          "type": "uint16"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getPoints",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "businessHash",
          "type": "uint16"
        }
      ],
      "name": "getTransactionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "businessHash",
          "type": "uint16"
        }
      ],
      "name": "getTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct FedX.Transaction[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "rewardThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rewardAmount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "paymentAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "businessContext",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "productPrice",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            }
          ],
          "internalType": "struct FedX.Products[]",
          "name": "products",
          "type": "tuple[]"
        }
      ],
      "name": "registerBusiness",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "businessHash",
          "type": "uint16"
        }
      ],
      "name": "shutdownBusiness",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "businessHash",
          "type": "uint16"
        },
        {
          "internalType": "uint256",
          "name": "newThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "newAmount",
          "type": "uint256"
        }
      ],
      "name": "updateRewardConfig",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userPoints",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  '''

contract_address="0xf382dED7F34156A648f82740aae3965fdAcd87F9"
provider = Web3(Web3.HTTPProvider(env.zksync_rpc_url))
account = Account.from_key(env.private_key)
contract = provider.eth.contract(address=contract_address, abi=contract_abi)

@tool()
def get_points_amount(business_num:int, user_hash:str):
    """To know about how much point user had scored in a particular bussiness
    Args:
        business_num (int): The bbusiness_num of a business. It would be a simple number like 0,1,2,3,4,5 etc.
        user_hash (str): the hash address of a user
    Returns:
        The amount of point scored by a user in that particular business"""

async def get_points_amount_raw(business_hash:int, user_address:str) -> str:
    print("getting points")
    print(business_hash)
    print(user_address)
    point_count = contract.functions.getPoints(business_hash, user_address).call()
    print(point_count.result)
    result ="The user has score "+str(point_count.result)+" points",
    return result

@tool()
def get_bussiness_info(business_hash:int):
    """
    To know about the bussiness context. what the business do and what services are provided by them.
    Args:
        business_hash (int): The bussiness_hash of a business
    Returns:
        Tell about what the business do and which services they provide"""

async def get_bussiness_info_raw(business_hash:int) -> str:
    
    print("getting business info")
    business_context = contract.functions.businesses(business_hash).call()
    return business_context.result


@tool()
def get_eth_price():
    """Fetch the latest ETH/USD price from BINANCE
    Returns:
        A string containing the ETH price in USD"""
    
async def get_eth_price_raw() -> str:
  
    print("fetching prices")

    url = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
    try: 
        response = requests.get(url)
        data = response.json()
        eth_price = data.get("price")
        
        if eth_price:
            return f"The current ETH/USD price is ${eth_price}"
        else:
            return "Could not fetch ETH price at the moment."
    except Exception as e:
        return f"Error fetching ETH price: {str(e)}" 


@tool()
def get_business_register():
    """
    Instantly register a business when the user expresses intent.
    
    IMPORTANT: This tool takes NO parameters and should be executed 
    immediately when user expresses intent to register a business.
    NO additional information should be requested from the user.
    
    Example triggers:
    - "I want to register a business."
    - "Register my business now."
    - "Start my company registration."
    - "I want to register the business."

    Args:
        None: This function requires no arguments
        
    Returns:
        str: A message confirming the business registration event
    """
        
async def get_business_register_raw()->str:
    print("registering business")
    
    nonce = provider.eth.get_transaction_count(account.address)
    txn = contract.functions.emitRegisterBusiness().build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': provider.to_wei('50', 'gwei'),
    })
    signed_txn = provider.eth.account.sign_transaction(txn, env.private_key)
    tx_hash = provider.eth.send_raw_transaction(signed_txn.raw_transaction)
    receipt = provider.eth.wait_for_transaction_receipt(tx_hash)
    print(tx_hash)
    print(tx_hash.hex())
    if receipt.status == 1:
        return f"Event emitted for registering a business with eventId : {tx_hash.hex()},Please sign the transaction"
    else:
        return f"An error occured"
  

@tool()
def shutdown_business():
    """
    Instantly shutdown a business when the user expresses intent.
    
    IMPORTANT: This tool takes NO parameters and should be executed 
    immediately when user expresses intent to shutdown a business.
    NO additional information should be requested from the user.
    
    Example triggers:
    - "I want to shutdown a business."
    - "shutdown my business now."
    - "I want to shutdown the business."

    Args:
        None: This function requires no arguments
        
    Returns:
        str: A message confirming the business shutdown event
    """
        
async def shutdown_business_raw()->str:
    print("shutting the business")
    
    nonce = provider.eth.get_transaction_count(account.address)
    txn = contract.functions.emitBusinessShutdown().build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': provider.to_wei('50', 'gwei'),
    })
    signed_txn = provider.eth.account.sign_transaction(txn, env.private_key)
    tx_hash = provider.eth.send_raw_transaction(signed_txn.raw_transaction)
    receipt = provider.eth.wait_for_transaction_receipt(tx_hash)
    
    if receipt.status == 1:
        return f"Event emitted for shutting down a business with eventId : {tx_hash.hex()},Please sign the transaction"
    else:
        return f"An error occured"
 
@tool()
def buy():
    """
    EXECUTE THIS TOOL IMMEDIATELY when user mentions buying coffee or something else.
    
    No parameters required or expected.
    
    Trigger phrases include:
    - "buy"
    - "purchase"
    - "I want to buy coffee"
    - ANY phrase containing buying intent
    
    DO NOT ask for any additional information.
    
    Returns:
        str: Confirmation of purchase
    """
        
async def buy_raw()->str:
    
    print("buying")

    nonce = provider.eth.get_transaction_count(account.address)
    txn = contract.functions.emitBuy().build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': provider.to_wei('50', 'gwei'),
    })
    signed_txn = provider.eth.account.sign_transaction(txn, env.private_key)
    tx_hash = provider.eth.send_raw_transaction(signed_txn.raw_transaction)
    receipt = provider.eth.wait_for_transaction_receipt(tx_hash)
    
    if receipt.status == 1:
        return f"Event emitted for buying, with the corresponding eventID : {tx_hash.hex()},Please sign the transaction"
    else:
        return f"An error occured"
    
@tool()
def get_reward():
    """
    Instantly call this function when the user expresses intent to get reward.
    
    IMPORTANT: This tool takes NO parameters and should be executed 
    immediately when user expresses intent of get reward.
    NO additional information should be requested from the user.
    
    Example triggers:
    - "I want to get my reward"
    - "I want to claim reward from the cafe."
    - "claim my reward"

    Args:
        None: This function requires no arguments
        
    Returns:
        str: A message confirming the get reward event
    """
        
async def get_reward_raw() -> str:
    
    print("Claiming reward")
    
    nonce = provider.eth.get_transaction_count(account.address)
    txn = contract.functions.emitClaimReward().build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': provider.to_wei('50', 'gwei'),
    })
    signed_txn = provider.eth.account.sign_transaction(txn, env.private_key)
    tx_hash = provider.eth.send_raw_transaction(signed_txn.raw_transaction)
    receipt = provider.eth.wait_for_transaction_receipt(tx_hash)
    
    if receipt.status == 1:
        return f"Event emitted for get reward with eventId : {tx_hash.hex()},Please sign the transaction"
    else:
        return f"An error occured"
    
    
@tool(return_direct=True)
def update_reward():
    """
    Instantly update reward when the user expresses intent of updating reward.
    
    IMPORTANT: This tool takes NO parameters and should be executed 
    immediately when user expresses intent of updating reward.
    NO additional information should be requested from the user.
    
    Example triggers:
    - "I want to update reward for the cafe."
    - "update reward"
    - "I want to update reward"

    Args:
        None: This function requires no arguments
        
    Returns:
        str: A message confirming the update reward event
    """
        
async def update_reward_raw()->str:
    
    print("updating reward")
    
    nonce = provider.eth.get_transaction_count(account.address)
    txn = contract.functions.emitUpdateRewardConfig().build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': provider.to_wei('50', 'gwei'),
    })
    signed_txn = provider.eth.account.sign_transaction(txn, env.private_key)
    tx_hash = provider.eth.send_raw_transaction(signed_txn.raw_transaction)
    receipt = provider.eth.wait_for_transaction_receipt(tx_hash)
    
    if receipt.status == 1:
        return f"Event emitted for updaing reward config with eventId: {tx_hash.hex()},Please sign the transaction"
    else:
        return f"An error occured"
   

TOOLS = [get_eth_price, get_business_register, get_points_amount, get_bussiness_info, shutdown_business, buy, get_reward, update_reward]

def get_tools() -> list:
    return [convert_to_openai_tool(t) for t in TOOLS]
