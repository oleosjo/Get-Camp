import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, xmlpayload, id, requestType) {
    let x2js = new X2JS();
    let jsonpayload = x2js.xml2json( xmlpayload );
    let normalizedPayload = {};

    let results = jsonpayload.resultset.result;
    let resultset = jsonpayload.resultset;
    delete resultset.result;

    for (var i = 0; i < results.length; i++) {
      Object.assign(results[i], resultset);
    }

    if (results) {
      if (!Array.isArray(results)) {
        results = [results];
      }

      normalizedPayload[primaryModelClass.modelName] = results;

    } else {
      normalizedPayload[primaryModelClass.modelName] = [];
    }

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  }
});
