var express = require('express');
var router = express.Router();

var db = require('../config/sqlite')

router.get(['/add'], function (req, res) {
    res.render('./device/add');
});

router.post(['/add'], function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    db.run('INSERT INTO sample (title, description, author) VALUES (?, ?, ?)', [title, description, author], function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/device');
        }
    });
});

router.get(['/:id/edit'], function (req, res) {
    var id = req.params.id;
    console.log('EDIT ID : ' + id);
    db.get('SELECT * FROM sample WHERE id = ?', [id], function (err, body) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            console.log('BODY ID : ' + body.id)
            res.render('./device/edit', { body: body });
        }
    });
});

router.post(['/:id/edit'], function (req, res) {
    var id = req.params.id;
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    db.run('UPDATE sample SET title = ?, description = ?, author = ? WHERE id = ?', [title, description, author, id], function (err) {
        res.redirect('/device/' + id);
    });
});

router.get(['/:id/delete'], function (req, res) {
    var id = req.params.id;
    console.log('GET EDIT ID : ' + id);
    db.get('SELECT * FROM sample WHERE id = ?', [id], function (err, body) {
        console.log('BODY ID : ' + body.id)
        res.render('./device/delete', { body: body });
    });
});

router.post(['/:id/delete'], function (req, res) {
    var id = req.params.id;
    console.log('POST EDIT ID : ' + id);
    db.run('DELETE FROM sample WHERE id = ?', [id], function (err) {
        if (this.changes == 1) {
            console.log('SUCCESS');
            res.redirect('/device')
        } else {
            console.log('FAIL');
            res.redirect('/device')
        }
    });
});

router.get(['/'], function (req, res) {
    db.all('SELECT id, title FROM sample', function (err, list) {
        res.render('./device/list', { lists: list });
    });
});

router.get(['/:id'], function (req, res) {
    db.all('SELECT id, title FROM sample', function (err, list) {
        var id = req.params.id;
        console.log('LIST ID : ' + id);
        if (id) {
            db.all('SELECT * FROM sample WHERE id = ?', [id], function (err, body) {
                res.render('./device/list', { lists: list, body: body[0] });
            });
        }
    });
});

module.exports = router;
