{% for entry in entries %}
mkdir -p "{{tv_folder}}{{entry.kodi_disp_title}} {{entry.kodi_year}}"
cd "{{tv_folder}}{{entry.kodi_disp_title}} {{entry.kodi_year}}"
ln -s "{{entry.filename}}" "{{entry.kodi_disp_title}} S{{entry.kodi_series|pad(2,0)}}E{{entry.kodi_episode|pad(2,0)}}{{entry.filename|extension}}"
{% endfor %}
