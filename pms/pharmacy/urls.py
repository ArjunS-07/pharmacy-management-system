from django.urls import path
from django.contrib.auth import views as auth_views
from .views import register
from django.contrib.auth import views as auth_views
from . import views
from django.views.generic import TemplateView



urlpatterns = [
    # Home
path('', views.public_home, name='public_home'),

path('home', views.home, name='home'),  # <- 'home' name added here
  
 
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),


    # Company URLs
    path('companies/', views.company_list, name='company_list'),
    path('companies/add/', views.company_create, name='company_create'),
    path('companies/edit/<int:pk>/', views.company_update, name='company_update'),
    path('companies/delete/<int:pk>/', views.company_delete, name='company_delete'),

    # Drug URLs
    path('drugs/', views.drug_list, name='drug_list'),
    path('drugs/add/', views.drug_create, name='drug_create'),
    path('drugs/edit/<int:pk>/', views.drug_update, name='drug_update'),
    path('drugs/delete/<int:pk>/', views.drug_delete, name='drug_delete'),

    # Purchase URLs
    path('purchases/', views.purchase_list, name='purchase_list'),
    path('purchases/add/', views.purchase_create, name='purchase_create'),
    path('purchases/edit/<int:pk>/', views.purchase_update, name='purchase_update'),
    path('purchases/delete/<int:pk>/', views.purchase_delete, name='purchase_delete'),

    # Sale URLs
    path('sales/', views.sale_list, name='sale_list'),
    path('sales/add/', views.sale_create, name='sale_create'),
    path('sales/edit/<int:pk>/', views.sale_update, name='sale_update'),
    path('sales/delete/<int:pk>/', views.sale_delete, name='sale_delete'),

    # History Sale URLs
    path('history_sales/', views.history_sale_list, name='history_sale_list'),
    path('history_sales/add/', views.history_sale_create, name='history_sale_create'),
    path('history_sales/edit/<int:pk>/', views.history_sale_update, name='history_sale_update'),
    path('history_sales/delete/<int:pk>/', views.history_sale_delete, name='history_sale_delete'),
]













