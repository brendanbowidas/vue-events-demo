//LOCATION COMPONENT

Vue.component('location', {
  template: '#location',
  data: function(){
    return {
      selected: null,
      locations: []
    };
  },
created: function() {
    console.log('created');
  this.fetchLocations();
  if(this.$root.reservation.date){
      console.log('date');
    this.$dispatch('set-date', null);
  }

},
  methods: {
    setLocation: function() {
      this.$dispatch('set-location', this.selected);
    },
    fetchLocations() {
            this.$http.get('http://homestead.app/api/product').then(function(response){
                this.locations = response.data;

            });
      }
  }
});






// DATE COMPONENT

Vue.component('date', {
    template: '#date',
    data: function() {
        return {
            selected: null,
            dates: []
        }
    },

    created: function() {
      this.fetchDates();

    },

    methods: {
        fetchDates: function() {
            this.$http.get('http://homestead.app/api/product/' + this.$root.reservation.location_id + '?include=retailers').then(function(response){

               this.dates = response.data[0].retailers;
            });
        },
        setDate: function() {
            this.$dispatch('set-date', this.selected);
        }
    }
});








// TIMESLOTS COMPONENT
Vue.component('timeslots', {
    template: '#timeslots',
    data: function(){
        return {
            selected: null,
            timeslots: []
        }
    },
    created: function() {
     this.fetchTimeslots();
    },
    methods: {
        fetchTimeslots: function() {
            this.$http.get('http://homestead.app/api/product/' + this.$root.reservation.location_id + '?include=cleaning_tips').then(function(response){
               this.timeslots = response.data[0].cleaning_tips;
            });
        },
        setTime: function() {
            this.$dispatch('set-timeslot', this.selected);
        }
    }
})









// APP COMPONENT
var app = new Vue({
    el: 'body',
    data: function() {
        return {
            reservation: {},
            step: 1
        };
    },
    events: {
        'set-location': function(location) {
            this.validate(location, function(location) {
                app.$set('reservation.location_id', location);
            });

        },
        'set-date': function(date) {
            this.validate(date, function(date) {
                app.$set('reservation.date', date);
            });


        },
        'set-timeslot': function(time) {
            this.validate(time, function(time) {
                app.$set('reservation.timeslot', time);
            });
        }
    },
    methods: {
        validate: function(item, callback) {
            if(item === null) return false;
            callback(item);
            this.step++;
        },

        back: function() {
            if(this.step > 1){
                this.step--;
            }

        }
    }
});
