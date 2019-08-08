
from .models import TodoTask
from django import forms
from django.core.exceptions import ValidationError


CHOICES = (
        ('progress', 'PROGRESS'),
        ('completed', 'COMPLETED'),
        ('pending', 'PENDING'),
    )

class TodoTaskForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Title',"maxlength":"20" ,'pattern':'[A-Za-z ]+', 'title':'Enter Characters Only '}))
    description = forms.CharField(required=True,widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Description',"maxlength":"150"}))
    dateandtime = forms.DateField(widget=forms.DateInput(attrs={'class':'form-control datepicker'}))
    # dateandtime = forms.DateTimeField(required=True,widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Select Date',"maxlength":"150"}))
    status = forms.ChoiceField(required=True,choices=CHOICES, initial='3',widget=forms.Select(attrs={'class': 'form-control'}))


    class Meta:
        model = TodoTask
        fields = ['title','description','dateandtime','status']



