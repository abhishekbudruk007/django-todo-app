from django.db import models

# Create your models here.
CHOICES = (
        ('progress', 'PROGRESS'),
        ('completed', 'COMPLETED'),
        ('pending', 'PENDING'),
    )


class TodoTask(models.Model):
    title = models.CharField(max_length=50,null=True,blank=True)
    description = models.CharField(max_length=150,null=True,blank=True)
    dateandtime = models.DateTimeField(max_length=150,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20,choices=CHOICES,blank=True)
    is_deleted = models.BooleanField(default=False)
