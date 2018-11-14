from rest_framework import permissions


class IsOrganiserAccount(permissions.BasePermission):

    def has_permission(self, request, view):

        return request.user.is_organiser