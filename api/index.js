const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");
const credentials = require("./credentials.json");
const formidable = require("formidable");
const fs = require("fs");
const multer = require("multer");

const app = express();

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

var upload = multer({
  dest: "uploads/",
}).single("image");

const PORT = process.env.PORT || 5000;
const SCOPE = [
  "https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive",
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("API is running"));

app.get("/getAuthURL", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPE,
  });
  console.log(res);
  console.log(authUrl);
  return res.send(authUrl);
});

app.post("/getToken", (req, res) => {
  if (req.body.code == null) return res.status(400).send("Invalid Request");
  var code = decodeURIComponent(req.body.code);
  oAuth2Client.getToken(code, (err, token) => {
    console.log(err);
    if (err) {
      console.error("Error retrieving access token", err);
      return res.status(400).send("Error retrieving access token");
    }
    // console.log(code);
    res.send(token);
  });
});

app.post("/getUserInfo", (req, res) => {
  if (req.body.token == null) return res.status(400).send("Token not found");
  oAuth2Client.setCredentials(req.body.token);
  const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });

  oauth2.userinfo.get((err, response) => {
    console.log(response);
    console.log(err);
    if (err) res.status(400).send(err);
    console.log(response.data);
    res.send(response.data);
  });
});

/*app.post("/fileUpload", (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).send(err);
    const token = JSON.parse(fields.token);
    console.log(token);
    if (token == null) return res.status(400).send("Token not found");
    oAuth2Client.setCredentials(token);
    console.log(files.file);
    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    const fileMetadata = {
      name: files.file.name,
    };
    const media = {
      mimeType: files.file.type,
      body: fs.createReadStream(files.file.path),
    };
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id",
      },
      (err, file) => {
        oAuth2Client.setCredentials(null);
        if (err) {
          console.error(err);
          res.status(400).send(err);
        } else {
          res.send("Successful Uploaded");
        }
      }
    );
  });
});*/

app.post("/upload", upload, (req, res) => {
  var file = req.file;

  // upload request
  var url = "https://www.googleapis.com/upload/drive/v3/files";
  request(
    {
      uri: url,
      qs: {
        uploadType: "multipart",
      },
      method: "POST",
      headers: {
        "Content-Type": "multipart/related",
        Authorization: "Bearer " + access_token,
      },
      multipart: [
        {
          "Content-Type": "application/json; charset=UTF-8",
          body: JSON.stringify({
            name: file.originalname,
          }),
        },
        {
          "Content-Type": file.mimetype,
          body: fs.createReadStream(file.path),
        },
      ],
    },
    (error, response, body) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      }

      fs.unlink(file.path);
      res.sendStatus(200);
    }
  );
});

app.post("/readDrive", (req, res) => {
  console.log("hello");
  if (req.body.token == null) return res.status(400).send("Token not found");
  oAuth2Client.setCredentials(req.body.token);
  const drive = google.drive({ version: "v3", auth: oAuth2Client });
  drive.files.list(
    {
      pageSize: 10,
    },
    (err, response) => {
      if (err) {
        console.log("The API returned an error: " + err);
        return res.status(400).send(err);
      }
      const files = response.data.files;
      if (files.length) {
        console.log("Files:");
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log("No files found.");
      }
      res.send(files);
    }
  );
});

app.post("/deleteFile/:id", (req, res) => {
  if (req.body.token == null) return res.status(400).send("Token cannot found");
  oAuth2Client.setCredentials(req.body.token);
  const drive = google.drive({ version: "v3", auth: oAuth2Client });
  var fileId = req.params.id;
  drive.files.delete({ fileId: fileId }).then((response) => {
    res.send("Successfully deleted");
  });
});

app.post("/download/:id", (req, res) => {
  if (req.body.token == null) return res.status(400).send("Token not found");
  oAuth2Client.setCredentials(req.body.token);
  const drive = google.drive({ version: "v3", auth: oAuth2Client });
  var fileId = req.params.id;
  drive.files.get(
    { fileId: fileId, alt: "media" },
    { responseType: "stream" },
    function (err, response) {
      console.log(response);
      response.data
        .on("end", () => {
          console.log("Done");
        })
        .on("error", (err) => {
          console.log("Error", err);
        })
        .pipe(res);
    }
  );
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
