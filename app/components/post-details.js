import Ember from 'ember';
import PostEditMixin from 'code-corps-ember/mixins/post-edit';

/**
  The post-details component composes a post object, it's author, info,
  and body.

  ## default usage

  ```handlebars
  {{post-details post=post}}
  ```

  @class post-details
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend(PostEditMixin, {
  classNames: ['post-details'],

  /**
    A service that is used for fetching mentions within a body of text.

    @property mentionFetcher
    @type Ember.Service
   */
  mentionFetcher: Ember.inject.service(),

  /**
    Returns the author's ID.

    @property authorId
    @type Number
   */
  authorId: Ember.computed.alias('post.user.id'),

  init() {
    this.set('isEditing', false);
    this._prefetchMentions(this.get('post'));
    return this._super(...arguments);
  },

  actions: {

    /**
      Action that sets the corresponding post to edit mode.

      @method editPostBody
     */
    edit() {
      this.set('isEditing', true);
    },

    /**
      Action that saves the corresponding post, turns off edit mode, and
      refetches the mentions.

      @method savePostBody
     */
    save() {
      const component = this;
      const post = this.get('post');

      post.save().then((post) => {
        component.set('isEditing', false);
        this._fetchMentions(post);
      });
    }
  },

  /**
    Queries the store for body of text with mentions.

    @method _fetchMentions
    @param {Object} post
    @private
   */
  _fetchMentions(post) {
    this.get('mentionFetcher').fetchBodyWithMentions(post, 'post').then((body) => {
      this.set('postBodyWithMentions', body);
    });
  },

  /**
    Parses the body of text and prefetches mentions.

    @method _prefetchMentions
    @param {Object} post
    @private
   */
  _prefetchMentions(post) {
    const body = this.get('mentionFetcher').prefetchBodyWithMentions(post, 'post');

    this.set('postBodyWithMentions', body);
  },
});
