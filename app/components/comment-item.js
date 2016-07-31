import Ember from 'ember';
import PostEditMixin from 'code-corps-ember/mixins/post-edit';

export default Ember.Component.extend(PostEditMixin, {
  classNames: ['comment-item', 'timeline-comment-wrapper'],
  classNameBindings: ['isEditing:editing'],

  mentionFetcher: Ember.inject.service(),

  authorId: Ember.computed.alias('comment.user.id'),

  init() {
    this.set('isEditing', false);
    this._prefetchMentions(this.get('comment'));
    return this._super(...arguments);
  },

  actions: {
    edit() {
      this.set('isEditing', true);
    },

    save() {
      let component = this;
      let comment = this.get('comment');
      comment.save().then((comment) => {
        component.set('isEditing', false);
        this._fetchMentions(comment);
      });
    },
  },

  _fetchMentions(comment) {
    this.get('mentionFetcher').fetchBodyWithMentions(comment, 'comment').then((body) => {
      this.set('commentBodyWithMentions', body);
    });
  },

  _prefetchMentions(comment) {
    let body = this.get('mentionFetcher').prefetchBodyWithMentions(comment, 'comment');
    this.set('commentBodyWithMentions', body);
  },
});
