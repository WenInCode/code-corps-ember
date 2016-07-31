import Ember from 'ember';

const {
  computed,
  get,
  inject: {
    service,
  },
  isEqual,
  Mixin,
  set,
} = Ember;

export default Mixin.create({

  /**
    Returns the author's ID

    @property authorId,
    @type Number
    @default null
   */
  authorId: null,

  /**
    Returns whether or not the current user can edit the current post.

    @property canEdit
    @type Boolean
  */
  canEdit: computed.alias('currentUserIsAuthor'),

  /**
    @property currentUser
    @type Ember.Service
  */
  currentUser: service(),

  /**
    Returns the current user's ID

    @property currentUserId
    @type Number
  */
  currentUserId: computed.alias('currentUser.user.id'),

  /**
    Consumes `currentUserId` and `authorId` and returns if the current user
    is the author.

    @property currentUserIsAuthor
    @type Boolean
  */
  currentUserIsAuthor: computed('authorId', 'currentUserId', function() {
    const userId = parseInt(get(this, 'currentUserId'), 10);
    const authorId = parseInt(get(this, 'authorId'), 10);

    return isEqual(userId, authorId);
  }),

  actions: {
    /**
      Action that sets the `isEditing` property to `false`

      @method cancel
     */
    cancel() {
      set(this, 'isEditing', false);
    },
  },
});
