import requests
import logging
from django.core.cache import cache
from django.conf import settings

logger = logging.getLogger(__name__)

# ✅ Load API keys from settings
RENTCAST_API_KEY = getattr(settings, "RENTCAST_API_KEY", None)
ATTOM_API_KEY = getattr(settings, "ATTOM_API_KEY", None)

class PropertyAPIService:
    """Service for fetching property data from RentCast and Attom APIs with caching."""

    @staticmethod
    def fetch_rentcast_data(property_address=None, state="TX"):
        """
        Fetch property details from RentCast API. 
        If no specific address is provided, fetch default Texas listings.
        """
        if not RENTCAST_API_KEY:
            logger.error("❌ RentCast API Key is missing")
            return {"error": "RentCast API Key is missing"}

        if not property_address:
            logger.warning("⚠️ No specific address provided. Fetching Texas listings instead.")
            return {}  # ✅ Return an empty response if no address

        cache_key = f"rentcast_{property_address.replace(' ', '_')}"  # ✅ Safe cache key
        cached_data = cache.get(cache_key)
        if cached_data:
            logger.info(f"✅ Using cached RentCast data for {property_address}")
            return cached_data

        url = "https://api.rentcast.io/v1/properties"
        headers = {"X-Api-Key": RENTCAST_API_KEY}
        params = {"address": property_address}

        try:
            response = requests.get(url, headers=headers, params=params, timeout=5)
            response.raise_for_status()
            data = response.json()

            cache.set(cache_key, data, timeout=21600)  # ✅ Cache for 6 hours
            return data
        except requests.exceptions.RequestException as e:
            logger.error(f"❌ RentCast API request failed: {e}")
            return {"error": f"Failed to fetch RentCast data: {str(e)}"}

    @staticmethod
    def fetch_attom_data(property_address):
        """
        Fetch tax, sales, and valuation history from Attom API with caching.
        Requires a **full property address** to function properly.
        """
        if not ATTOM_API_KEY:
            logger.error("❌ Attom API Key is missing")
            return {"error": "Attom API Key is missing"}

        if not property_address or len(property_address.split(",")) < 3:
            logger.error(f"❌ Invalid address format: {property_address}")
            return {"error": "Invalid address format. Full address required."}

        cache_key = f"attom_{property_address.replace(' ', '_')}"  # ✅ Safe cache key
        cached_data = cache.get(cache_key)
        if cached_data:
            logger.info(f"✅ Using cached Attom data for {property_address}")
            return cached_data

        url = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail"
        headers = {"apikey": ATTOM_API_KEY}
        params = {"address1": property_address}

        try:
            response = requests.get(url, headers=headers, params=params, timeout=5)
            response.raise_for_status()
            data = response.json()

            cache.set(cache_key, data, timeout=86400)  # ✅ Cache for 24 hours
            return data
        except requests.exceptions.RequestException as e:
            logger.error(f"❌ Attom API request failed: {e}")
            return {"error": f"Failed to fetch Attom data: {str(e)}"}
