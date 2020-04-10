const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const multer = require('multer');
const app = express();

var upload = multer();


app.use('/static', express.static("static"));
app.use('/data', express.static("data"))
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


const title = "Film App";

var cameras = JSON.parse(fs.readFileSync('database.json'));

//routes
app.route('/photos/:camid/:id').get( (request, response) => {
    const camid = request.params.camid;
    const id = request.params.id;
    const data = cameras[camid].photos.find( photo => photo.id == id);
    const cameraName = cameras[camid].name;
    data.cameraName = cameraName;
    const page = 'photo_detail';
    response.render('index', {title, page, data});
}).post(upload.none(), (request, response) => {
    if (request.body != undefined) {
        const camid = request.params.camid;
        const id = request.params.id;

        var camera = cameras[camid];
        var data = camera.photos.find( photo => photo.id == id);
        const index = camera.photos.indexOf(data);

        if (request.body.title != undefined) {
            data.title = request.body.title;
        }
        if (request.body.dateTaken != undefined) {
            data.dateTaken = request.body.dateTaken;
        }
        if (request.body.description != undefined) {
            data.description = request.body.description;
        }

        cameras[camid].photos[index] = data;

        fs.writeFileSync('database.json', JSON.stringify(cameras));

        const page = 'photo_detail';
        response.render('index', {title, page, data});
    } else {
        response.redirect('/photos')
    }
});

app.route('/photo/new').get( (request, response) => {
        const page = 'photo_add';
        const data = cameras;
        response.render('index', {title, page, data});
    }).post(upload.single('photo'), (request, response) => {
        if (request.body != undefined && request.file != undefined) {
            const id = uuid.v4();
            const photo = {
                id: id,
                title: request.body.title,
                url: `/data/${request.body.camera}/${request.file.originalname}`,
                dateTaken: request.body.dateTaken,
                iso: request.body.iso,
                description: request.body.description,
                film: request.body.filmName
            }

            if (!fs.existsSync(`./data/${request.body.camera}`)) {
                fs.mkdirSync(`./data/${request.body.camera}`);
            }

            fs.writeFileSync(`./data/${request.body.camera}/${request.file.originalname}`, request.file.buffer, 'binary');
            
            cameras[request.body.camera]['photos'].push(photo);
            fs.writeFileSync('database.json', JSON.stringify(cameras));
            response.redirect(`/photos/${request.body.camera}/${id}`);
        } else {
            response.redirect('photos');
        }
    });

app.route(['', '/photos']).get( (request, response) => {
    const data = cameras;
    const page = 'photo_list';
    response.render('index', {title, page, data});
});

app.route('/cameras/:camid').get( (request, response) => {
    const camid = request.params.camid;
    const data = cameras[camid];
    const page = 'camera_detail';
    response.render('index', {title, page, data, camid});
}).post(upload.none(), (request, response) => {
    if (request.body.description != undefined) {
        const camid = request.params.camid;
        const page = 'camera_detail';

        var data = cameras[camid];
        if (request.body.name != undefined) {
            data.name = request.body.name;
        }

        if (request.body.description != undefined) {
            data.description = request.body.description;
        }

        fs.writeFileSync('database.json', JSON.stringify(cameras));

        response.render('index', {title, page, data, camid});
    } else {
        response.redirect('/cameras');
    }
});

app.route('/cameras/:camid/photos').get( (request, response) => {
    const camid = request.params.camid;
    let data = { };
    data[camid] = cameras[camid];
    const page = 'photo_list';
    response.render('index', {title, page, data});
})

app.route('/camera/new').get( (request, response) => {
        const page = 'camera_add';
        const data = cameras;
        response.render('index', {title, page, data});
    }).post(upload.single('photo'), (request, response) => {
        if (request.body != undefined && request.file != undefined) {
            const id = uuid.v4();
            cameras[id] = { name: request.body.name, photos: [] };
            fs.writeFileSync(`./data/${id}.jpg`, request.file.buffer, 'binary');

            fs.writeFileSync('database.json', JSON.stringify(cameras));
        }
        response.redirect(`/cameras`);
    });

app.route('/cameras').get( (request, response) => {
    const data = cameras;
    const page = 'camera_list';
    response.render('index', {title, page, data});
});

app.route('/other-apps').get( (request, response) => {
    const page = 'other_apps';
    response.render('index', {title, page});
});

app.use(function(request, response) {
    response.status(404);

    if (request.accepts('html')) {
        response.sendFile(path.join(__dirname, '/static/404.html'));
        return;
    }
    response.type('txt').send('Not found');
});

var server = app.listen(8000, 
    console.log("Server running at localhost:8000")
);