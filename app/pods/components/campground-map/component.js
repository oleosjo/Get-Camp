import Ember from 'ember';

export default Ember.Component.extend({
  campgroundMap: Ember.inject.service(),

  selectedSite: '',

  didInsertElement() {
    let contractCode = this.get('contractCode');
    let parkId = this.get('parkId');

    Ember.$('#parkmap').css('height', document.body.clientHeight);

    var map = L.map('parkmap', {
        crs: L.CRS.Simple
    });

    var bounds = [[0,0], [1000,1000]];
    var bg = L.imageOverlay(`/map/background/${contractCode}/${parkId}`, bounds).addTo(map);
    // var ic = L.imageOverlay(`/map/icons/${contractCode}/${parkId}`, bounds).addTo(map);
    map.fitBounds(bounds);

    let campsites = this.get('campsites');
    // 
    // var info = L.control();
    //
    //   info.onAdd = function (map) {
    //       this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    //       this.update();
    //       return this._div;
    //   };
    //
    //   // method that we will use to update the control based on feature properties passed
    //   info.update = function (props) {
    //       this._div.innerHTML = props;
    //   };
    //
    //   info.addTo(map);

    campsites.forEach((campsite) => {
      L.circle([-campsite.get('_mapy') + 1000, campsite.get('_mapx')], {radius: 2})
      .addTo(map)
      .on('click', (e) => {
        this.set('selectedSite', campsite);
        //info.update(`<h4>${campsite.get('_Site')}</h4><br><img src="http://reserveamerica.com${campsite.get('photoLarge')}">`)
      });
    });
  },

});
