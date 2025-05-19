from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Custom user model; you can add fields like role if needed
    pass


class Company(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)  # New field
    name = models.CharField(max_length=100)
    address = models.TextField()
    contact_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class Drug(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)  # New field
    name = models.CharField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE,null=True, blank=True)
    category = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()

    def __str__(self):
        return self.name


class Purchase(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)  # New field
    drug = models.ForeignKey(Drug, on_delete=models.CASCADE,null=True, blank=True)
    quantity = models.IntegerField()
    purchase_date = models.DateField()
    supplier_name = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.drug.stock += self.quantity
            self.drug.save()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.drug.stock -= self.quantity
        self.drug.save()
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"Purchase of {self.drug.name} on {self.purchase_date}"


class Sale(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)  # New field
    drug = models.ForeignKey(Drug, on_delete=models.CASCADE,null=True, blank=True)
    quantity = models.IntegerField()
    sale_date = models.DateField()
    customer_name = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.drug.stock -= self.quantity
            self.drug.save()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.drug.stock += self.quantity
        self.drug.save()
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"Sale of {self.drug.name} to {self.customer_name}"


class HistorySale(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)  # New field
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE,null=True, blank=True)
    date_recorded = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"History for Sale ID: {self.sale.id}"


class Expiry(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)  # New field
    drug = models.ForeignKey(Drug, on_delete=models.CASCADE,null=True, blank=True)
    expiry_date = models.DateField()

    def __str__(self):
        return f"{self.drug.name} expires on {self.expiry_date}"


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE,null=True, blank=True)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE,null=True, blank=True)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender} to {self.receiver}"


class Inbox(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE,null=True, blank=True)
    last_checked = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Inbox of {self.user.username}"


class MessageHistory(models.Model):
    id = models.AutoField(primary_key=True)
    message = models.ForeignKey(Message, on_delete=models.CASCADE,null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('read', 'Read'), ('unread', 'Unread')])
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.message} - {self.status}"
