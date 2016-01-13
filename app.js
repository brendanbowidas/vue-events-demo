//LOCATION COMPONENT

Vue.component('location', {
  template: '#location',
  data: function(){
    return {
      selected: '',
      locations: []
    };
  },
created: function() {
  this.fetchLocations();
},
  methods: {
    sendMsg: function() {
      this.$dispatch('child-msg', this.selected);
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
            selected: '',
            dates: []
        }
    },
    created: function() {
      this.fetchDates();
    },
    methods: {
        fetchDates: function() {
            this.$http.get('http://homestead.app/api/product/' + app.reservation.location_id + '?include=retailers').then(function(response){

               this.dates = response.data[0].retailers;
                console.log(this.dates);
            });
        },
        setDate: function() {
            this.$dispatch('set-date', this.selected);
        }
    }
});


var app = new Vue({
    el: 'body',
    data: function() {
        return {
            reservation: {},
            step: 1
        };
    },
    events: {
        'child-msg': function(msg) {
            app.$set('reservation.location_id', msg);
            this.step++;
        },
        'set-date': function(date) {
            app.$set('reservation.date', date);
            this.step++;
        }
    }
});
