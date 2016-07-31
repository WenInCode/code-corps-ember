import Ember from 'ember';
import PostEditMixin from 'code-corps-ember/mixins/post-edit';
import { module, test } from 'qunit';

module('Unit | Mixin | post edit');

// Replace this with your real tests.
test('it works', function(assert) {
  let PostEditObject = Ember.Object.extend(PostEditMixin);
  let subject = PostEditObject.create();
  assert.ok(subject);
});
