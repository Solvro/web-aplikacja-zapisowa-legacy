from rest_framework import permissions


class IsStudentAccount(permissions.BasePermission):

    def has_permission(self, request, view):

        return request.user.is_participant