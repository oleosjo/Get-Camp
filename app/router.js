import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sites', { path: '/sites/:contractcode/:facilityid' });
  this.route('detail', { path: '/detail/:contractcode/:facilityid' });
  this.route('search', { path: '/search/:query' });
});

export default Router;
