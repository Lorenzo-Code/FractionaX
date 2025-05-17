from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UnmatchedQuery, Asset, TokenOwnership, Property, PropertyInvestment


from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    model = User  # ✅ Correct reference to the User model
    list_display = (
        "id",
        "email",
        "wallet_address",
        "first_name",
        "last_name",
        "is_staff",
        "is_active",
        "date_joined",
    )  # Added `id`
    list_filter = ("is_staff", "is_active", "date_joined")

    fieldsets = (
        ("Account Information", {"fields": ("email", "wallet_address", "password")}),
        ("Personal Information", {"fields": ("first_name", "last_name")}),
        (
            "Permissions",
            {"fields": ("is_staff", "is_active", "groups", "user_permissions")},
        ),
        ("Important Dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            "Create New User",
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "wallet_address",
                    "first_name",
                    "last_name",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )

    search_fields = (
        "email",
        "wallet_address",
        "first_name",
        "last_name",
    )  # ✅ Supports admin autocomplete
    ordering = ("email",)
    readonly_fields = ("date_joined", "last_login")  # ✅ Prevent modifications


# ✅ Register the Custom User model with Django Admin
admin.site.register(User, CustomUserAdmin)


@admin.register(UnmatchedQuery)
class UnmatchedQueryAdmin(admin.ModelAdmin):
    list_display = ("query", "created_at")
    search_fields = ("query",)
    list_filter = ("created_at",)


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "price", "created_at")
    search_fields = ("name", "description")
    list_filter = ("created_at",)
    ordering = ("-created_at",)


@admin.register(TokenOwnership)
class TokenOwnershipAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "asset",
        "token_type",
        "token_amount",
        "staking_rewards",
        "created_at",
    )
    search_fields = ("user__email", "asset__name", "token_type")
    list_filter = ("token_type", "created_at")
    autocomplete_fields = (
        "user",
        "asset",
    )  # Ensure this references the correct related models


admin.site.register(Property)
admin.site.register(PropertyInvestment)

