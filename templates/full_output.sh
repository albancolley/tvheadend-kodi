
find '{{film_folder}}' -lname '{{src_folder}}*'  -delete
find '{{film_folder}}' -type d -empty -delete
find '{{tv_folder}}' -lname '{{src_folder}}*'  -delete
find '{{tv_folder}}' -type d -empty -delete
{% for entry in entries %}
{%if entry.kodi_type == 'TV' %}
mkdir -p "{{tv_folder}}{{entry.kodi_disp_title}} ({{entry.kodi_year}})"
cd "{{tv_folder}}{{entry.kodi_disp_title}} ({{entry.kodi_year}})"
ln -s "{{entry.filename}}" "{{entry.kodi_disp_title}} ({{entry.kodi_year}}) S{{entry.kodi_series|pad(2)}}E{{entry.kodi_episode|pad(2)}}{{entry.filename|extension}}"
{% endif %}
{%if entry.kodi_type == 'Film' %}
mkdir -p "{{film_folder}}{{entry.kodi_disp_title}} ({{entry.kodi_year}})"
cd "{{film_folder}}{{entry.kodi_disp_title}} ({{entry.kodi_year}})"
ln -s "{{entry.filename}}" "{{entry.kodi_disp_title}} ({{entry.kodi_year}}) ({{entry.kodi_year}}){{entry.filename|extension}}"
{% endif %}

{% endfor %}
