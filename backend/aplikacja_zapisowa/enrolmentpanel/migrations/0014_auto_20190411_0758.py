# Generated by Django 2.1 on 2019-04-11 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enrolmentpanel', '0013_organiser_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='status',
            field=models.CharField(choices=[('N', 'Not registered'), ('S', 'Solo registered'), ('G', 'Group registered')], default='N', max_length=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='student',
            name='sex',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female')], default='N', max_length=1),
        ),
    ]