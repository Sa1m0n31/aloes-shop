const express = require("express");
const router = express.Router();
require('dotenv').config()
const con = require("../databaseConnection");
const got = require("got");
const cors = require("cors");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const API_KEY = process.env.PAYMENT_API_KEY;
const SIGNATURE_KEY = process.env.PAYMENT_SIGNATURE_KEY;

con.connect(err => {
    router.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    /* PAYMENT */
    router.post("/payment", cors(), async (request, response) => {
        /* Add order to database */
        let { sessionId, email, amount } = request.body;

        amount = amount * 100;
        const idempotency = uuidv4();

        let postData = {
            amount: amount,
            externalId: sessionId,
            description: "Płatność za zakupy w sklepie Caloe",
            buyer: {
                email: email
            }
        }

        let signature = crypto.createHmac('sha256', SIGNATURE_KEY).update(JSON.stringify(postData)).digest("base64");

        got.post('https://api.paynow.pl/v1/payments', {
            json: postData,
            responseType: 'json',
            headers: {
                'Api-Key': API_KEY,
                'Signature': signature,
                'Idempotency-Key': idempotency,
            }
        })
            .then(res => {
                response.send({
                    result: res.body,
                    token: idempotency,
                    signature: signature
                });
            });
    });

    router.post("/get-payment-status", (request, response) => {
        const { paymentId } = request.body;

        got.get(`https://api.paynow.pl/v1/payments/${paymentId}/status`, {
            headers: {
                'Api-Key': API_KEY
            }
        })
            .then(res => {
               response.send({
                   result: res.body
               });
            });
    });
});

module.exports = router;
