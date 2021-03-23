from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken

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
    books = Book_Instance.objects.all()[:100]
    serializer = BookInstanceSerializer(books, many = True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny, ))
def getBook(request, pk):
    book = Book_Instance.objects.get(_id = pk)
    serializer = BookInstanceSerializer(book, many = False)
    return Response(serializer.data)

#Borrow book (CHECKED)
@api_view(['GET'])
def borrowBook(request, bookid, memberid):
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
                        raise PermissionDenied("User is unable to reserve the book. User has to pay the fines first.") #Denied Permission, still not sure
                except ObjectDoesNotExist:
                    numberOfBook = Book.objects.filter(borrowerid = member).count()
                    #Check the number of book user has borrowed
                    if numberOfBook >= 4:
                        raise PermissionDenied("User has reached maximum borrowing limit. User cannot borrow the book") #Denied Permission, still not sure

                    else:
                        #proceed to borrow the book
                        book.borrowerid = member
                        book.expectedduedate = datetime.date.today() + datetime.timedelta(days=30)
                        availabiltystatus = "Not Available"
                        book.save(update_fields=["borrowerid", "expectedduedate", "availabilitystatus"])
                        serializer = BookSerializer(book)
                        return Response(serializer.data)
        else:
                raise PermissionDenied("Book is not available at the moment") #Denied Permission