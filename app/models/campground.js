import DS from 'ember-data';

export default DS.Model.extend({
  _facilityName: DS.attr('string'),
  name: Ember.computed('_facilityName', function() {
    return this.get('_facilityName').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }),

  _agencyIcon: DS.attr('string'),
  _agencyName: DS.attr('string'),
  _availabilityStatus: DS.attr('string'),
  _contractID: DS.attr('string'),
  _contractType: DS.attr('string'),
  _facilityID: DS.attr('string'),

  _faciltyPhoto: DS.attr('string'),
  photoLarge: Ember.computed('_faciltyPhoto', function() {
    return this.get('_faciltyPhoto').replace('80x53.jpg', '540x360.jpg');
  }),
  photoSmall: Ember.computed('_faciltyPhoto', function() {
    return this.get('_faciltyPhoto');
  }),

  _favorite: DS.attr('string'),
  _latitude: DS.attr('string'),
  _listingOnly: DS.attr('string'),
  _longitude: DS.attr('string'),
  _regionName: DS.attr('string'),
  _reservationChannel: DS.attr('string'),
  _shortName: DS.attr('string'),
  _sitesWithAmps: DS.attr('string'),
  _sitesWithPetsAllowed: DS.attr('string'),
  _sitesWithSewerHookup: DS.attr('string'),
  _sitesWithWaterHookup: DS.attr('string'),
  _sitesWithWaterfront: DS.attr('string'),
  _state: DS.attr('string'),

});
