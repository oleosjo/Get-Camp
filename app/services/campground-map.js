import Ember from 'ember';

export default Ember.Service.extend({
  getMap(contractCode, parkId) {
    let extURLs =
    [`http://localhost:4200/map/background/${contractCode}/${parkId}`,
     `http://localhost:4200/map/icons/${contractCode}/${parkId}`];

    let promises = [];

    for (var i = 0, len = extURLs.length; i < len; i++) {
      promises.push(new Promise(function(resolve, reject) {
        Ember.$.ajax({
          type: 'GET',
          url: extURLs[i],
          crossDomain: true,
          xhrFields: { withCredentials: true },
          success(data) {
            // Extract svg
            var el = document.createElement( 'div' );
            el.innerHTML = data;

            let svgEl = el.getElementsByTagName( 'svg' );
            resolve(svgEl);
          }
        });
      }));
    }

    return Promise.all(promises);

  }
});
