from django.urls import path #add this fodler   
from .views import AssetListCreateView

urlpatterns = [
    path('assets/', AssetListCreateView.as_view(), name='asset-list-create'),
]
from .views import WalletAuthView #added everything after this line

urlpatterns = [
    path('assets/', AssetListCreateView.as_view(), name='asset-list-create'),
    path('wallet-auth/', WalletAuthView.as_view(), name='wallet-auth'),
]
