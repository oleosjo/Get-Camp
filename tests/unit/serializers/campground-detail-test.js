import { moduleForModel, test } from 'ember-qunit';

moduleForModel('campground-detail', 'Unit | Serializer | campground detail', {
  // Specify the other units that are required for this test.
  needs: ['serializer:campground-detail']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
