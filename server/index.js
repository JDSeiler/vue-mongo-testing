const express = require('express');
const cors = require('cors');
const app = express();

const { config } = require('./app-config');
const {DB_URI, MAIN_TABLE} = config;

const mongo = require('mongodb');
// Mongo yelled at me to turn on unified topology, so here we are
const client = new mongo.MongoClient(DB_URI, { useUnifiedTopology: true });

async function pushFact(fact) {
    if (!client.isConnected()) {
        await client.connect();
    }

    const facts = await client.db(MAIN_TABLE).collection("facts");
    await facts.insertOne({"text": fact});
}

async function getFacts() {
    if (!client.isConnected()) {
        await client.connect();
    }

    const facts = await client.db(MAIN_TABLE).collection("facts");
    const cursor = await facts.find({});
    return await cursor.toArray();
}

async function deleteFacts() {
    if (!client.isConnected()) {
        await client.connect();
    }

    const facts = await client.db(MAIN_TABLE).collection("facts");
    await facts.deleteMany({});
}

// Bless the creator of this module
// Appends: `Access-Control-Allow-Origin: *` to everything and makes my life easier.
app.use(cors());

/**
 * POST /save
 * Query parameters:
 * fact: string
 * 
 * Saves the provided fact (passed as a query parameter) to MongoDB
 */
app.post('/save', (req, res) => {
    const fact = req.query.fact;
    if (typeof fact === 'undefined') {
        res.sendStatus(400);
    } else {
        console.log(`Saving fact: ${fact}`);
        res.send("Saving fact");
        pushFact(fact);
    }
});

/**
 * GET /facts
 * 
 * Returns all facts from MongoDB
 * 
 * Response Shape:
 * {
 *  facts: [{id: string, text: string}] 
 * }
 */
app.get('/facts', async function(req, res) {
    const allFacts = await getFacts();
    res.set('Content-Type', 'application/json');
    res.send({facts: allFacts});
});

/**
 * DELETE /facts
 * 
 * Deletes all facts from MongoDB
 */
app.delete('/facts', async function(req, res) {
    await deleteFacts();
    res.sendStatus(204);
});

app.listen(3000, () => console.log("Listening on port 3000"));
