# Generated by Django 2.1 on 2018-10-16 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enrolmentpanel', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='cur_capacity',
            field=models.PositiveSmallIntegerField(default=0),
        ),
    ]