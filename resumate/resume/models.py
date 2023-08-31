from django.db import models

class ResumeData(models.Model):
    uuid = models.CharField(max_length=100, null=False)
    data = models.JSONField()