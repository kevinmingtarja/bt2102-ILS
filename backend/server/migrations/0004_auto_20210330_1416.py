# Generated by Django 3.0.5 on 2021-03-30 14:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_auto_20210330_1214'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loan',
            name='bookid',
            field=models.ForeignKey(db_column='_id', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='server.Book'),
        ),
    ]