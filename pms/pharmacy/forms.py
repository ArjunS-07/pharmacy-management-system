from django import forms
from .models import Company, Drug, Purchase, Sale, HistorySale
from django.contrib.auth.forms import UserCreationForm
from .models import User

class UserRegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

class CompanyForm(forms.ModelForm):
    class Meta:
        model = Company
        exclude = ['user']  # Removed fields='__all__'

class DrugForm(forms.ModelForm):
    class Meta:
        model = Drug
        exclude = ['user']

class PurchaseForm(forms.ModelForm):
    class Meta:
        model = Purchase
        exclude = ['user']

class SaleForm(forms.ModelForm):
    class Meta:
        model = Sale
        exclude = ['user']

class HistorySaleForm(forms.ModelForm):
    class Meta:
        model = HistorySale
        exclude = ['user']
