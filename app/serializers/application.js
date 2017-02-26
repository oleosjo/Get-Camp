import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, xmlpayload, id, requestType) {
    let x2js = new X2JS();
    let jsonpayload = x2js.xml2json( xmlpayload );
    let normalizedPayload = {};

    let results = jsonpayload.resultset.result;

    if (!Array.isArray(results)) {
      results = [results];
    }

    normalizedPayload[primaryModelClass.modelName] = results;

    console.log(normalizedPayload);

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  }
});
