from django.contrib import admin
from .models import CustomUser
from import_export.admin import ImportExportModelAdmin
from .resources import CustomUserResource
from django.contrib.admin import RelatedFieldListFilter


class CustomRelatedFieldListFilter(RelatedFieldListFilter):
    def field_choices(self, field, request, model_admin):
        return field.get_choices(include_blank=False)


class CustomUserAdmin(ImportExportModelAdmin):
    resource_class = CustomUserResource
    list_display = ('username', 'email', 'user_id', 'roll_no', 'branch',
                    'get_registered_events', 'get_registered_teams', 'prody_points')  # Added prody_points
    ordering = ("-prody_points",) # Added ordering

    list_filter = [('registered_events', CustomRelatedFieldListFilter),
                   ('registered_teams', CustomRelatedFieldListFilter)]
    search_fields = ['name', 'registered_events__name',
                     'registered_teams__name', 'roll_no', 'branch']

    def get_registered_events(self, obj):
        return ", ".join([event.name for event in obj.registered_events.all()])

    get_registered_events.short_description = 'Registered Events'

    def get_registered_teams(self, obj):
        return ", ".join([team.name for team in obj.registered_teams.all()])

    get_registered_teams.short_description = 'Registered Teams'

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return []
        return ['registered_teams', 'registered_events']

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)

        # Changed ..
        if change:
            initial_events = set(form.initial.get('registered_events', []))
            initial_teams = set(form.initial.get('registered_teams', []))

            updated_registered_events = set(form.instance.registered_events.all())
            removed_events = initial_events - updated_registered_events
            added_events = updated_registered_events - initial_events

            for event in removed_events:
                event.registered_users.remove(form.instance)

            for event in added_events:
                event.registered_users.add(form.instance)

            updated_registered_teams = set(form.instance.registered_teams.all())
            removed_teams = initial_teams - updated_registered_teams
            added_teams = updated_registered_teams - initial_teams

            for team in removed_teams:
                team.registered_users.remove(form.instance)

            for team in added_teams:
                team.registered_users.add(form.instance)

        fieldsets = (
            (None, {'fields': ('username', 'email', 'password')}),
            ('Personal info', {'fields': ('user_id', 'roll_no', 'branch', 'prody_points')}),  # Added prody_points
            ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
            ('Important dates', {'fields': ('last_login', 'date_joined')}),
        )


admin.site.register(CustomUser, CustomUserAdmin)
