import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  lat: 35.9875688,
  lng: -78.52631939999999,
  zoom: 8,

  campgrounds: [],

  didInsertElement() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        this.setProperties({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }

    this.get('store').query('campground', {landmarkName:true, landmarkLat:this.get('lat'), landmarkLong:this.get('lng') }).then((campgrounds) => {
        this.set('campgrounds', campgrounds);
    });
  },

  actions: {
    updateCenter(e) {
      let center = e.target.getCenter();
      this.set('lat', center.lat);
      this.set('lng', center.lng);
    }
  }
});
