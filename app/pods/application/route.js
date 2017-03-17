import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
      sendSearch() {
        this.transitionTo('search', this.get('controller.searchQuery'));
      }
    }
});
