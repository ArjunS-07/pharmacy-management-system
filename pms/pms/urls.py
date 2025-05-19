from django.contrib import admin
from django.urls import path, include, re_path
from django.http import HttpResponse, HttpResponseRedirect


from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('pharmacy.urls')),
    path('', lambda request: redirect('public_home')),  # Redirect to companies list
]
