from django.contrib import admin
from django.contrib.admin import DateFieldListFilter
from django.http import HttpResponse
import csv
# Register your models here.

from .models import TodoTask

#This class is to Write Data to Csv
class ExportCsvMixin:
    def export_as_csv(self, request, queryset):

        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected"


#This class is used to Add Display data in list format,  Search and filters and one external ExportCSVMixin to Export data in CSV format
class TodoTaskAdmin(admin.ModelAdmin,ExportCsvMixin):
    list_display = ('title', 'description', 'dateandtime', 'created_at','updated_at','status','is_deleted')
    search_fields = ( 'title','description','dateandtime','status')
    list_filter = (
        ('dateandtime', DateFieldListFilter),
    )
    actions = ["export_as_csv"]

#This is to register models and filters to Admin Panel
admin.site.register(TodoTask,TodoTaskAdmin)
