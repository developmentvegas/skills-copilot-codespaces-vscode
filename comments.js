// Create web server
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const comments = []

http.createServer((req, res) => {
  // Parse URL
  const urlObj = url.parse(req.url, true)
  const pathname = urlObj.pathname

  // Write comment
  if (pathname === '/comment') {
    // Get comment from URL
    const comment = urlObj.query.comment
    // Add comment to comments
    comments.push(comment)
    // Write comment to file
    fs.writeFile(
      path.join(__dirname, 'comments.txt'),
      comments.join('\n'),
      err => {
        if (err) {
          console.error(err)
          res.statusCode = 500
          res.end('Server Error')
        } else {
          res.end('Comment added')
        }
      }
    )
  } else if (pathname === '/comments') {
    // Read comments from file
    fs.readFile(
      path.join(__dirname, 'comments.txt'),
      'utf8',
      (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            res.end('No comments yet')
          } else {
            console.error(err)
            res.statusCode = 500
            res.end('Server Error')
          }
        } else {
          res.end(data)
        }
      }
    )
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
}).listen(3000, () => {
  console.log('Server started at http://localhost:3000/')
})