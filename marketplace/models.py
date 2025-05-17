from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    Group,
    Permission,
    BaseUserManager,
)
from django.db import models
from django.conf import settings
from .managers import CustomUserManager  # Ensure you have this


class CustomUserManager(BaseUserManager):
    def create_user(self, email, wallet_address, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        if not wallet_address:
            raise ValueError("The Wallet Address field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, wallet_address=wallet_address, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, wallet_address, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, wallet_address, password, **extra_fields)
    
class Achievement(models.Model):
    name = models.CharField(max_length=255, unique=True)
    icon = models.CharField(max_length=10, default="🏆")  # Optional
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Investment(models.Model):
    name = models.CharField(max_length=255)
    investment_type = models.CharField(max_length=100)
    value = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name="Email Address")
    wallet_address = models.CharField(
        max_length=42,
        unique=True,
        verbose_name="Wallet Address",
        blank=True,
        null=True
    )
    
    # ✅ User progression fields
    level = models.IntegerField(default=1)  
    xp = models.IntegerField(default=0)
    xp_for_next_level = models.IntegerField(default=100)
    achievements = models.ManyToManyField(Achievement, blank=True)

    liked_investments = models.ManyToManyField(
        Investment, related_name="liked_by_users", blank=True
    )
    
    first_name = models.CharField(
        max_length=30, verbose_name="First Name", blank=True, null=True
    )
    last_name = models.CharField(
        max_length=30, verbose_name="Last Name", blank=True, null=True
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    # ✅ Custom related names to prevent Django clashes
    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="Groups",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="User Permissions",
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["wallet_address"]

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-date_joined"]

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        return f"{self.first_name or ''} {self.last_name or ''}".strip() or self.email


class Asset(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class TokenOwnership(models.Model):
    TOKEN_TYPE_CHOICES = [
        ("FCT", "Fractional Collateral Token"),
        ("FST", "Fractional Security Token"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Dynamically refers to the custom User model
        on_delete=models.CASCADE,
        related_name="owned_tokens",
    )
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name="token_holders",
        null=True,
        blank=True,
    )
    token_type = models.CharField(max_length=3, choices=TOKEN_TYPE_CHOICES)
    token_amount = models.DecimalField(max_digits=10, decimal_places=2)
    staking_rewards = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Token Ownership"
        verbose_name_plural = "Token Ownerships"

    def __str__(self):
        return f"{self.user.wallet_address} owns {self.token_amount} {self.token_type}"


class UnmatchedQuery(models.Model):
    query = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Unmatched Query: {self.query[:50]}..."
    

# ✅ Integrating Property Model
class Property(models.Model):
    """
    Stores real estate listings from external APIs.
    """
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="properties",
        null=True,
        blank=True,
    )
    address = models.CharField(max_length=255, unique=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    square_feet = models.IntegerField()
    price_per_sqft = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=50, choices=[("For Sale", "For Sale"), ("Foreclosure", "Foreclosure"), ("Sold", "Sold")])
    days_on_market = models.IntegerField()
    estimated_value = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.square_feet > 0:
            self.price_per_sqft = self.price / self.square_feet
        super(Property, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.address} - ${self.price}"


class PropertyInvestment(models.Model):
    """
    Links a User’s Investment to a specific Property.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="property_investments"
    )
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="investments"
    )
    investment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    stake_percentage = models.DecimalField(max_digits=5, decimal_places=2, help_text="Percentage of property owned")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Property Investment"
        verbose_name_plural = "Property Investments"

    def __str__(self):
        return f"{self.user.email} invested {self.investment_amount} in {self.property.address}"

class UserPropertyFilter(models.Model):
    """
    Stores user preferences for property alerts.
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    min_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    max_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    property_type = models.CharField(max_length=50, null=True, blank=True)
