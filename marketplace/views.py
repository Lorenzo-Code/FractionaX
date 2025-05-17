from django.contrib.auth import get_user_model, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.utils.text import slugify
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.decorators import api_view
from marketplace.services.api_fetcher import PropertyAPIService
from oauth2_provider.models import Application
from oauth2_provider.views import TokenView
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from .faq_data import faqs
from .models import TokenOwnership, Investment
from hedera import TokenCreateTransaction, AccountBalanceQuery, AccountId
from backend.hedera_client import hedera_client  # Import the Hedera client
from .serializers import (
    TokenOwnershipSerializer,
    UserSerializer,
    InvestmentSerializer,
)
import requests
import logging


@method_decorator(
    csrf_exempt, name="dispatch"
)  # ✅ Disable CSRF for OAuth2 token requests
class CustomTokenView(TokenView):
    pass


User = get_user_model()
logger = logging.getLogger(__name__)


@method_decorator(csrf_exempt, name="dispatch")  # ✅ Exempt CSRF for login
class OAuth2LoginView(APIView):
    """
    Handles user authentication using OAuth2.
    """

    permission_classes = [AllowAny]  # ✅ Public access

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # ✅ Authenticate the user
        user = authenticate(username=email, password=password)
        if not user:
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # ✅ Get OAuth2 Application
        try:
            app = Application.objects.get(name="MyApp")
        except Application.DoesNotExist:
            return Response(
                {"error": "OAuth2 Application not found"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # ✅ Request an OAuth2 token
        token_url = "http://localhost:8000/o/token/"
        data = {
            "grant_type": "password",
            "username": email,
            "password": password,
            "client_id": app.client_id,
            "client_secret": app.client_secret,
        }

        token_response = requests.post(token_url, data=data)
        if token_response.status_code == 200:
            token_data = token_response.json()

            # ✅ Include user data in response
            return Response(
                {
                    "message": "Login successful",
                    "access_token": token_data["access_token"],
                    "refresh_token": token_data["refresh_token"],
                    "expires_in": token_data["expires_in"],
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                },
                status=status.HTTP_200_OK,
            )

        # ❌ Handle OAuth2 token request failure
        error_response = token_response.json()
        return Response(
            {"error": "OAuth2 token request failed", "details": error_response},
            status=status.HTTP_400_BAD_REQUEST,
        )


### ✅ 3️⃣ User Registration View (Returns OAuth2 Token) ###
class RegisterView(APIView):
    """
    Handles user registration and returns OAuth2 token.
    """

    permission_classes = [AllowAny]  # ✅ Public access

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        first_name = request.data.get("first_name", "")
        last_name = request.data.get("last_name", "")

        if not email or not password:
            return Response(
                {"error": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already registered."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ✅ Create user
        user = User.objects.create_user(
            email=email, password=password, first_name=first_name, last_name=last_name
        )

        # ✅ Get OAuth2 Application
        try:
            app = Application.objects.get(name="MyApp")
        except Application.DoesNotExist:
            return Response(
                {"error": "OAuth2 Application not found"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # ✅ Automatically log in user and return token
        token_url = "http://localhost:8000/o/token/"
        data = {
            "grant_type": "password",
            "username": email,
            "password": password,
            "client_id": app.client_id,
            "client_secret": app.client_secret,
        }

        token_response = requests.post(token_url, data=data)
        if token_response.status_code == 200:
            token_data = token_response.json()
            return Response(
                {
                    "message": "Registration successful",
                    "access_token": token_data["access_token"],
                    "refresh_token": token_data["refresh_token"],
                    "expires_in": token_data["expires_in"],
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {"error": "User registered, but OAuth2 token request failed"},
            status=status.HTTP_201_CREATED,
        )


class UserProfileView(APIView):
    """
    Fetch authenticated user's profile data.
    """

    authentication_classes = [OAuth2Authentication]  # ✅ Require OAuth2 token
    permission_classes = [IsAuthenticated]  # ✅ Require authentication

    def get(self, request):
        user = request.user
        return Response(
            {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "fctHoldings": getattr(
                    user, "fct_holdings", 0
                ),  # ✅ Prevents NoneType errors
                "fstHoldings": getattr(user, "fst_holdings", 0),
                "portfolioValue": getattr(user, "portfolio_value", 0),
                "stakingRewards": getattr(user, "staking_rewards", 0),
                "earnings": {
                    "total": getattr(user, "earnings_total", 0),
                    "percentage": getattr(user, "earnings_percentage", 0),
                },
                "fctRate": getattr(user, "fct_rate", 0),
                "fstRate": getattr(user, "fst_rate", 0),
                "totalMade": {
                    "total": getattr(user, "total_made", 0),
                    "percentage": getattr(user, "total_made_percentage", 0),
                },
                "wallet_address": getattr(
                    user, "wallet_address", ""
                ),  # ✅ Fixed placement
                "xp": user.xp,
                "xpForNextLevel": user.xp_for_next_level,
                "achievements": [
                    {"id": a.id, "name": a.name, "icon": a.icon}
                    for a in user.achievements.all()
                ],
            },
            status=status.HTTP_200_OK,
        )


class InvestmentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logger.info("✅ InvestmentListView GET request received")

        # ✅ Get query params
        street_address = request.query_params.get("address", None)
        city = request.query_params.get("city", "Houston")  # Default to Houston, TX
        state = request.query_params.get("state", "TX")  # ✅ Only fetch TX properties

        # ✅ Ensure we have an address or default to Texas city
        if street_address:
            full_address = f"{street_address}, {city}, {state}"
        else:
            logger.warning("⚠️ No specific address provided. Using Texas listings instead.")
            full_address = None  # This will ensure the API defaults to Texas

        # ✅ Fetch external API data
        rentcast_data = {}
        attom_data = {}
        if full_address:
            rentcast_data = PropertyAPIService.fetch_rentcast_data(full_address)
            attom_data = PropertyAPIService.fetch_attom_data(full_address)

            logger.info(f"✅ RentCast Data: {rentcast_data}")
            logger.info(f"✅ Attom Data: {attom_data}")

        # ✅ Fetch only TX properties from the database
        investments = Investment.objects.filter(state="TX")  # ✅ Filter by Texas properties
        investment_data = InvestmentSerializer(investments, many=True).data

        # ✅ Fetch user's liked investments
        user = request.user
        liked_investments = user.liked_investments.all()
        liked_investment_ids = [inv.id for inv in liked_investments]

        # ✅ Combine API + Database data
        response_data = {
            "database_investments": investment_data,
            "liked_investments": liked_investment_ids,
            "rentcast": rentcast_data,
            "attom": attom_data,
        }

        logger.info(f"✅ API Response Data: {response_data}")
        return Response(response_data)

class LikedInvestmentsView(APIView):
    """Handles retrieving, liking, and unliking investments."""
    permission_classes = [IsAuthenticated]  # ✅ Require authentication

    def get(self, request):
        """Retrieve user's liked investments."""
        user = request.user
        liked_investments = user.liked_investments.all()
        serializer = InvestmentSerializer(liked_investments, many=True)
        return Response({"liked_investments": serializer.data}, status=200)

    def post(self, request):
        """Like or Unlike an investment."""
        user = request.user
        investment_id = request.data.get("investment_id")

        try:
            investment = Investment.objects.get(id=investment_id)
            if investment in user.liked_investments.all():
                user.liked_investments.remove(investment)  # ✅ Unlike
                return Response({"message": "Investment unliked", "liked": False})
            else:
                user.liked_investments.add(investment)  # ✅ Like
                return Response({"message": "Investment liked", "liked": True})
        except Investment.DoesNotExist:
            return Response({"error": "Investment not found"}, status=404)
        

class PropertyDetailView(APIView):
    """Fetches and combines detailed property data from multiple APIs."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        property_address = request.query_params.get("address", None)
        if not property_address:
            return Response({"error": "Property address is required"}, status=400)

        # ✅ Fetch data from multiple APIs
        rentcast_data = PropertyAPIService.fetch_rentcast_data(property_address)
        attom_data = PropertyAPIService.fetch_attom_data(property_address)

        # ✅ Extract latitude & longitude for Google Maps
        lat = rentcast_data.get("latitude", None)
        lng = rentcast_data.get("longitude", None)
        google_data = PropertyAPIService.fetch_google_map_data(lat, lng) if lat and lng else {}

        # ✅ Combine all responses into a single response
        response_data = {
            "rentcast": rentcast_data,
            "attom": attom_data,
            "google_maps": google_data,
        }

        return Response(response_data, status=200)
    

class FetchPropertyDataAPIView(APIView):
    """
    Fetch property data from external real estate APIs.
    """

    def get(self, request, *args, **kwargs):
        location = request.query_params.get("location", "New York")  # Default to NYC if no location provided
        
        zillow_data = PropertyAPIService.fetch_zillow_data(location)
        redfin_data = PropertyAPIService.fetch_redfin_data(location)
        realtor_data = PropertyAPIService.fetch_realtor_data(location)

        return Response({
            "zillow": zillow_data,
            "redfin": redfin_data,
            "realtor": realtor_data
        })

# @api_view(['POST'])
# @login_required
# def link_wallet(request):
#     """
#     Allows the user to link a crypto wallet address to their account.
#     """
#     wallet_address = request.data.get('wallet_address', '').strip()

#     if not wallet_address:
#         return Response({"error": "Wallet address is required."}, status=400)

#     try:
#         # Update the wallet address for the authenticated user
#         user = request.user
#         user.wallet_address = wallet_address
#         user.save()

#         return Response({"message": "Wallet address linked successfully!"}, status=200)

#     except Exception as e:
#         return Response({"error": f"Failed to link wallet: {str(e)}"}, status=500)


# Wallet Authentication and User Management View
class WalletAuthView(APIView):
    def post(self, request):
        wallet_address = request.data.get("wallet_address")
        if not wallet_address or len(wallet_address) != 42:  # Example validation
            return Response(
                {"error": "Invalid wallet address"}, status=status.HTTP_400_BAD_REQUEST
            )

        user, created = User.objects.get_or_create(wallet_address=wallet_address)
        user_data = UserSerializer(user).data
        return Response(
            {"user": user_data, "new_user": created}, status=status.HTTP_200_OK
        )


# Token Ownership Management View
class TokenOwnershipListCreateView(ListCreateAPIView):
    queryset = TokenOwnership.objects.all()
    serializer_class = TokenOwnershipSerializer

    def post(self, request, *args, **kwargs):
        wallet_address = request.data.get("wallet_address")
        token_type = request.data.get("token_type")
        token_amount = request.data.get("token_amount")
        asset_id = request.data.get("asset_id")  # Optional for FST tokens

        if not all([wallet_address, token_type, token_amount]):
            raise ValidationError(
                {
                    "error": "Fields 'wallet_address', 'token_type', and 'token_amount' are required."
                }
            )

        user = get_object_or_404(User, wallet_address=wallet_address)

        asset = None
        if token_type == "FST" and asset_id:
            asset = get_object_or_404(Asset, id=asset_id)

        ownership = TokenOwnership.objects.create(
            user=user, token_type=token_type, token_amount=token_amount, asset=asset
        )
        return Response(self.serializer_class(ownership).data, status=201)


# Retrieve User Details and Token Holdings
class UserTokenHoldingsView(RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = "wallet_address"

    def get_queryset(self):
        return User.objects.all()

    def get(self, request, *args, **kwargs):
        wallet_address = kwargs.get("wallet_address")
        user = get_object_or_404(User, wallet_address=wallet_address)

        token_ownerships = TokenOwnership.objects.filter(user=user)
        return Response(
            {
                "user": UserSerializer(user).data,
                "token_holdings": TokenOwnershipSerializer(
                    token_ownerships, many=True
                ).data,
            }
        )


# Distribute Staking Rewards
class DistributeStakingRewards(APIView):
    def post(self, request):
        try:
            rewards_distributed = Decimal("0")
            reward_rate = Decimal("0.05")

            for ownership in TokenOwnership.objects.filter(token_type="FCT"):
                rewards = ownership.token_amount * reward_rate
                ownership.staking_rewards += rewards
                ownership.save()
                rewards_distributed += rewards

            return Response(
                {"message": f"Successfully distributed {rewards_distributed} rewards."}
            )
        except Exception as e:
            return Response(
                {"error": f"Failed to distribute rewards: {str(e)}"}, status=500
            )


# Asset Management View


# FAQ Semantic Matching and Retrieval View
class FAQMatchView(APIView):
    """
    Matches user queries to predefined FAQs using Hugging Face API or retrieves all FAQs.
    """

    HF_API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2"
    HF_API_TOKEN = "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"

    permission_classes = [AllowAny]  # 👈 This makes it public

    def get(self, request):
        """
        Returns all predefined FAQs.
        """
        return JsonResponse(faqs, safe=False)

    def post(self, request):
        """
        Matches a user's query to the closest FAQ using Hugging Face's semantic matching.
        """
        user_query = request.data.get("query", "").strip()
        if not user_query:
            return JsonResponse({"error": "No query provided"}, status=400)

        headers = {"Authorization": f"Bearer {self.HF_API_TOKEN}"}
        payload = {
            "inputs": {
                "source_sentence": user_query,
                "sentences": [faq["question"] for faq in faqs],
            }
        }

        try:
            response = requests.post(
                self.HF_API_URL, headers=headers, json=payload, timeout=10
            )
            response.raise_for_status()
            scores = response.json()
        except requests.exceptions.RequestException as e:
            return JsonResponse(
                {"error": "Hugging Face API request failed", "details": str(e)},
                status=500,
            )

        # Find best match
        try:
            best_match_idx = scores.index(max(scores))
            best_score = max(scores)
        except (ValueError, IndexError):
            return JsonResponse({"error": "Failed to process API response"}, status=500)

        threshold = 0.5
        if best_score >= threshold:
            result = {
                "question": faqs[best_match_idx]["question"],
                "answer": faqs[best_match_idx]["answer"],
                "score": best_score,
            }
        else:
            self.log_unmatched_query(user_query)
            result = {
                "question": None,
                "answer": "Sorry, I couldn't find a relevant FAQ. Please try rephrasing your question.",
                "score": best_score,
            }

        return JsonResponse(result)

    def log_unmatched_query(self, query):
        """
        Logs unmatched queries to the database for review.
        """
        try:
            UnmatchedQuery.objects.create(query=query)
        except Exception as e:
            print(f"Failed to log unmatched query: {e}")


# FAQ Suggestions View
class FAQSuggestionsView(APIView):
    permission_classes = [AllowAny]
    """
    Provides smarter suggestions for FAQs based on user queries.
    """

    def get(self, request):
        """
        Returns FAQ suggestions for a partial query (?query=example).
        """
        user_query = request.GET.get("query", "").strip()
        if not user_query:
            return JsonResponse(
                {"error": "Query parameter 'query' is required."}, status=400
            )

        # Match if the query is a substring or starts with the query string
        matches = [
            faq
            for faq in faqs
            if user_query.lower() in faq["question"].lower()
            or faq["question"].lower().startswith(user_query.lower())
        ]
        return JsonResponse({"suggestions": matches[:5]})


# FAQ Submission View
class FAQSubmitView(APIView):
    """
    Allows users to submit new questions for review.
    """

    def post(self, request):
        user_question = request.data.get("question", "").strip()
        if not user_question:
            return JsonResponse({"error": "No question provided"}, status=400)

        try:
            UnmatchedQuery.objects.create(query=user_question)
            return JsonResponse(
                {"message": "Your question has been submitted successfully."},
                status=201,
            )
        except Exception as e:
            return JsonResponse(
                {"error": "Failed to submit your question", "details": str(e)},
                status=500,
            )

@api_view(['POST'])
def create_fxt_token(request):
    try:
        # Define FXT Token parameters
        token_name = "FractionaX Token"
        token_symbol = "FXT"
        initial_supply = 1000000000  # 1 Billion FXT
        decimals = 8  # FXT has 8 decimal places

        # Create the Token
        transaction = TokenCreateTransaction() \
            .setTokenName(token_name) \
            .setTokenSymbol(token_symbol) \
            .setTreasuryAccountId(hedera_client.operatorAccountId) \
            .setInitialSupply(initial_supply) \
            .setDecimals(decimals) \
            .setAdminKey(hedera_client.operatorPublicKey) \
            .setSupplyKey(hedera_client.operatorPublicKey) \
            .setFreezeKey(hedera_client.operatorPublicKey) \
            .setWipeKey(hedera_client.operatorPublicKey) \
            .freezeWith(hedera_client)

        # Sign and submit the transaction
        signed_transaction = transaction.sign(hedera_client.operatorPrivateKey)
        response = signed_transaction.execute(hedera_client)

        # Get the new token ID
        receipt = response.getReceipt(hedera_client)
        token_id = receipt.tokenId

        return Response({"message": "FXT Token Created!", "token_id": str(token_id)}, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
    

@api_view(['POST'])
def transfer_fxt(request):
    try:
        sender_id = request.data.get("sender_id")  # Example: "0.0.5298545"
        recipient_id = request.data.get("recipient_id")  # Example: "0.0.123456"
        amount = int(request.data.get("amount"))  # Amount of FXT to send

        # Convert sender/recipient to AccountId objects
        sender = AccountId.fromString(sender_id)
        recipient = AccountId.fromString(recipient_id)

        # Create the transfer transaction
        transaction = TransferTransaction() \
            .addTokenTransfer("YOUR_FXT_TOKEN_ID", sender, -amount) \
            .addTokenTransfer("YOUR_FXT_TOKEN_ID", recipient, amount) \
            .freezeWith(hedera_client)

        # Sign and execute the transaction
        signed_transaction = transaction.sign(hedera_client.operatorPrivateKey)
        response = signed_transaction.execute(hedera_client)

        # Get transaction receipt
        receipt = response.getReceipt(hedera_client)

        return Response({"message": "Transfer Successful", "transaction_id": str(receipt.transactionId)}, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['GET'])
def get_fxt_balance(request, account_id):
    try:
        # Convert account ID to AccountId object
        account = AccountId.fromString(account_id)

        # Query Hedera for the account balance
        balance = AccountBalanceQuery().setAccountId(account).execute(hedera_client)

        # Get FXT balance from token balances
        fxt_balance = balance.tokens.get("YOUR_FXT_TOKEN_ID", 0)

        return Response({"account_id": str(account_id), "FXT_balance": fxt_balance}, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)