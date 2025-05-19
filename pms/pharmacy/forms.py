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
        fields = '__all__'

class DrugForm(forms.ModelForm):
    class Meta:
        model = Drug
        fields = '__all__'

class PurchaseForm(forms.ModelForm):
    class Meta:
        model = Purchase
        fields = '__all__'

class SaleForm(forms.ModelForm):
    class Meta:
        model = Sale
        fields = '__all__'

class HistorySaleForm(forms.ModelForm):
    class Meta:
        model = HistorySale
        fields = '__all__'
