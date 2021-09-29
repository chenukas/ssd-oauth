const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { google } = require('googleapis')
const credentials = require('./credentials.json')

const app = express()

const client_id = credentials.web.client_id
const client_secret = credentials.web.client_secret
const redirect_uris = credentials.web.redirect_uris
const oAuth2Client =  new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

const PORT = process.env.PORT || 5000
const SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API is running'))

app.get('/getAuthURL', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE,
    });
    console.log(authUrl)
    return res.send(authUrl)
})

app.post('/getToken', (req, res) => {
    if (req.body.code == null) return res.status(400).send('Invalid Request')
    oAuth2Client.getToken(req.body.code, (err, token) => {
        if (err) {
            console.error('Error retrieving access token', err)
            return res.status(400).send('Error retrieving access token')
        }
        res.send(token);
    })
})

app.post('/getUserInfo', (req, res) => {
    if (req.body.token == null) return res.status(400).send('Token not found')
    oAuth2Client.setCredentials(req.body.token)
    const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client })

    oauth2.userinfo.get((err, response) => {
        if (err) res.status(400).send(err)
        console.log(response.data)
        res.send(response.data)
    })
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`))