import django_filters
from final_output.models import Output


class CustomFilter(django_filters.FilterSet):
    released_year = django_filters.CharFilter(field_name="released_year", lookup_expr="iexact")

    class Meta:
        model = Output
        fields = ["released_year"]
