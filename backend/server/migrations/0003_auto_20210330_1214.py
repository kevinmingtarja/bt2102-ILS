# Generated by Django 3.0.5 on 2021-03-30 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_book_fine_loan_payment_reservation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memberuser',
            name='memberpassword',
            field=models.CharField(db_column='memberPassword', max_length=300),
        ),
    ]
