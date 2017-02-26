import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('campsite', { xml: 'true', contractCode: params.contractcode, parkId: params.facilityid  });
  }
});
