from django.db import models

# Create your models here.


#  Title
#  Description
#  Date & time of the To-do task.
#  Status (In progress, completed, pending)
#  Created at & Modified at
#  is deleted

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
