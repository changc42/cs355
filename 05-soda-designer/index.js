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
        // console.log("finished loading can assets");
        for (prop in can) {
          can[prop].resource.write(`${prop}.png`);
        }
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

function checkResource() {
  flavors.forEach((obj, i) => {
    obj.resource.write(`${i}.png`);
  });
}
function openAssets() {
  loadCanImages(0);
  loadFlavorImages(0);
}

openAssets();

let server = http.createServer();

server.listen(3000, () => {
  console.log("listening on port 3000");
});
