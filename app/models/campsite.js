import DS from 'ember-data';

export default DS.Model.extend({
  _Loop: DS.attr('string'),
  _Maxeqplen: DS.attr('string'),
  _Maxpeople: DS.attr('string'),
  _Site: DS.attr('string'),
  _SiteId: DS.attr('string'),
  _SiteReserveType: DS.attr('string'),
  _SiteType: DS.attr('string'),
  _mapx: DS.attr('string'),
  _mapy: DS.attr('string'),
  _sitePhoto: DS.attr('string'),
  _sitesWithAmps: DS.attr('string'),
  _sitesWithPetsAllowed: DS.attr('string'),
  _sitesWithSewerHookup: DS.attr('string'),
  _sitesWithWaterHookup: DS.attr('string'),
  _sitesWithWaterfront: DS.attr('string'),

});
