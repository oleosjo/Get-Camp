import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  namespace: 'api',

  pathForType: function(type) {
    switch (type) {
      case 'campground':
        return 'campgroundSearch.do';
      case 'campground-detail':
        return 'campgroundDetails.do';
      case 'campsite':
        return 'campsiteSearch.do';
    }
  },

  ajaxOptions(url, type, options) {
     let hash = DS.RESTAdapter.prototype.ajaxOptions.call(this, url, 'GET', options);
     hash.type = 'GET';
     hash.dataType = 'xml';
     return hash;
   }

});
