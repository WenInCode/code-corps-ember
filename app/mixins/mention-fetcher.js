import Ember from 'ember';

export default Ember.Mixin.create({

  /**
    A service that is used for fetching mentions within a body of text.

    @property mentionFetcher
    @type Ember.Service
  */
  mentionFetcher: Ember.inject.service(),

  /**
    Queries the store for body of text with mentions.

    @method _fetchMentions
    @param {Object} post
    @private
  */
  _fetchMentions(comment) {
    this.get('mentionFetcher').fetchBodyWithMentions(comment, 'comment').then((body) => {
      this.set('commentBodyWithMentions', body);
    });
  },

  /**
    Parses the body of text and prefetches mentions.

    @method _prefetchMentions
    @param {Object} post
    @private
  */
  _prefetchMentions(comment) {
    let body = this.get('mentionFetcher').prefetchBodyWithMentions(comment, 'comment');
    this.set('commentBodyWithMentions', body);
  },
});
