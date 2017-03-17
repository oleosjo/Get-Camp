import DS from 'ember-data';

export default DS.Model.extend({
  campsiteDetail: DS.belongsTo('campsite-detail'),

  loop: DS.attr('string'),
  maxeqplen: DS.attr('string'),
  maxpeople: DS.attr('string'),
  site: DS.attr('string'),
  siteId: DS.attr('string'),
  siteReserveType: DS.attr('string'),
  siteType: DS.attr('string'),
  mapx: DS.attr('string'),
  mapy: DS.attr('string'),
  sitePhoto: DS.attr('string'),
  sitesWithAmps: DS.attr('string'),
  sitesWithPetsAllowed: DS.attr('string'),
  sitesWithSewerHookup: DS.attr('string'),
  sitesWithWaterHookup: DS.attr('string'),
  sitesWithWaterfront: DS.attr('string'),

  isElectric: Ember.computed('sitesWithAmps', function() {
    return this.get('sitesWithAmps') !== '';
  }),

  photoLarge: Ember.computed('sitePhoto', function() {
    return this.get('sitePhoto').replace('180x120.jpg', '540x360.jpg');
  }),

});
