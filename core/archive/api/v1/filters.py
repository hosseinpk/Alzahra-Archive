import django_filters
from archive.models import Archive


class CustomFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name="category", lookup_expr="iexact")
    project = django_filters.CharFilter(field_name="project", lookup_expr="iexact")

    class Meta:
        model = Archive
        fields = ["category", "project"]
