# Generated by Django 3.0.5 on 2021-03-30 11:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Adminuser',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('adminpassword', models.CharField(db_column='adminPassword', max_length=30)),
            ],
            options={
                'db_table': 'adminuser',
            },
        ),
        migrations.CreateModel(
            name='Book_Instance',
            fields=[
                ('_id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('isbn', models.CharField(max_length=50)),
                ('pageCount', models.IntegerField()),
                ('publishedDate', models.CharField(blank=True, max_length=100)),
                ('thumbnailUrl', models.CharField(max_length=200)),
                ('shortDescription', models.CharField(blank=True, max_length=500)),
                ('longDescription', models.CharField(blank=True, max_length=2000)),
                ('status', models.CharField(choices=[('PUBLISH', 'PUBLISH'), ('MEAP', 'MEAP')], max_length=10)),
                ('authors', models.CharField(max_length=100)),
                ('categories', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Memberuser',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('username', models.CharField(db_column='username', max_length=50)),
                ('memberpassword', models.CharField(db_column='memberPassword', max_length=30)),
            ],
            options={
                'db_table': 'memberuser',
            },
        ),
    ]