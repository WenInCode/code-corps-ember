import Ember from 'ember';
import MentionFetcherMixin from 'code-corps-ember/mixins/mention-fetcher';
import { module, test } from 'qunit';

module('Unit | Mixin | mention fetcher');

// Replace this with your real tests.
test('it works', function(assert) {
  let MentionFetcherObject = Ember.Object.extend(MentionFetcherMixin);
  let subject = MentionFetcherObject.create();
  assert.ok(subject);
});
