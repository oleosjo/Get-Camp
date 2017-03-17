import Ember from 'ember';

export default Ember.Component.extend({
  selectedSite: '',

  didInsertElement() {
    let contractCode = this.get('contractCode');
    let parkId = this.get('parkId');

    Ember.$('#parkmap').css('height', document.body.clientHeight);

    var map = L.map('parkmap', {
      crs: L.CRS.Simple
    });

    var bounds = [
      [0, 0],
      [1000, 1000]
    ];
    var bg = L.imageOverlay(`http://localhost:3000/map/background/${contractCode}/${parkId}`, bounds).addTo(map);
    map.fitBounds(bounds);

    this.set('map', map);
    this.get('campsiteFilter');
    this.drawSites();
  },

  filter: Ember.observer('campsiteFilter.{electric,nonElectric,closeToWater}', function() {
    this.drawSites();
  }),

  drawSites() {
    let campsites = this.get('campsites')
    .filter((site, index, enumerable) => {
      let electricMatch = this.get('campsiteFilter.electric') && site.get('isElectric');
      let nonElectricMatch = this.get('campsiteFilter.nonElectric') && !site.get('isElectric');
      // let closetoWaterMatch = this.get('campsiteFilter.closeToWater') && site.get('campsiteDetails.distanceToBodyOfWater') < 200;

      return (electricMatch || nonElectricMatch);
    });

    let map = this.get('map');

    if (map.hasLayer(this.get('circleLayer'))) {
       map.removeLayer(this.get('circleLayer'));
   }

    let squareLayer = new L.LayerGroup();
    let circleLayer = new L.LayerGroup();

    campsites.forEach((campsite) => {
      let y = -campsite.get('mapy') + 1000;
      let x = campsite.get('mapx');

      if (campsite.get('isElectric')) {
        let circle = L.circle([y, x], { radius: 2 })
                      .on('click', (e) => { this.set('selectedSite', campsite); });

        circleLayer.addLayer(circle)
      } else {
        let square = L.circle([y, x], { color: 'goldenrod', radius: 2})
                      .on('click', (e) => { this.set('selectedSite', campsite); });

        squareLayer.addLayer(square)
      }


      circleLayer.addTo(map);
    });

    L.control.layers(null, {"Electric": circleLayer, "Non-Electric": squareLayer}).addTo(map);

    // this.set('circleLayer', circleLayer);
  },

  actions: {
    showModal() {
      Ember.$('.ui.modal').modal('show');
      Ember.run.later(this, function() {
        window.dispatchEvent(new Event('resize'));
      }, 300);

    }
  }

});


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
