import Ember from 'ember';
import PostEditMixin from 'code-corps-ember/mixins/post-edit';

/**
  @class post-title
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend(PostEditMixin, {
  classNames: ['post-title'],
  classNameBindings: ['isEditing:editing'],

  /**
    Returns the post author's ID.

    @property postAuthorId
    @type Number
   */
  authorId: Ember.computed.alias('post.user.id'),

  init() {
    this._super(...arguments);
    this.setProperties({
      isEditing: false,
    });
  },

  actions: {

    /**
      Action that set the `isEditing` property to true and sets the `newTitle`
      property to the current title.

      @method edit
     */
    edit() {
      this.set('newTitle', this.get('post.title'));
      this.set('isEditing', true);
    },

    /**
      Action that sets the `title` property to the `newTitle` and calls save on
      the post. If the post successfully saves, the `isEditing` property is set
      to `false`.

      @method save
     */
    save() {
      let component = this;
      let post = this.get('post');
      let newTitle = this.get('newTitle');

      post.set('title', newTitle);
      post.save().then(() => {
        component.set('isEditing', false);
      });
    },
  },
});
