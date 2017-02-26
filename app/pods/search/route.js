import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('campground', { xml: 'true', pname: params.query});
  }
});
