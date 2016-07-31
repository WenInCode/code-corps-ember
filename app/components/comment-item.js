import Ember from 'ember';
import MentionFetcherMixin from 'code-corps-ember/mixins/mention-fetcher';

export default Ember.Component.extend(MentionFetcherMixin, {
  classNames: ['comment-item', 'timeline-comment-wrapper'],
  classNameBindings: ['isEditing:editing'],

  currentUser: Ember.inject.service(),

  canEdit: Ember.computed.alias('currentUserIsCommentAuthor'),
  commentAuthorId: Ember.computed.alias('comment.user.id'),
  currentUserId: Ember.computed.alias('currentUser.user.id'),
  currentUserIsCommentAuthor: Ember.computed('currentUserId', 'commentAuthorId', function() {
    let userId = parseInt(this.get('currentUserId'), 10);
    let authorId = parseInt(this.get('commentAuthorId'), 10);
    return userId === authorId;
  }),

  init() {
    this.set('isEditing', false);
    this._prefetchMentions(this.get('comment'));
    return this._super(...arguments);
  },

  actions: {
    cancel() {
      this.set('isEditing', false);
    },

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
});
