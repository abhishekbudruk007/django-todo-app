from django.shortcuts import render

# Create your views here.
from django.views import generic
from .models import TodoTask
from .forms import TodoTaskForm
from .serializers import TodoTaskSerializer
from django.urls import reverse_lazy ,reverse
from django.http import HttpResponseRedirect
from django_datatables_view.base_datatable_view import BaseDatatableView

# class Dashboard(generic.TemplateView):
#     template_name = 'assignment/myapp/index.html'


class Dashboard(generic.ListView):
    serializer_class = TodoTaskSerializer
    template_name = 'assignment/myapp/index.html'

    def get_queryset(self):
        qs = TodoTask.objects.filter(is_deleted=False)
        return qs


class UpdateToDoList(generic.UpdateView):
    form_class = TodoTaskForm
    model = TodoTask
    success_url = reverse_lazy('dashboard')
    template_name = 'assignment/myapp/updatetodolist.html'


    def form_valid(self, form):
        print("valid")
        todo_date=self.request.POST.get('update-todo-date')
        self.model = form.save(commit=False)
        self.model.membership_reminder_date=todo_date
        self.model.save()
        return super(UpdateToDoList, self).form_valid(form)

    def form_invalid(self, form):
        return self.render_to_response(
            self.get_context_data(form=form
                                  )
        )

class DeleteToDoList(generic.UpdateView):
    model = TodoTask
    fields = ['is_deleted']
    success_url = reverse_lazy('dashboard')
    template_name = 'assignment/myapp/deleteconfirmationtodolist.html'

    def form_valid(self, form):
        # This will make only deleted field to be changed when update modal form is submitted
        model = form.save(commit=False)
        model.is_deleted=True
        model.save()
        return HttpResponseRedirect(reverse('dashboard'))
