''' This File Will Give Better Error Messages
to match our security requirements
'''

import re
from django.core.exceptions import ValidationError

# Passwword Strength Validator

class StrongPasswordValidator:


    '''Requires the password to have
        -> At least 8 characters
         -> At Least 1 uppercase letter
         -> At least 1 Lowercase Letter
         -> At least 1 Digit
         -> At least 1  special Character
         '''
    def validate(self, password, user=None):
        errors = []

        if len(password) < 8:
            errors.append("Password must be at least 8 characters long.")

        if not re.search(r'[A-Z]', password):
            errors.append("Password must contain at least one uppercase letter.")

        if not re.search(r'[a-z]', password):
            errors.append("Password must contain at least one lowercase letter.")

        if not re.search(r'\d', password):
            errors.append("Password must contain at least one number.")

        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            errors.append("Password must contain at least one special character.")

        if errors:
            raise ValidationError(errors)  # raises ALL errors at once

    def get_help_text(self):
        return (
            "Password must be 8+ characters with uppercase, lowercase, "
            "a number, and a special character."
        )
    
''' Email DOMAIN Validator
Blocks The Disposable emails like mailinator , tempemails'''

BLOCKED_EMAIL_DOMAINS = [
    'mailinator.com', 'tempmail.com', 'throwaway.email',
    'guerrillamail.com', 'yopmail.com', 'sharklasers.com',
]

def validate_email_domain(email):
    # split email at @ and check the domain part
    domain = email.split('@')[-1].lower()
    if domain in BLOCKED_EMAIL_DOMAINS:
        raise ValidationError(
            f"Email addresses from {domain} are not allowed. Please use a real email."
        )
    
# Phone NUmber Validator

def validate_phone_number(phone):
    # strip spaces and dashes before checking
    cleaned = re.sub(r'[\s\-]', '', phone)
    if not re.match(r'^\+?[0-9]{10,15}$', cleaned):
        raise ValidationError(
            "Enter a valid phone number (10-15 digits, optional + prefix)."
        )
    
# Name Validator Make Sure The Names dont contains  any numbers or weird symbols

def validate_name(value):
    if not re.match(r"^[a-zA-Z\s\-']{2,50}$", value):
        raise ValidationError(
            "Name must be 2–50 characters and contain only letters, spaces, or hyphens."
        )
    
