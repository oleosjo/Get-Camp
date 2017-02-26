import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('campground-detail', { xml: 'true', contractCode: params.contractcode, parkId: params.facilityid  });
  }
});
