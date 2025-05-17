from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from .models import User, Asset, TokenOwnership, Property, Investment

User = get_user_model()


class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = "__all__"  # Serialize all fields


class PropertySerializer(serializers.ModelSerializer):  # ✅ Correct name
    """
    Serializer for the Property model.
    Converts Property model instances into JSON format for API responses.
    """
    class Meta:
        model = Property
        fields = "__all__"  # ✅ Serialize all fields

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "email",
            "wallet_address",  # Added wallet_address field
            "first_name",
            "last_name",
            "password",
            "confirm_password",
        ]

    def validate(self, attrs):
        # Validate that passwords match
        if attrs.get("password") != attrs.get("confirm_password"):
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )
        # Validate the password using Django's built-in validators
        validate_password(attrs.get("password"))
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")  # Remove confirm_password before saving
        user = User.objects.create(
            email=validated_data["email"],
            wallet_address=validated_data["wallet_address"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source="full_name", read_only=True)  # Added full_name property

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "wallet_address",
            "first_name",
            "last_name",
            "full_name",  # Added full_name field
            "is_active",
            "is_staff",
            "date_joined",
        ]
        read_only_fields = [
            "is_active",
            "is_staff",
            "date_joined",
            "full_name",  # Mark full_name as read-only
        ]


# Asset Serializer
class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ["id", "name", "description", "price", "created_at"]  # Ensure all fields are included
        read_only_fields = ["created_at"]  # Ensure created_at is read-only


# Token Ownership Serializer
class TokenOwnershipSerializer(serializers.ModelSerializer):
    wallet_address = serializers.CharField(source="user.wallet_address", read_only=True)
    asset = AssetSerializer(read_only=True)  # Nested AssetSerializer for asset details
    asset_id = serializers.PrimaryKeyRelatedField(
        queryset=Asset.objects.all(), source="asset", write_only=True
    )  # Allow writing asset by ID

    class Meta:
        model = TokenOwnership
        fields = [
            "id",
            "wallet_address",
            "token_type",
            "token_amount",
            "asset",
            "asset_id",  # Added asset_id for writing
            "staking_rewards",
            "created_at",
        ]
        read_only_fields = ["staking_rewards", "created_at"]  # Mark read-only fields

# Token Ownership Serializer
class TokenOwnershipSerializer(serializers.ModelSerializer):
    wallet_address = serializers.CharField(source="user.wallet_address", read_only=True)
    asset = AssetSerializer(
        read_only=True
    )  # Use the AssetSerializer for nested representation

    class Meta:
        model = TokenOwnership
        fields = [
            "id",
            "wallet_address",
            "token_type",
            "token_amount",
            "asset",
            "staking_rewards",
        ]
