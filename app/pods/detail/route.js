import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let store = this.store;
    return Ember.RSVP.hash({
      campsites: store.query('campsite', {contractCode: params.contractcode, parkId: params.facilityid  }),
      details: store.queryRecord('campground-detail', {contractCode: params.contractcode, parkId: params.facilityid  })
    });
  }
});
