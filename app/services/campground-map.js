import Ember from 'ember';

export default Ember.Service.extend({
  getMap(contractCode, parkId) {
    let extractionUrl = `http://localhost:4200/api/getSVGFragment.do?olAction=getCampgroundMap&contractCode=${contractCode}&parkId=${parkId}`;
    //let extractionUrlIcons = `http://localhost:4200/api/getSVGFragment.do?olAction=getIcons&contractCode=${contractCode}&parkId=${parkId}`;

    return new Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'GET',
        url: extractionUrl,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
         },
        success(data) {
          // Extract svg
          var el = document.createElement( 'div' );
          el.innerHTML = data;

          let svgEl = el.getElementsByTagName( 'svg' );
          resolve(svgEl);
        }
      });
    });



  }
});
