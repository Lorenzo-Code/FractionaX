# from django.shortcuts import render #//Pre-filled code

from rest_framework.generics import ListCreateAPIView # add this line
from .models import Asset
from .serializers import AssetSerializer

class AssetListCreateView(ListCreateAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

from web3 import Web3 # add everything pass this line
from rest_framework.views import APIView
from rest_framework.response import Response

class WalletAuthView(APIView):
    def post(self, request):
        wallet_address = request.data.get("wallet_address")
        if not wallet_address:
            return Response({"error": "Wallet address is required"}, status=400)

        # Example wallet validation (Ethereum network)
        is_valid = Web3.isAddress(wallet_address)
        if not is_valid:
            return Response({"error": "Invalid wallet address"}, status=400)

        return Response({"message": "Wallet authenticated successfully"})
    
    def get(self, request):
        return Response({"error": "This endpoint only accepts POST requests with a wallet address."})

