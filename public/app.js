// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(feathers.authentication());

const entries = app.service('entries');

const app2 = new Vue({
  el: '#app-2',
  data: {
    entries: [],
    total: 0,
    term: '',
    newOnly: 'All',
    hd: 'All',
    limit: 20,
    sort: 1,
    page:1
  },
  created() {
    entries.find().then(json => {
      this.entries = json.data;
      this.total = json.total;
    });
  },
  filters: {
    moment: function(date) {
      return moment(date).format('MMMM Do YYYY, HH:mm:ss');
    }
  },
  methods: {
    save: function(event, entry) {
      // `this` inside methods points to the Vue instance
      let savedEntry = {
        kodi_type: entry.kodi_type,
        kodi_disp_title: entry.kodi_disp_title,
        kodi_year: entry.kodi_year,
        kodi_series: entry.kodi_series,
        kodi_episode: entry.kodi_episode
      };
      entries.patch(entry._id, savedEntry);
    },
    search: function() {
      let query = {
        $limit: this.limit
      };
      if (!(this.term.length === 0 || !this.term.trim())) {
        query.disp_title = {
          $search: this.term
        };
      }
      if (this.newOnly === 'New') {
        query.kodi_type = {
          $nin: ['TV', 'Film', 'Dup']
        };
      }
      if (this.newOnly === 'Done') {
        query.kodi_type = {
          $in: ['TV', 'Film', 'Dup']
        };
      }
      if (this.hd === 'HD') {
        query.channelname = {
          $search: "HD"
        };
      }      let sort = {
        disp_title: 1,
        start: 1
      };
      if (this.sort == '2' )
      {
        sort = {
          kodi_disp_title: 1,
          kodi_series: 1,
          kodi_episode: 1,
          disp_title: 1,
          start: 1
        };
      }
      if (this.sort == '3' )
      {
        sort = {
          disp_title: 1,
          disp_subtitle: 1,
          start: 1
        };
      }
      console.log(sort);
      query.$sort = sort;
      query.$skip=this.limit * (this.page - 1);
      entries.find({query}).then(json => {
        this.entries = json.data;
        this.total = json.total;
      });
    }
  }
});
