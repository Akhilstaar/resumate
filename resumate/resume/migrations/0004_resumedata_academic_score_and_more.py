# Generated by Django 4.2.4 on 2023-08-31 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0003_useraccount'),
    ]

    operations = [
        migrations.AddField(
            model_name='resumedata',
            name='academic_score',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='resumedata',
            name='completeness_score',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='resumedata',
            name='overall_score',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='resumedata',
            name='skill_score',
            field=models.IntegerField(default=0),
        ),
    ]
