import requests
from requests.auth import HTTPBasicAuth
from langchain.tools import tool
from langchain_core.utils.function_calling import convert_to_openai_tool

from config import env

@tool()
def get_testnet_tokens(receiver: str):
    """Send some Near testnet tokens to a Near account
    Args:
        receiver (str): The receiver of the tokens
    Returns:
        String explaining what happened"""

async def get_testnet_tokens_raw(receiver: str) -> str:
    response = requests.post(
        "https://near-faucet.io/api/faucet/tokens",
        json={"contractId":"near_faucet","receiverId": receiver,"amount":"10000000000000000000000000"}
    )
    data = response.json()

    error_message = data.get('error')
    if error_message is None:
        return f"Successfully sent 10 Near tokens with transaction hash {data.get('txh')}"
    else:
        return f"An error occured: {error_message}"

@tool()
def google_search(query: str):
    """Search Google results, call this if you need more information on a subject
    Args:
        query (str): The query to search for
    Returns:
        list: A list of dictionaries containing the title, link, snippet, and other information about the search results."""

async def google_search_raw(query: str) -> list[dict]:
    basic_auth = HTTPBasicAuth(env.oxylabs_username, env.oxylabs_password)

    response = requests.post(
        'https://realtime.oxylabs.io/v1/queries',
        auth=basic_auth,
        json={"source": "google_search", "query": query, "parse": True}
    )

    data = response.json()
    organic_results = data.get('results')[0].get('content').get('results').get('organic')
    return [{ "pos": r['pos'], "url": r['url'], "desc": r['desc'], "title": r['title'] } for r in organic_results]


TOOLS = [get_testnet_tokens, google_search]

def get_tools() -> list:
    return [convert_to_openai_tool(t) for t in TOOLS]
