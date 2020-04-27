/*
=-=-=-=-=-=-=-=-=-=-=-=-
Soda Designer
=-=-=-=-=-=-=-=-=-=-=-=-
Student ID:
Comment (Required):

=-=-=-=-=-=-=-=-=-=-=-=-
*/

const Jimp = require("jimp");
const http = require("http");
const fs = require("fs");
const url = require("url");

let can = {
  lid: { path: "assets/can/can-lid.png" },
  body: { path: "assets/can/can-body.png" },
  label: { path: "assets/can/can-label.png" },
};

let flavors = [
  { id: "apple", path: "assets/flavor/apple.png", x: 120, y: 265 },
  { id: "banana", path: "assets/flavor/banana.png", x: 80, y: 285 },
  { id: "cherry", path: "assets/flavor/cherry.png", x: 100, y: 250 },
  { id: "coconut", path: "assets/flavor/coconut.png", x: 110, y: 270 },
  { id: "crab", path: "assets/flavor/crab.png", x: 83, y: 305 },
  { id: "grape", path: "assets/flavor/grape.png", x: 93, y: 268 },
  { id: "mango", path: "assets/flavor/mango.png", x: 100, y: 295 },
  { id: "orange", path: "assets/flavor/orange.png", x: 90, y: 265 },
  { id: "watermelon", path: "assets/flavor/watermelon.png", x: 75, y: 280 },
];

function loadCanImages(canCounter) {
  prop = Object.keys(can)[canCounter];
  Jimp.read(can[prop].path, (err, img) => {
    if (err) {
      throw err;
    } else {
      can[prop].resource = img;
      if (canCounter < 2) {
        canCounter++;
        loadCanImages(canCounter);
      } else {
        console.log("finished loading can assets");
      }
    }
  });
}

function loadFlavorImages(flavorCounter) {
  Jimp.read(flavors[flavorCounter].path, (err, img) => {
    if (err) {
      throw err;
    } else {
      flavors[flavorCounter].resource = img;
      if (flavorCounter < flavors.length - 1) {
        flavorCounter++;
        loadFlavorImages(flavorCounter);
      } else {
        console.log("finished loading flavor assets");
      }
    }
  });
}

function openAssets() {
  loadCanImages(0);
  loadFlavorImages(0);
}

openAssets();

const hexToRgb = function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 };
};

function create_can(can, color, flavorObj, filename, res) {
  console.log(`creating ${filename}`);
  let new_can = can.body.resource.clone();
  let colored_can = new_can.color([
    { apply: "red", params: [color.r] },
    { apply: "green", params: [color.g] },
    { apply: "blue", params: [color.b] },
  ]);
  can.lid.resource
    .blit(colored_can, 0, 0)
    .blit(can.label.resource, 40, 210)
    .blit(flavorObj.resource, flavorObj.x, flavorObj.y)
    .write(filename, () => {
      deliver_can(filename, res);
    });
}

function deliver_can(filename, res) {
  let customCan = fs.createReadStream(filename);
  res.writeHead(200, { "Content-Type": "image/png" });
  customCan.pipe(res);
}

let server = http.createServer();
server.on("request", (req, res) => {
  if (req.url === "/") {
    let file = fs.createReadStream("./html/form.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    file.pipe(res);
  } else if (req.url === "/image-credits.txt") {
    let file = fs.createReadStream("./assets/image-credits.txt");
    res.writeHead(200, { "Content-Type": "text/plain" });
    file.pipe(res);
  } else if (req.url.startsWith("/design")) {
    let user_input = url.parse(req.url, true).query;
    let color = hexToRgb(user_input.color);
    let i = flavors.findIndex((flavor) => flavor.id === user_input.flavor);
    if (i === -1) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write(`${user_input.flavor} not valid`);
      console.log(user_input);
      res.end();
    } else {
      let filename = `${flavors[i].id}_${user_input.color}.png`;
      if (fs.existsSync(filename)) {
        let customCan = fs.createReadStream(filename);
        res.writeHead(200, { "Content-Type": "image/png" });
        customCan.pipe(res);
      } else {
        create_can(can, color, flavors[i], filename, res);
      }
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not found at all");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
