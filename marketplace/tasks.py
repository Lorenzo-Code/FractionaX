from celery import shared_task
from .services.api_fetcher import PropertyAPIService
from .models import Property

@shared_task
def fetch_and_store_properties():
    """ Fetch property data and store it in the database """
    locations = ["New York", "San Francisco", "Los Angeles"]
    
    for location in locations:
        data = PropertyAPIService.fetch_zillow_data(location)
        for prop in data.get("listings", []):
            Property.objects.update_or_create(
                address=prop["address"],
                defaults={
                    "price": prop["price"],
                    "square_feet": prop["square_feet"],
                    "status": "For Sale",
                }
            )
def send_new_property_alerts():
    """ Send an email alert when new properties match user filters. """
    users = UserPropertyFilter.objects.all()
    
    for user_filter in users:
        matching_properties = Property.objects.filter(
            address__icontains=user_filter.location,
            price__gte=user_filter.min_price or 0,
            price__lte=user_filter.max_price or 999999999,
        )
        if matching_properties.exists():
            send_mail(
                "New Property Listings!",
                f"Hello {user_filter.user.email}, new properties are available in {user_filter.location}.",
                "no-reply@fractionax.com",
                [user_filter.user.email],
                fail_silently=True,
            )
