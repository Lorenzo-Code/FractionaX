from hedera import PrivateKey

# Replace with your actual key from .env
original_key = "3030020100300706052b8104000a0422042025516641c3609c00095e30c5a577fc9da100e1798e2c59f31a11bbd3a81054de"

try:
    # Convert the private key to the correct format
    private_key = PrivateKey.fromString(original_key)
    converted_key = private_key.toString()

    print("✅ Converted Private Key:", converted_key)
except Exception as e:
    print("❌ Error converting key:", str(e))
