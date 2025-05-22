from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Company, Drug, Purchase, Sale, HistorySale
from .forms import CompanyForm, DrugForm, PurchaseForm, SaleForm, HistorySaleForm
from .forms import UserRegisterForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.db.models import Q
def public_home(request):
    return render(request, 'basic.html')


# ---------------- Home ----------------
@login_required
def home(request):
    return render(request, 'home.html')



# ---------------- Company Views ----------------
@login_required
def company_list(request):

    query = request.GET.get('q')
    companies = Company.objects.filter(user=request.user)
    if query:
        companies = companies.filter(
        Q(name__icontains=query) |
        Q(contact__icontains=query)
    )
    return render(request, 'company_list.html', {'companies': companies})

@login_required
def company_create(request):
    if request.method == 'POST':
        form = CompanyForm(request.POST)
        if form.is_valid():
            company = form.save(commit=False)
            company.user = request.user
            company.save()
            return redirect('company_list')
    else:
        form = CompanyForm()
    return render(request, 'company_form.html', {'form': form})

@login_required
def company_update(request, pk):
    company = get_object_or_404(Company, pk=pk, user=request.user)
    if request.method == 'POST':
        form = CompanyForm(request.POST, instance=company)
        if form.is_valid():
            form.save()
            return redirect('company_list')
    else:
        form = CompanyForm(instance=company)
    return render(request, 'company_form.html', {'form': form})

@login_required
def company_delete(request, pk):
    company = get_object_or_404(Company, pk=pk, user=request.user)
    if request.method == 'POST':
        company.delete()
        return redirect('company_list')
    return render(request, 'company_confirm_delete.html', {'company': company})

# ---------------- Drug Views ----------------
@login_required
def drug_list(request):
    drugs = Drug.objects.filter(user=request.user)
    return render(request, 'drug_list.html', {'drugs': drugs})

@login_required
def drug_create(request):
    if request.method == 'POST':
        form = DrugForm(request.POST)
        if form.is_valid():
            drug = form.save(commit=False)
            drug.user = request.user
            drug.save()
            return redirect('drug_list')
    else:
        form = DrugForm()
    return render(request, 'drug_form.html', {'form': form})

@login_required
def drug_update(request, pk):
    drug = get_object_or_404(Drug, pk=pk, user=request.user)
    if request.method == 'POST':
        form = DrugForm(request.POST, instance=drug)
        if form.is_valid():
            form.save()
            return redirect('drug_list')
    else:
        form = DrugForm(instance=drug)
    return render(request, 'drug_form.html', {'form': form})

@login_required
def drug_delete(request, pk):
    drug = get_object_or_404(Drug, pk=pk, user=request.user)
    if request.method == 'POST':
        drug.delete()
        return redirect('drug_list')
    return render(request, 'drug_confirm_delete.html', {'drug': drug})

# ---------------- Purchase Views ----------------
@login_required
def purchase_list(request):
    purchases = Purchase.objects.filter(user=request.user)
    return render(request, 'purchase_list.html', {'purchases': purchases})

@login_required
def purchase_create(request):
    if request.method == 'POST':
        form = PurchaseForm(request.POST)
        if form.is_valid():
            purchase = form.save(commit=False)
            purchase.user = request.user
            purchase.save()
            return redirect('purchase_list')
    else:
        form = PurchaseForm()
    return render(request, 'purchase_form.html', {'form': form})

@login_required
def purchase_update(request, pk):
    purchase = get_object_or_404(Purchase, pk=pk, user=request.user)
    if request.method == 'POST':
        form = PurchaseForm(request.POST, instance=purchase)
        if form.is_valid():
            form.save()
            return redirect('purchase_list')
    else:
        form = PurchaseForm(instance=purchase)
    return render(request, 'purchase_form.html', {'form': form})

@login_required
def purchase_delete(request, pk):
    purchase = get_object_or_404(Purchase, pk=pk, user=request.user)
    if request.method == 'POST':
        purchase.delete()
        return redirect('purchase_list')
    return render(request, 'purchase_confirm_delete.html', {'purchase': purchase})

# ---------------- Sale Views ----------------
@login_required
def sale_list(request):
    sales = Sale.objects.filter(user=request.user)
    return render(request, 'sale_list.html', {'sales': sales})

@login_required
def sale_create(request):
    if request.method == 'POST':
        form = SaleForm(request.POST)
        if form.is_valid():
            sale = form.save(commit=False)
            sale.user = request.user
            sale.save()
            return redirect('sale_list')
    else:
        form = SaleForm()
    return render(request, 'sale_form.html', {'form': form})

@login_required
def sale_update(request, pk):
    sale = get_object_or_404(Sale, pk=pk, user=request.user)
    if request.method == 'POST':
        form = SaleForm(request.POST, instance=sale)
        if form.is_valid():
            form.save()
            return redirect('sale_list')
    else:
        form = SaleForm(instance=sale)
    return render(request, 'sale_form.html', {'form': form})

@login_required
def sale_delete(request, pk):
    sale = get_object_or_404(Sale, pk=pk, user=request.user)
    if request.method == 'POST':
        sale.delete()
        return redirect('sale_list')
    return render(request, 'sale_confirm_delete.html', {'sale': sale})

# ---------------- History Sale Views ----------------
@login_required
def history_sale_list(request):
    histories = HistorySale.objects.filter(user=request.user)
    return render(request, 'history_sale_list.html', {'histories': histories})

@login_required
def history_sale_create(request):
    if request.method == 'POST':
        form = HistorySaleForm(request.POST)
        if form.is_valid():
            history = form.save(commit=False)
            history.user = request.user
            history.save()
            return redirect('history_sale_list')
    else:
        form = HistorySaleForm()
    return render(request, 'history_sale_form.html', {'form': form})

@login_required
def history_sale_update(request, pk):
    history = get_object_or_404(HistorySale, pk=pk, user=request.user)
    if request.method == 'POST':
        form = HistorySaleForm(request.POST, instance=history)
        if form.is_valid():
            form.save()
            return redirect('history_sale_list')
    else:
        form = HistorySaleForm(instance=history)
    return render(request, 'history_sale_form.html', {'form': form})

@login_required
def history_sale_delete(request, pk):
    history = get_object_or_404(HistorySale, pk=pk, user=request.user)
    if request.method == 'POST':
        history.delete()
        return redirect('history_sale_list')
    return render(request, 'history_sale_confirm_delete.html', {'history': history})




def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # auto-login after registration
            return redirect('home')
    else:
        form = UserRegisterForm()
    return render(request, 'register.html', {'form': form})

