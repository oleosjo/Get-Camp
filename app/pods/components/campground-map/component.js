import Ember from 'ember';

export default Ember.Component.extend({
  campgroundMap: Ember.inject.service(),

  lat: 45.519743,
  lng: -122.680522,
  zoom: 10,

  didInsertElement() {
    let contractCode = this.get('contractCode');
    let parkId = this.get('parkId');

    var map = L.map('parkmap', {
      crs: L.CRS.Simple
  });

    // map.createPane('bg');
    // var mymap = L.map('parkmap').setView([1, 1], 1);

    this.get('campgroundMap').getMap(contractCode, parkId).then((data) => {
      Array.from(data).forEach((svg) => {

        let tmp = document.createElement('div');
        tmp.appendChild(svg);
        var bounds = [[0,0], [1000,1000]];

        var image = L.imageOverlay('data:image/svg+xml;'+btoa(tmp.innerHTML), bounds).addTo(map);
        map.fitBounds(bounds);
      });
    });
  }
});
