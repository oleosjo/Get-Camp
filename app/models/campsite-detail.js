import DS from 'ember-data';

export default DS.Model.extend({
  campsite: DS.belongsTo('campsite'),

  photoUrls: DS.attr(),
  siteReserveType: DS.attr('string'),
  checkinTime: DS.attr('string'),
  checkoutTime: DS.attr('string'),
  typeOfUse: DS.attr('string'),
  minNumOfPeople: DS.attr('string'),
  maxNumOfPeople: DS.attr('string'),
  petsAllowed: DS.attr('string'),
  maxNumOfVehicles: DS.attr('string'),
  shade: DS.attr('string'),
  tentPadLength: DS.attr('string'),
  tentPadWidth: DS.attr('string'),
  firePit: DS.attr('string'),
  grills: DS.attr('string'),
  lookingForCategory: DS.attr('string'),
  picnicTable: DS.attr('string'),
  quietArea: DS.attr('string'),
  distanceFromParkingLotToSite: DS.attr('string'),
  distanceToShower: DS.attr('string'),
  parkingLotSurface: DS.attr('string'),
  proximityToBodyOfWater: DS.attr('string'),
  siteAccess: DS.attr('string'),
  tentOnly: DS.attr('string'),

  photoUrlsLarge: Ember.computed('photoUrls', function() {
    if (this.get('photoUrls')) {
    return this.get('photoUrls').map((url) => {
      return 'http://www.reserveamerica.com' + url.replace('180x120.jpg', '540x360.jpg');
    });
  }
  }),
});
