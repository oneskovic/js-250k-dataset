const moment = require('moment');


function parseRevision(line) {
  var revisionRegex = /^\w+/;
  return line.match(revisionRegex)[0];
}

/**
 * Parses the author name from blame data for a line of code.
 *
 * @param {string} line - the blame data for a particular line of code
 * @return {string} - the author name for that line of code.
 */
function parseAuthor(line) {
  var committerMatcher = /^author\s(.*)$/m;
  return line.match(committerMatcher)[1];
}

/**
 * Parses the committer name from blame data for a line of code.
 *
 * @param {string} line - the blame data for a particular line of code
 * @return {string} - the committer name for that line of code.
 */
function parseCommitter(line) {
  var committerMatcher = /^committer\s(.*)$/m;
  return line.match(committerMatcher)[1];
}

/**
 * Formats a date according to the user's preferred format string.
 * @param {object} date - a moment date object
 */
function formatDate(date) {
  var formatString = atom.config.get('git-blame.dateFormatString');
  return date.format(formatString);
}

/**
 * Parses the author date from blame data for a line of code.
 *
 * @param {string} line - the blame data for a particular line of code
 * @return {string} - human readable date string of the lines author date
 */
function parseAuthorDate(line) {
  var dateMatcher = /^author-time\s(.*)$/m;
  var dateStamp = line.match(dateMatcher)[1];
  return formatDate(moment.unix(dateStamp));
}

/**
 * Parses the commit date from blame data for a line of code.
 *
 * @param {string} line - the blame data for a particular line of code
 * @return {string} - human readable date string of the lines commit date
 */
function parseCommitterDate(line) {
  var dateMatcher = /^committer-time\s(.*)$/m;
  var dateStamp = line.match(dateMatcher)[1];
  return formatDate(moment.unix(dateStamp));
}

/**
 * Parses the summary line from the blame data for a line of code
 *
 * @param {string} line - the blame data for a particular line of code
 * @return {string} - the summary line for the last commit for a line of code
 */
function parseSummary(line) {
  var summaryMatcher = /^summary\s(.*)$/m;
  return line.match(summaryMatcher)[1];
}

/**
 * Parses the blame --porcelain output for a particular line of code into a
 * usable object with properties:
 *
 * commit: the commit revision
 * line: the line number (1 indexed)
 * committer: name of the committer of that line
 * date: the date of the commit
 * summary: the summary of the commit
 *
 * @param {string} blameData - the blame --porcelain output for a line of code
 * @param {number} index - the index that the data appeared in an array of line
 *    line data (0 indexed)
 * @return {object} - an object with properties described above
 */
function parseBlameLine(blameData, index) {
  return markIfNoCommit({
    hash: parseRevision(blameData),
    line: index + 1,
    author: parseAuthor(blameData),
    date: parseAuthorDate(blameData),
    committer: parseCommitter(blameData),
    committerDate: parseCommitterDate(blameData),
    summary: parseSummary(blameData)
  });
}

/**
 * Returns blameData object marked with property noCommit: true if this line
 * has not yet been committed.
 *
 * @param {object} parsedBlame - parsed blame info for a line
 */
function markIfNoCommit(parsedBlame) {
   if (/^0*$/.test(parsedBlame.hash)) {
     parsedBlame.noCommit = true;
   }
   return parsedBlame;
}

/**
 * Parses git-blame output into usable array of info objects.
 *
 * @param {string} blameOutput - output from 'git blame --porcelain <file>'
 */
function parseBlameOutput(blameOut) {
  // Matches new lines only when followed by a line with commit hash info that
  // are followed by autor line. This is the 1st and 2nd line of the blame
  // --porcelain output.
  var singleLineDataSplitRegex = /\n(?=\w+\s(?:\d+\s)+\d+\nauthor)/g;

  // Split the blame output into data for each line and parse out desired
  // data from each into an object.
  return blameOut.split(singleLineDataSplitRegex).map(parseBlameLine);
}

// EXPORTS
module.exports = {
  parseBlame: parseBlameOutput,
  formatDate: formatDate
};
