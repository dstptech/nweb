#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from rest_framework.test import APIClient
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from apps.authentication.models import CustomUser

# Get an editor or admin user
user = CustomUser.objects.filter(role__in=['admin', 'editor']).first()
if not user:
    print("Need an admin or editor user — create one first")
else:
    # Create actual PNG image using PIL
    img = Image.new('RGB', (1, 1), color='red')
    img_io = BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)
    
    # Create SimpleUploadedFile with correct content type
    uploaded_file = SimpleUploadedFile(
        name='test_image.png',
        content=img_io.getvalue(),
        content_type='image/png'
    )
    
    # Create API client and authenticate
    client = APIClient()
    client.force_authenticate(user=user)
    
    # Test upload
    response = client.post(
        '/api/v1/media/upload/',
        {
            'file': uploaded_file,
            'folder': 'homepage'
        },
        format='multipart'
    )
    
    print("\n" + "="*60)
    print("MEDIA UPLOAD TEST")
    print("="*60)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 201:
        data = response.json()['data']
        print(f"URL: {data['url']}")
        print(f"Size KB: {data['size_kb']}")
        print(f"Folder: {data['folder']}")
        print(f"Filename: {data['filename']}")
        print(f"MIME Type: {data['mime_type']}")
        print("="*60)
        print(f"\nResult: PASS")
    else:
        print(f"Error: {response.json()}")
        print("="*60)
        print(f"\nResult: FAIL ({response.status_code})")
