from django.urls import path
from django.views.generic import TemplateView
from .views import (
    WalletAuthView,
    FAQMatchView,
    FAQSubmitView,
    FAQSuggestionsView,
    TokenOwnershipListCreateView,
    UserTokenHoldingsView,
    DistributeStakingRewards,
    RegisterView,
    UserProfileView,
    OAuth2LoginView,  # ✅ OAuth2 login view
    LikedInvestmentsView,
    InvestmentListView,
    FetchPropertyDataAPIView,  # ✅ Import property API fetcher
    PropertyDetailView,  # ✅ Import property detail view
    create_fxt_token,  # ✅ Import FXT token creation view
    transfer_fxt,  # ✅ Import FXT token transfer view
    get_fxt_balance,  # ✅ Import FXT token balance view
)

urlpatterns = [
    # ✅ Authentication Routes
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", OAuth2LoginView.as_view(), name="login"),
    path("user-profile/", UserProfileView.as_view(), name="user-profile"),

    # ✅ Wallet & Token Routes
    path("wallet-auth/", WalletAuthView.as_view(), name="wallet-auth"),
    path("token-ownerships/", TokenOwnershipListCreateView.as_view(), name="token-ownership-list-create"),
    path("tokens/<str:wallet_address>/", UserTokenHoldingsView.as_view(), name="user-token-holdings"),
    path("distribute-rewards/", DistributeStakingRewards.as_view(), name="distribute-rewards"),

    # ✅ FAQ Routes
    path("faq/", FAQMatchView.as_view(), name="faq-match"),
    path("faq/submit/", FAQSubmitView.as_view(), name="faq-submit"),
    path("faq/suggestions/", FAQSuggestionsView.as_view(), name="faq-suggestions"),

    # ✅ Property Data Fetching Route
    path("fetch-properties/", FetchPropertyDataAPIView.as_view(), name="fetch-properties"),

    # ✅ Investment Routes
    path("liked-investments/", LikedInvestmentsView.as_view(), name="liked-investments"),
    path("investments/", InvestmentListView.as_view(), name="investment-list"),
    path("property-details/", PropertyDetailView.as_view(), name="property-details"),

    # ✅ React Frontend Catch-All
    path("", TemplateView.as_view(template_name="index.html")),

    # ✅ FXT Token Creation Route
    path('create-token/', create_fxt_token, name='create-token'),
    path('transfer/', transfer_fxt, name='transfer-fxt'),
    path('balance/<str:account_id>/', get_fxt_balance, name='get-fxt-balance'),
]
