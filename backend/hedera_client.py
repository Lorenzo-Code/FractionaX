import os
from dotenv import load_dotenv
from hedera import Client, PrivateKey, AccountId

# Load environment variables
load_dotenv()

# Retrieve Hedera credentials from .env
HEDERA_ACCOUNT_ID = os.getenv("HEDERA_ACCOUNT_ID")
HEDERA_PRIVATE_KEY = os.getenv("HEDERA_PRIVATE_KEY")

# Initialize Hedera Client
if not HEDERA_ACCOUNT_ID or not HEDERA_PRIVATE_KEY:
    raise ValueError("Missing Hedera credentials!")

hedera_client = Client.forTestnet()
hedera_client.setOperator(AccountId.fromString(HEDERA_ACCOUNT_ID), PrivateKey.fromString(HEDERA_PRIVATE_KEY))


# FractionaX Access Token:
# v4.public.eyJzdWIiOiI3NWI0ZWNlMi1mMjEzLTExZWYtODM2Zi0zYjI0NWMxMGRkMjMiLCJpYXQiOiIyMDI1LTAyLTIzVDIwOjA0OjIyLjM2MVoiLCJqdGkiOiI1ZjlhOWZlOC1mMjIxLTExZWYtYjk0Zi1mMzRmZTE2ODhiNTciff56o6d1_RIa_HA7FLVIO12gV2Rl3p9OU1WqR6rq1MhD-PaSpaXxLwGIqmyImtIi5NyMdQUSthiaXDOu3Oq20wY