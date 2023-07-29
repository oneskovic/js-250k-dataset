var fortune = require('../lib/fortune');


fortune({

  db: '1337chan'

})

/*!
 * Define resources
 */
.resource('board', {

  name: String,
  threads: ['post'] // "has many" relationship to "post"

})

.resource('post', {

  name: String,
  image: String,
  body: String,
  timestamp: Date,
  board: 'board', // "belongs to" relationship to "board"
  replies: [{ref: 'post', inverse: 'replyTo'}],
  replyTo: {ref: 'post', inverse: 'replies'}

}).transform(

  // before storing in database
  function() {
    // TODO: "bump" feature
    this.timestamp = new Date();
    return this;
  },

  // after retrieving from database
  function() {
    this.timestamp = this.timestamp instanceof Date ?
      this.timestamp.getTime() : null;
    return this;
  }

)

/*!
 * Start the API
 */
.listen(process.argv[2] || 1337);
