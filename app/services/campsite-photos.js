import Ember from 'ember';

export default Ember.Service.extend({
  getPhotos(contractCode, parkId, siteId) {
    return new Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'GET',
        url: `http://localhost:4200/campsitephotos/${contractCode}/${parkId}/${siteId}`,
        success(data) {
          resolve(data);
        }
      });
    });
  }
});
