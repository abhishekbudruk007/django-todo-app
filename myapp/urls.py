from django.urls import path
from . import views
urlpatterns = [
    path('', views.Dashboard.as_view(), name="dashboard"),
    path('updatetodolist/<int:pk>/', views.UpdateToDoList.as_view(), name="updatetodolist"),
    path('deletetodolist/<int:pk>', views.DeleteToDoList.as_view(), name="deletetodolist"),
]
