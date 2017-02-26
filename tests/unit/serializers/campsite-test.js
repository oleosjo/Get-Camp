import { moduleForModel, test } from 'ember-qunit';

moduleForModel('campsite', 'Unit | Serializer | campsite', {
  // Specify the other units that are required for this test.
  needs: ['serializer:campsite']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
