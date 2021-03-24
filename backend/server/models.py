# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django_mysql.models import EnumField
from django.contrib.auth.models import User


class Book(models.Model):
    class params:
        db = 'default'

    bookid = models.IntegerField(db_column='_id', primary_key=True)  # Field name made lowercase.
    title = models.CharField(db_column='title', max_length=100)  # Field name made lowercase.
    borrowerid = models.ForeignKey(User,  on_delete = models.SET_NULL, db_column='BorrowerID', default = None, blank = True, null=True)  # Field name made lowercase.
    availabilitystatus = models.BooleanField(db_column='availabilityStatus', default = True)  # Field name made lowercase
    expectedduedate = models.DateField(db_column='expectedDueDate', blank= True,null=True, default = None)  # Field name made lowercase.
    reservationstatus = models.BooleanField(db_column='reservationStatus', default = False)  # Field name made lowercase.

    class Meta:
        db_table = 'book'



class Fine(models.Model):
    class params:
        db = 'default'

    memberid = models.ForeignKey(User, on_delete = models.CASCADE, db_column='memberID')  # Field name made lowercase.
    paymentno = models.AutoField(db_column='paymentNo', primary_key = True)  # Field name made lowercase.
    amount = models.DecimalField(max_digits=10, decimal_places=0)
    paymentmethod = EnumField(db_column='paymentMethod', blank = True, null=True, choices = [
        ('DEBIT CARD', 'Debit Card'),
        ('CREDIT CARD', 'Credit Card'),
        ], default = None)  # Field name made lowercase.
    paymentstatus = EnumField(db_column='paymentStatus', choices =[
        ("Not Approved", "Not Approved"),
        ("Approved", "Approved"),
        ], default = 'Not Approved')# Field name made lowercase.

    class Meta:
        db_table = 'fine'




class Reservation(models.Model):
    class params:
        db = 'default'

    reserverid = models.ForeignKey(User, on_delete = models.CASCADE, db_column='reserverID')  # Field name made lowercase.
    bookid = models.ForeignKey(Book, on_delete = models.CASCADE, db_column='BookID')  # Field name made lowercase.
    reservationno = models.IntegerField(db_column='ReservationNo', primary_key= True)  # Field name made lowercase.

    class Meta:
        db_table = 'reservation'


from djongo import models
from django import forms
import pymongo

class Book_Instance(models.Model):
    class params:
        db = 'book_db'

    Book_Status = (
        ('PUBLISH', 'PUBLISH'),
        ('MEAP', 'MEAP')
        )
    _id = models.IntegerField(primary_key = True,blank = False)
    title = models.CharField(max_length = 100, blank = False)
    isbn = models.CharField(max_length = 50, blank = False)
    pageCount = models.IntegerField(blank = False)
    publishedDate = models.CharField(max_length = 100,blank = True)
    thumbnailUrl = models.CharField(max_length=200, blank = False)
    shortDescription = models.CharField(max_length =500, blank = True)
    longDescription = models.CharField(max_length = 2000, blank = True)
    status = models.CharField(max_length = 10, choices = Book_Status)
    authors = models.CharField(max_length=100, blank=False)
    categories = models.CharField(max_length=100, blank=False)
