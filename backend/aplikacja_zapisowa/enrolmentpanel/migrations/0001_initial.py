# Generated by Django 2.1 on 2019-04-20 14:58

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.files.storage
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('is_participant', models.BooleanField(default=False)),
                ('is_organiser', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('name', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=120)),
                ('place', models.TextField(default=None, null=True)),
                ('accommodation', models.TextField(default=None, null=True)),
                ('image', models.ImageField(default=None, null=True, storage=django.core.files.storage.FileSystemStorage(location='/app/enrolmentpanel/static/images'), upload_to='')),
                ('beginning_date', models.DateField()),
                ('ending_date', models.DateField()),
                ('is_active', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('max_capacity', models.PositiveSmallIntegerField(default=0)),
                ('cur_capacity', models.PositiveSmallIntegerField(default=0)),
                ('vacancies', models.PositiveSmallIntegerField(default=0)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='enrolmentpanel.Event')),
            ],
        ),
        migrations.CreateModel(
            name='Organiser',
            fields=[
                ('faculty', models.PositiveSmallIntegerField()),
                ('name', models.CharField(max_length=30)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='organiser', serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='participant', serialize=False, to=settings.AUTH_USER_MODEL)),
                ('name', models.CharField(max_length=30)),
                ('index', models.CharField(max_length=30)),
                ('faculty', models.PositiveSmallIntegerField()),
                ('sex', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
                ('status', models.CharField(choices=[('N', 'Not registered'), ('S', 'Solo registered'), ('G', 'Group registered')], default='N', max_length=1)),
                ('email', models.EmailField(default=None, max_length=254)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='enrolmentpanel.Event')),
                ('room', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='enrolmentpanel.Room')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
        migrations.AlterUniqueTogether(
            name='room',
            unique_together={('event', 'number')},
        ),
        migrations.AddField(
            model_name='event',
            name='organizer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='enrolmentpanel.Organiser'),
        ),
        migrations.AlterUniqueTogether(
            name='student',
            unique_together={('index', 'event')},
        ),
    ]
