import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: '_facilityID',
  
  normalizeResponse(store, primaryModelClass, xmlpayload, id, requestType) {
    let x2js = new X2JS();
    let jsonpayload = x2js.xml2json( xmlpayload );
    let normalizedPayload = {};

    normalizedPayload[primaryModelClass.modelName] = jsonpayload.detailDescription;

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  }
});
