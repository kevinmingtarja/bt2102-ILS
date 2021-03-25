from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
import time
import json

from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from django.core import serializers
from .serializers import *
from .models import *
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from bson.json_util import dumps
from bson.json_util import loads
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.views import generic
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied

import datetime
from pymongo import MongoClient
import pymongo

# Create your views here.

# Get current user
@api_view(['GET'])
def current_user(request):
    """
    Return the data of current user
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get list of books
@api_view(['GET'])
@permission_classes((AllowAny, ))
def bookList(request):
    books = Book_Instance.objects.all()[:200]
    serializer = BookInstanceSerializer(books, many = True)
    return Response(serializer.data)

# Create Categories
@api_view(['GET'])
@permission_classes((AllowAny, ))
def getCategories(request):
    books = Book_Instance.objects.all()
    d = {}
    for book in books:
        for category in json.loads(book.categories.replace('\'', '"')):
            if category not in d:
                d[category] = 1
    lst = []
    for k in d.keys():
        lst.append(k)

    return Response({"res": lst}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((AllowAny, ))
def getYears(request):
    books = Book_Instance.objects.all()
    d = {}

    for book in books:
        year = book.publishedDate
        if year:
            year = json.loads(book.publishedDate.replace('\'', '"'))['$date'].split('-')[0]
            print(year)
            if year not in d:
                d[year] = 1

    lst = []
    for k in d.keys():
        lst.append(k)
    
    lst.sort()

    return Response({"res": lst}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((AllowAny, ))
def getBook(request, pk):
    book = Book_Instance.objects.get(_id = pk)
    serializer = BookInstanceSerializer(book, many = False)
    return Response(serializer.data)

@api_view(['GET'])
def getUsersBorrowedBooks(request, userid):
    book = Book.objects.filter(borrowerid = userid)
    serializer = BookSerializer(book, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getUsersReservedBooks(request, userid):
    reservations = Reservation.objects.filter(reserverid = userid)
    books = [reservation.bookid for reservation in reservations]
    serializer = BookSerializer(books, many = True)
    return Response(serializer.data)

#Borrow book (CHECKED)
@api_view(['POST'])
def borrowBook(request):
    data = request.data
    bookid = data["bookid"]
    memberid = data["memberid"]

    if request.user.is_authenticated:
        #Check book's availability
        member = User.objects.get(id = memberid)
        book = Book.objects.get(bookid = bookid) #book = get_object_or_404(Book, bookid)
        isAvailable = book.availabilitystatus
        if isAvailable:
            # checking for unpaid fines
            try:
                fine = Fine.objects.get(memberid = member)
                if fine.paymentStatus == "Not Approved" :
                    return Response({"res": "Please Proceed to Pay Your Fines First"}, status=status.HTTP_403_FORBIDDEN)
            except ObjectDoesNotExist:
                numberOfBook = Book.objects.filter(borrowerid = member).count()
                #Check the number of book user has borrowed
                if numberOfBook >= 4:
                    return Response({"res": "Book Limit Exceeded"}, status=status.HTTP_403_FORBIDDEN)

                else:
                    #proceed to borrow the book
                    book.borrowerid = member
                    book.expectedduedate = datetime.date.today() + datetime.timedelta(days=30)
                    book.availabilitystatus = False
                    book.save(update_fields=["borrowerid", "expectedduedate", "availabilitystatus"])
                    serializer = BookSerializer(book)
                    return Response(serializer.data)

        return Response({"res": "Book is Currently Unavailable"}, status=status.HTTP_403_FORBIDDEN)
    return Response({"res": "User Not Authenticated"}, status=status.HTTP_403_FORBIDDEN)

# @login_required
@api_view(['POST'])
def returnBook(request): #not sure whether needs to take input memberid or use request.user.id
    # checking for unpaid fines
    data = request.data
    bookid = data['bookid']
    memberid = data['memberid']

    try:
        fine = Fine.objects.get(memberid = User.objects.get(id = memberid))
        if fine.paymentStatus == "Not Approved" :
            return Response({"res": "User is unable to return the book. User has to pay the fines first"}, status=status.HTTP_403_FORBIDDEN)
        else:
            # returning the book
            currentBook = get_object_or_404(Book, bookid = bookid)
            currentBook.borrowerid = None
            currentBook.availabilitystatus = True
            currentBook.expectedduedate = None
            currentBook.save()
            serializer = BookSerializer(currentBook)
            return Response(serializer.data)
    except ObjectDoesNotExist:
        # returning the book
        currentBook = get_object_or_404(Book, bookid = bookid)
        currentBook.borrowerid = None
        currentBook.availabilitystatus = True
        currentBook.expectedduedate = None
        currentBook.save()
        serializer = BookSerializer(currentBook)
        return Response(serializer.data)

@api_view(['POST'])
# @login_required
def reserveBook(request):
    data = request.data
    bookid = data['bookid']
    memberid = data['memberid']

    book = Book.objects.get(bookid = bookid)
    if request.user.is_authenticated:
        # checking for unpaid fines
        try:
            fine = Fine.objects.get(memberid = memberid)
            if fine.paymentStatus == "Not Approved" :
                return Response({"res": "User is unable to reserve the book. User has to pay the fines first."}, status=status.HTTP_403_FORBIDDEN)
        except ObjectDoesNotExist:
            # checking if reserved
            if book.reservationstatus:
                return Response({"res": "Book is currently reserved. User is unable to reserve the book."}, status=status.HTTP_403_FORBIDDEN)
    
            # checking if available
            elif book.availabilitystatus:
                return Response({"res": "Book is currently available. Please proceed to borrow the book instead."}, status=status.HTTP_403_FORBIDDEN)
    
            # reserving the book
            else:
                book.reservationstatus = True
                book.save(update_fields=["reservationstatus"])

                reservationno = int(time.time() * 1000000)
                reservation = Reservation(bookid = book, reserverid= User.objects.get(id = memberid), reservationno = reservationno)
                reservation.save()
                
                reservation_serializer = ReservationSerializer(reservation)
                book_serializer = BookSerializer(book)
                #if reservation_serializer.is_valid() and reservation_serializer.is_valid():
                #    reservation_serializer.save()
                #    book_serializer.save()
                return Response({'reservation':reservation_serializer.data,
                                 'book': book_serializer.data})
                #return Response(serializer.errors,
                #status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def cancelReservation(request, bookid, memberid):
    #gets the reservation tuple/entry 
    book = Book.objects.get(bookid = bookid)
    member = User.objects.get(id = memberid)
    #if request.method == 'DELETE': #still not sure.... or should it be delete hmmmm
    try:
        reservation = Reservation.objects.filter(reserverid=memberid, bookid=bookid).first()
        #deletes the entire reservation entry from Reservation table 
        reservation.delete()
        # from the user's input of the BookID, set status to false in Book table 
        book = Book.objects.get(bookid = bookid)
        book.reservationstatus = False
        book.save(update_fields=["reservationstatus"])
        serializer = BookSerializer(book)
        return Response(serializer.data)
    
    except :
        return Response({"res" : "User does not have reservation for this book"}, status = status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def convertToBorrow(request):
    data = request.data
    bookid = data['bookid']
    memberid = data['memberid']

    book = Book.objects.get(bookid = bookid)
    member = User.objects.get(id = memberid)

    if not book.borrowerid:
        reservation = Reservation.objects.filter(reserverid = memberid, bookid = bookid).first()
        #change book reservation status
        book.reservationstatus = False
        #set availability status to False
        book.availabilitystatus = False
        book.borrowerid = member
        book.expectedduedate = datetime.date.today() + datetime.timedelta(days=30)
        book.save(update_fields=['reservationstatus','availabilitystatus','borrowerid','expectedduedate'])
        #delete reservation
        reservation.delete()
        serializer = BookSerializer(book)
        return Response(serializer.data)
    else:
        return Response({"res": "This Book has not been returned yet by the previous borrower"}, status = status.HTTP_403_FORBIDDEN)

@api_view(['POST']) 
# @login_required
def renewBook(request):
    data = request.data
    bookid = data['bookid']
    memberid = data['memberid']

    currentBook =  Book.objects.get(bookid = bookid)

    #check if book has a pending reservation
    if currentBook.reservationstatus == True:
        return Response({"res": "Unable to renew as there is a pending reservation by another user"}, status=status.HTTP_403_FORBIDDEN)
    else:
        #if no pending reservation, allow user to borrow book again
        currentBook.borrowerid = User.objects.get(id = memberid)
        currentBook.availabilitystatus = False
        newDueDate = currentBook.expectedduedate + datetime.timedelta(days=30)
        currentBook.expectedduedate = newDueDate
        currentBook.save(update_fields=['borrowerid','availabilitystatus','expectedduedate'])
        serializer = BookSerializer(currentBook)
        return Response(serializer.data) 
        
client = MongoClient('localhost',port = 27017)
db = client['library-django-db']
class BookListView(generics.ListAPIView):
    serializer_class = BookInstanceSerializer
    permission_classes = [AllowAny, ]

    def get_queryset(self):
        if self.request.method == 'GET':
            query = self.request.GET.get('q', None)

            if query is not None:
                results = list(db.server_book_instance.find({"$text" : {"$search" : query}}))
                #lookups= Q(title_icontains=query) | Q(authors_icontains=query)
                #results= Book_Instance.objects.filter(lookups).distinct()
                results= loads(dumps(results, indent =2 ))
                queryset = results
            else:
                results = list(db.server_book_instance.find())
                results = loads(dumps(results, indent =2))
                queryset = results
            return queryset

class FilterListView(generics.ListAPIView):
    serializer_class = BookInstanceSerializer
    permission_classes = [AllowAny, ]

    def get_queryset(self):
         if self.request.method == 'GET':
            query1 = self.request.GET.get('category',None)
            query2 = self.request.GET.get('year',None)
            if query1 is not None and query2 is not None:
                results = db.server_book_instance.find({"$and" :[{"categories": {"$regex" : "internet", "$options" : "i"}}, {"publishedDate" : {"$regex" :"2009","$options" :"i"}}]})
                
                #lookups= Q(title_icontains=query) | Q(authors_icontains=query)
                #results= Book_Instance.objects.filter(lookups).distinct()
                results= loads(dumps(results, indent =2 ))
                queryset = results
            elif query1 is not None and query2 is None:
                results = list(db.server_book_instance.find({"categories" : {"$regex": query1, '$options' : 'i'}}))
                results= loads(dumps(results, indent =2 ))
                queryset = results
            elif (query1 is None) and (query2 is not None):
                results = list(db.server_book_instance.find({"publishedDate" : {"$regex": query2, '$options' : 'i'}}))
                results= loads(dumps(results, indent =2 ))
                queryset = results
            else:
                results = list(db.server_book_instance.find())
                results = loads(dumps(results, indent =2))
                queryset = results
            return queryset


@api_view(['GET'])
def calculateFine(request) :
    listOfMember = Memberuser.objects.all()
    instances = []
    book_instances = []
    for member in listOfMember: 
        listOfBook = member.book_set.all() #return empty queryset if does not exist
        if listOfBook.exists() : #Check whether member has borrowed books
            fine = 0
            currentDate = datetime.date.today()
            for book in listOfBook:
                if book.expectedduedate > currentDate:
                    fine += (currentDate - book.expectedduedate).days
                else:
                    continue
            if fine > 0:
                try:        #Check whether this particular member has already had a previous record in Fine
                    record = Fine.objects.get(memberid = member)
                    record.amount = fine
                    record.save()
                    instances.append(record)
                except ObjectDoesNotExist:
                     newRecord = Fine(memberid =member)
                     newRecord.save()
                     instances.append(newRecord)
            try:
                reservations = Reservation.objects.filter(memberid = member)
                records = Reservation.objects.filter(memberid = member)
                booklist = []
                for book in records:
                    bookidlist.append(book.bookid)
                #deletes the entire reservation entry from Reservation table 
                for reservation in reservations:
                    reservation.delete()
                # from the user's input of the BookID, set status to false in Book table 
                for bookid in bookidlist:
                    book = Book.objects.get(bookid = bookid)
                    book.reservationstatus = False
                    book.save(update_fields=["reservationstatus"])
                    book_instances.append(book)
            except ObjectDoesNotExist:
                continue
        else:
            continue
    if len(instances) > 0:
        serializer = FineSerializer(instances, many = True)
        if len(book_instances) > 0:
            book_serializer = BookSerializer(book_instances,many=True)
        return Response({'fine': serializer.data,
                         'book' : book_serializer.data})
    return Response({"res": "No Fine Recorded"}) #not sure what to return if Nothing changes

#pay fine, only show this for member who has fine
@login_required
def pay_fine(request, memberid):
    fine = Fine.objects.get(memberid = Memberuser.objects.get(memberid = memberid))
    amount = fine.amount
    if request.method == 'POST':
        fine.paymentmethod = request.data['paymentmethod']  #payment method updated
        #proceeds to pay here

        #payment validation
        fine.paymentstatus = "Approved"
        fine.save(update_fields["paymentmethod", "paymentstatus"])#updates the payment status 

