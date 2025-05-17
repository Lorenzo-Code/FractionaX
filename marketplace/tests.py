from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Asset, TokenOwnership
from django.contrib.auth import get_user_model

User = get_user_model()


class WalletAuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_wallet = "0x1234567890abcdef1234567890abcdef12345678"
        self.invalid_wallet = "invalid_wallet"
        self.wallet_auth_url = "/api/wallet-auth/"
        self.user = User.objects.create(
            email="testuser@example.com",
            wallet_address=self.valid_wallet,
            first_name="Test",
            last_name="User",
        )

    def test_valid_wallet_authentication(self):
        response = self.client.post(
            self.wallet_auth_url, {"wallet_address": self.valid_wallet}
        )
        print("Valid Wallet Authentication Response:", response.data)  # Debugging
        self.assertEqual(response.status_code, 200)
        self.assertIn("user", response.data)
        self.assertEqual(response.data["user"]["wallet_address"], self.user.wallet_address)

    def test_invalid_wallet_authentication(self):
        response = self.client.post(
            self.wallet_auth_url, {"wallet_address": self.invalid_wallet}
        )
        print(
            "Invalid Wallet Authentication Response:", response.content.decode()
        )  # Debugging
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["error"], "Invalid wallet address")


class TokenOwnershipTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create(
            email="testuser@example.com",
            wallet_address="0x1234567890abcdef1234567890abcdef12345678",
            first_name="Test",
            last_name="User",
        )

        self.asset = Asset.objects.create(
            name="Luxury Apartment", description="Premium NYC Condo", price=1000000
        )

        self.token_ownership_url = "/api/token-ownerships/"
        self.user_token_url = f"/api/tokens/{self.user.wallet_address}/"
        self.token_data = {
            "wallet_address": self.user.wallet_address,
            "token_type": "FST",
            "token_amount": 10,
            "asset_id": self.asset.id,
        }

    def test_create_token_ownership(self):
        """Test the creation of token ownership"""
        response = self.client.post(self.token_ownership_url, self.token_data)

        if response.status_code != status.HTTP_201_CREATED:
            print(f"Create Token Ownership Error Response: {response.content.decode()}")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["token_type"], "FST")
        self.assertEqual(response.data["token_amount"], "10.00")
        self.assertEqual(response.data["wallet_address"], self.user.wallet_address)
        self.assertEqual(response.data["asset"]["id"], self.asset.id)

    def test_fetch_user_token_holdings(self):
        """Test fetching token holdings for a user"""
        TokenOwnership.objects.create(
            user=self.user, token_type="FCT", token_amount=100, staking_rewards=5
        )
        TokenOwnership.objects.create(
            user=self.user, token_type="FST", token_amount=50, asset=self.asset
        )

        response = self.client.get(self.user_token_url)

        if response.status_code != status.HTTP_200_OK:
            print(
                f"Fetch User Token Holdings Error Response: {response.content.decode()}"
            )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token_holdings", response.data)
        self.assertEqual(len(response.data["token_holdings"]), 2)

        token_holdings = response.data["token_holdings"]
        self.assertEqual(token_holdings[0]["token_type"], "FCT")
        self.assertEqual(token_holdings[0]["token_amount"], "100.00")
        self.assertEqual(token_holdings[1]["token_type"], "FST")
        self.assertEqual(token_holdings[1]["token_amount"], "50.00")
        self.assertEqual(token_holdings[1]["asset"]["id"], self.asset.id)


class AssetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.asset_url = "/api/assets/"
        self.asset_data = {
            "name": "Luxury Apartment",
            "description": "A high-end apartment.",
            "price": 500000.00,
        }

    def test_create_asset(self):
        response = self.client.post(self.asset_url, self.asset_data)
        print("Create Asset Response:", response.content.decode())
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], self.asset_data["name"])

    def test_list_assets(self):
        Asset.objects.create(**self.asset_data)
        response = self.client.get(self.asset_url)
        print("List Assets Response:", response.content.decode())
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.data), 0)


class StakingRewardsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.wallet_address = "0x1234567890abcdef1234567890abcdef12345678"
        self.user = User.objects.create(
            email="testuser@example.com",
            wallet_address=self.wallet_address,
            first_name="Test",
            last_name="User",
        )
        self.asset = Asset.objects.create(
            name="Luxury Apartment",
            description="A high-end apartment.",
            price=500000.00,
        )
        self.token = TokenOwnership.objects.create(
            user=self.user, token_type="FCT", token_amount=100
        )
        self.rewards_url = "/api/distribute-rewards/"

    def test_distribute_staking_rewards(self):
        response = self.client.post(self.rewards_url)
        print(
            "Distribute Staking Rewards Response:", response.content.decode()
        )
        self.assertEqual(response.status_code, 200)
        self.token.refresh_from_db()
        print("Updated Token Staking Rewards:", self.token.staking_rewards)
        self.assertGreater(self.token.staking_rewards, 0)
