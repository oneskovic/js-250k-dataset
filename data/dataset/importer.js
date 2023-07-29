var fs = require('fs')
var crypto = require('crypto')


// FOR NOW SET STORE VIA EXPORTS FIXME

exports.google_reader_starred = function(file) {
	var items = JSON.parse(fs.readFileSync(file) ).items

	console.log('Importing',items.length,'articles from google reader')

	// items successfully imported
	var count = 0

	for (var i in items) {
		var item    = items[i]
		var article = {}

		article.pubdate      = (new Date(item.published*1000)).toString()
		article.title        = item.title
		article.author       = item.author
		article.source       = {
			title : item.origin.title,
			link  : item.origin.htmlUrl
		}

		if ( item.canonical)
			article.link = item.canonical[0].href
		else
			article.link = item.alternate[0].href

		article.description  = item.content && item.content.content
		article.summary      = item.summary && item.summary.content

		article.id = articleHash(article)

		if (exports.store.insert(article) ) {
			count++
			process.stdout.write("Imported "+ count +"/"+items.length+" articles\r")
		}
	}

	if (count < items.length)
		console.log(items.length-count,'articles could not be imported')
	else
		console.log('All articles sucessfully imported!')

	console.log('Saving...')
	exports.store.save()
}



// returns hex. hash of article
var articleHash = exports.articleHash = function(article) {
	var hash = crypto.createHash('md5')
	hash.update(article.title+article.guid+article.link)
	return hash.digest('hex')
}

