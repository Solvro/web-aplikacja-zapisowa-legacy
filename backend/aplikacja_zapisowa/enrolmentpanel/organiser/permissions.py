from rest_framework import permissions

from enrolmentpanel.models import Event, Organiser


class IsOrganiserAccount(permissions.BasePermission):

    def has_permission(self, request, view):

        return request.user.is_organiser


class IsEventOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.organiser == request.user.organiser