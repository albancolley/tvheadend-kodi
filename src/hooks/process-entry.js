// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    let data = context.data;
    let newData =
    {
      _id : data._id,
      kodi_type: data.kodi_type,
      kodi_disp_title:data.kodi_disp_title,
      kodi_year: data.kodi_year,
      kodi_series: data.kodi_series,
      kodi_episode: data.kodi_episode,
      kodi_updated_at:new Date()
    };
    context.data = newData;
    return context;
  };
};
