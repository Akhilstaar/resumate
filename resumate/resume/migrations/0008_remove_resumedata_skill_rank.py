# Generated by Django 4.2.4 on 2023-09-01 22:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0007_alter_resumedata_skill_rank'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='resumedata',
            name='skill_rank',
        ),
    ]