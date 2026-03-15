from rest_framework import serializers
from .models import TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    """
    Serializes TeamMember for both public website and admin panel.

    Read-only computed fields:
    - is_linked_user: tells frontend if this member has a login account
    - user_email:     shows which account is linked (admin panel only)
    """

    # True if this team member has a linked login account
    is_linked_user = serializers.SerializerMethodField()

    # Email of the linked account — useful in admin panel
    # Shows null for standalone members
    user_email = serializers.SerializerMethodField()

    class Meta:
        model  = TeamMember
        fields = [
            'id',
            'user',            # FK id — writable, optional
            'user_email',      # read-only computed
            'is_linked_user',  # read-only computed
            'name',
            'role',
            'department',
            'photo',
            'bio',
            'status',
            'display_order',
            'social_links',
            'joined',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at',
                            'user_email', 'is_linked_user']

    def get_is_linked_user(self, obj):
        """Returns True if this member has a linked login account."""
        return obj.user_id is not None

    def get_user_email(self, obj):
        """Returns linked account email, or None for standalone members."""
        if obj.user:
            return obj.user.email
        return None


class TeamMemberPublicSerializer(serializers.ModelSerializer):
    """
    Minimal serializer for the PUBLIC website team page.
    Strips out admin-only fields like user, user_email, created_at.
    """

    class Meta:
        model  = TeamMember
        fields = [
            'id',
            'name',
            'role',
            'department',
            'photo',
            'bio',
            'social_links',
            'joined',
            'display_order',
        ]