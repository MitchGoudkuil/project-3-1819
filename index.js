const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const hbs = require("express-handlebars");
const http = require("http").Server(app);
const io = require("socket.io")(http, { pingInterval: 500 });
const port = process.env.PORT || 3000;

let totalConnections = [];
let urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + "/server/public/"));

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/server/views/layouts"
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/server/views");

app.get("/", function(req, res) {
  res.render("chat");
});

// app.post("/chat", urlEncodedParser, function(req, res) {
//   console.log(req.body);
//   res.render("chat");
// });

io.on("connection", function(socket) {
  totalConnections.push(socket);
  console.log("a user connected " + totalConnections.length);
  io.sockets.emit("users", totalConnections.length);

  socket.on("message", function(msg) {
    let temp = msg;

    let filter = {
      cool: "ice ice baby",
      school: "scorro",
      neef: "niffauw",
      nicht: "niggauw",
      eten: "skaveren",
      vriend: "sahbi",
      sigaret: "saffie",
      oke: "aaai",
      sukkel: "aarsbanaan",
      broer: "abi",
      slet: "afgelikte boterham",
      gap: "sahbi",
      doei: "ajo",
      kut: "am",
      wiet: "ampoe",
      amsterdam: "Amsie",
      meisje: "kech",
      de: "het",
      De: "Het",
      geld: "zaaf",
      een: "wahet",
      Een: "Wahet",
      het: "de",
      billen: "assr",
      schoenen: "patas",
      dennis: "fakka je boy",
      Dennis: "fakka je boy",
      mitch: "mitta",
      guus: "gussa",
      Guus: "gussa",
      moeder: "madre",
      vader: "padre",
      lul: "paal",
      heineken: "paarden pis",
      bier: "Grey goose",
      biertje: "Grey goose",
      Bier: "Grey goose",
      Biertje: "Grey goose",
      wijn: "Moët",
      Wijn: "Moët",
      wijntje: "Moëtie",
      drank: "drankie",
      drankje: "drankie",
      auto: "waggie",
      gezellig: "fucking lit",
      Hey: "ewa G",
      Hoi: "ewa G",
      hey: "ewa G",
      hoi: "ewa G",
      hallo: "ewa G",
      Hallo: "Ewa G",
      huis: "osso",
      neus: "nosso",
      pistool: "Ak47",
      scheet: "dampoe",
      shit: "tfoe",
      lekker: "spang",
      kom: "keh",
      zweer: "wollah",
      gozer: "swa",
      feest: "fissa",
      chill: "lauw",
      borsten: "kwarktassen",
      club: "vip lounge",
      mercedes: "merrie",
      trainingspak: "trinna",
      tim: "Timma",
      may: "Johnson",
      folkert: "Folly",
      nathan: "Naeth",
      dorus: "Dorssa",
      deanna: "Déaman",
      menno: "Frieze boy",
      laurens: "Laurêhns",
      koop: "Koppa",
      sam: "Sammr",
      eva: "Eef",
      daan: "Danno",
      janno: "je boy Janneau",
      Tim: "Timma",
      May: "Johnson",
      Folkert: "Folly",
      Nathan: "Naeth",
      Dorus: "Dorssa",
      Deanna: "Déaman",
      Menno: "Frieze boy",
      Laurens: "Laurêhns",
      Koop: "Koppa",
      Sam: "Sammr",
      Eva: "Eef",
      Daan: "Danno",
      Janno: "je boy Janneau",
      steken: "djoeken",
      steek: "djoek",
      arash: "arasha man",
      Arash: "arasha man",
      haha: "jaja",
      hahaha: "jajaja",
      hahahaha: "jajajaja",
      waterpistool: "waterpipa",
      niks: "welloe",
      Niks: "Welloe",
      klap: "klappoe",
      Klap: "klappoe"
    };

    for (var key in filter) {
      if (temp.message.includes(key)) {
        temp.message = temp.message.replace(
          new RegExp("\\b" + key + "\\b", "g"),
          filter[key]
        );
      }
    }

    io.emit("message", temp);
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected " + totalConnections.length);
    totalConnections.pop();
    io.sockets.emit("users", totalConnections.length);
  });
});

http.listen(port, function() {
  console.log("listening on *:3000");
});
