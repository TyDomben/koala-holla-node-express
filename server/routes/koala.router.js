// express constants
const express = require("express");
const koalaRouter = express.Router();
const express = require("express");

// DB CONNECTION
// Import pool
const pool = require("../modules/pool.js");

// GET
// initial GET request
router.get("/", (req, res) => {
  let queryText = 'SELECT * FROM "koalas";'; //select all from koalas table

  // ! use the pool to send query
  pool
    .query(queryText)
    .then((result) => {
      console.log(result.rows);
      console.log("Koala Holla Backend is running");
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Woops, error making query: ", queryText);
      console.error(error);
      res.sendStatus(500);
    });
});
// get request v.2 search function
// router.get('/byid/:id', (req, res) => {
//     const idToGet = req.params.id
//     const queryText = `
//         SELECT * FROM "koalas"
//         WHERE "id" = $1;
//     `

//     const queryParams = [idToGet]

//     pool.query(queryText, queryParams)
//         .then((result) => {
//             console.log("/koalas/byid/:id result - ", result.rows)
//             res.sendStatus(200)
//         })
//         .catch((error) => {
//             console.log("Woops, error making query: ", queryText)
//             console.error(error)
//             res.sendStatus(500)
//         })
// });
// POST
// making a newKoala
router.post("/", (req, res) => {
  console.log("req.body", req.body);

  const newKoala = req.body; // newKoala

  // Sending data to DB
  // ! Querytext
  const queryText = `
    INSERT INTO "koalas" ("name", "gender", "ready_to_transfer", "notes")
    VALUES
        ($1, $2, $3, $4);
    `;

  let queryParams = [
    koalas.name,
    koalas.gender,
    koalas.ready_to_transfer,
    koalas.notes,
  ];
  console.log("QueryText:", queryText);

  pool
    .query(queryText, queryParams)
    .then((result) => {
      console.log("QueryText:", queryText);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Woops, error making query: ", queryText);
      console.error(error);
      res.sendStatus(500);
    });
});

// PUT

router.put("/:id", (req, res) => {
  let koalaId = req.params.id;
  console.log("koalaID", koalaId);
  let queryText;
  let queryParams = [koalaId];
  pool
    .query(queryText, queryParams)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("Woops, error making query: ", queryText);
      console.error(error);
      res.sendStatus(500);
    });
});

// DELETE
// no not yet
// no

module.exports = koalaRouter;
