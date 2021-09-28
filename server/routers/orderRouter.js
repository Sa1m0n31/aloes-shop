const express = require("express");
const router = express.Router();
const con = require("../databaseConnection");

const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

/* Nodemailer */
let transporter = nodemailer.createTransport(smtpTransport ({
    auth: {
        user: 'test@skylo-test2.pl',
        pass: 'SwinkaPeppa-31'
    },
    host: 'skylo-pl.atthost24.pl',
    secureConnection: true,
    port: 587,
    tls: {
        rejectUnauthorized: false
    },
}));

const sendStatus3Email = (id, email, fullName, letterNumber, response = null) => {
    /* status = ZREALIZOWANE */
    let mailOptions = {
        from: 'test@skylo-test2.pl',
        to: email,
        subject: 'Twoje zamówienie zostało zrealizowane',
        html: `<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;700;1,300&display=swap" rel="stylesheet">
</head>
<body>
<main style="width: 100%;">
    <img style="max-width: 100%; width: 800px; margin: 0;" src="https://aloes.skylo-test3.pl/image?url=/media/notification/logo.jpg" alt="zamowienie-zostalo-zrealizowane" />
    <table style="display: block; padding: 20px; max-width: 100%; width: 800px; background: #59545A; margin-top: -5px; color: #fff; font-weight: 300; font-family: 'Open Sans', sans-serif;">
        <thead>
            <tr>
               <th style="font-weight: 300; display: block; margin-top: 20px; text-align: left;">
                   Dzień dobry, ${fullName}
               </th>
            </tr>
            <tr>
                <th style="font-weight: 700; display: block; margin: 30px 0; text-align: left">
                    Twoje zamówienie #${id} zostało zrealizowane!
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    Paczka jest gotowa do wysyłki i oczekuje na kuriera!
                    Informacje o etapach dostarczenia przesyłki dostaniesz bezpośrednio od przewoźnika na adres mailowy podany przy zamówieniu.
                </td>
            </tr>
            <tr>
                <td style="display: block; margin: 20px 0;">
                    Numer listu przewozowego: ${letterNumber}
                </td>
            </tr>
            <tr>
                <td>
                    <a target="_blank" style="color: #fff;" href="https://inpost.pl/sledzenie-przesylek?number=${letterNumber}">
                        Śledź paczkę
                    </a>
                </td>
            </tr>
            <tr>
                <td style="display: block; margin-top: 20px; font-weight: 700;">
                    Ważne!
                </td>
            </tr>
            <tr>
                <td>
                    Śledzenie przesyłki na stronach firmy przewozowej możliwe jest najwcześniej w godzinach wieczornych w dniu nadania.
                </td>
            </tr>
        </tbody>
        <tfoot style="display: block; border-top: 2px solid #fff; margin: 20px auto;">
            <tr>
                <td style="display: block; margin-top: 20px;">
                    Pozdrawiamy
                </td>
            </tr>
            <tr>
                <td>
                    Zespół HideIsland
                </td>
            </tr>
            <tr>
                <td>
                    <a style="color: #fff; display: block; margin-top: 20px; text-decoration: none;" href="https://hideisland.pl">
                        hideisland.pl
                    </a>
                </td>
            </tr>
            <tr>
                <td>
                    <a style="color: #fff; text-decoration: none;" href="mailto:biuro@hideisland.pl">
                        biuro@hideisland.pl
                    </a>
                </td>
            </tr>
        </tfoot>
    </table>
</main>
</body>`
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            if(response) {
                response.send({
                    result: 0
                })
            }
        }
        else{
            if(response) {
                response.send({
                    result: 1
                })
            }
        }
    });
}

const sendStatus2Email = (id, email, fullName, response = null) => {
    /* status = PRZYJĘTE DO REALIZACJI */
    let mailOptions = {
        from: 'test@skylo-test2.pl',
        to: email,
        subject: 'Twoje zamówienie zostało przyjęte do realizacji',
        html: `<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;700;1,300&display=swap" rel="stylesheet">
</head>
<body>
<main style="width: 100%;">
    <img style="max-width: 100%; width: 800px; margin: 0;" src="https://aloes.skylo-test3.pl/image?url=/media/notification/logo.jpg" alt="zamowienie-zostalo-zrealizowane" />
    <table style="display: block; padding: 20px; max-width: 100%; width: 800px; background: #59545A; margin-top: -5px; color: #fff; font-weight: 300; font-family: 'Open Sans', sans-serif;">
        <thead>
            <tr>
               <th style="font-weight: 300; display: block; margin-top: 20px; text-align: left;">
                   Dzień dobry, ${fullName}
               </th>
            </tr>
            <tr>
                <th style="font-weight: 700; display: block; margin: 30px 0; text-align: left">
                    Twoje zamówienie #${id} zmieniło status na <b>przyjęte do realizacji</b>!
                </th>
            </tr>
        </thead>
        <tbody style="display: block; width: 100%;">
            <tr>
                <td>
                    W przypadku pytań lub wątpliwości prosimy o kontakt pod adresem e-mail: <a href="mailto:biuro@hideisland.pl" style="color: #fff; text-decoration: none;">biuro@hideisland.pl</a>.
                </td>
            </tr>
            <tr style="display: block; width: 100%;">
                <td style="display: block; margin-top: 20px; font-weight: 700; font-size: 17px; width: 100%; text-align: center;">
                    O następnych etapach realizacji zamówienia poinformujemy Ciebie w kolejnym mailu.
                </td>
            </tr>
        </tbody>
        <tfoot style="display: block; border-top: 2px solid #fff; margin: 20px auto;">
            <tr>
                <td style="display: block; margin-top: 20px;">
                    Pozdrawiamy
                </td>
            </tr>
            <tr>
                <td>
                    Zespół HideIsland
                </td>
            </tr>
            <tr>
                <td>
                    <a style="color: #fff; display: block; margin-top: 20px; text-decoration: none;" href="https://hideisland.pl">
                        hideisland.pl
                    </a>
                </td>
            </tr>
            <tr>
                <td>
                    <a style="color: #fff; text-decoration: none;" href="mailto:biuro@hideisland.pl">
                        biuro@hideisland.pl
                    </a>
                </td>
            </tr>
        </tfoot>
    </table>
</main>
</body>`
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            if(response) {
                response.send({
                    result: 0
                })
            }
        }
        else{
            if(response) {
                response.send({
                    result: 1
                })
            }
        }
    });
}

const sendStatus1Email = (id, email, sells) => {

}

con.connect(err => {
    /* GET ALL ORDERS */
    router.get("/get-orders", (request, response) => {
        const query = 'SELECT o.id as id, u.full_name, u.email, o.date, o.payment_status, o.order_status, o.order_comment FROM orders o LEFT OUTER JOIN users u ON o.user = u.id';
        con.query(query, (err, res) => {
            if (res) {
                response.send({
                    result: res
                });
            } else {
                response.send({
                    result: []
                });
            }
        });
    });

    const decrementStock = (productId, quantity) => {
        const values = [quantity, productId];
        const query = 'UPDATE products SET stock = stock - ? WHERE id = ?';
        con.query(query, values);
    }

        /* ADD SELL */
        router.post("/add-sell", (request, response) => {
            let {productId, orderId, quantity, size, paymentMethod} = request.body;

            const values = [orderId, productId, quantity, size];
            const query = 'INSERT INTO sells VALUES (NULL, ?, ?, ?, ?)';

            if(paymentMethod === 2) {
                /* Jesli za pobraniem - dekrementuj stan magazynowy */
                decrementStock(productId, quantity);
            }

            con.query(query, values, (err, res) => {
                if (res) {
                    response.send({
                        result: res.insertId
                    });
                } else {
                    console.log(err);
                    response.send({
                        result: null
                    });
                }
            });
        });

        /* ADD ORDER */
        router.post("/add", (request, response) => {
            let {paymentMethod, shippingMethod, city, address, postalCode, sessionId, user, comment, companyName, nip, companyAddress, companyPostalCode, companyCity, amount, inPostAddress, inPostCode, inPostCity} = request.body;

            let paymentStatus = "nieopłacone";
            if(paymentMethod === 2) {
                /* Payment method - za pobraniem */
                paymentStatus = "za pobraniem";
            }

            let values = [paymentMethod, shippingMethod, city, address, postalCode, user, paymentStatus, comment, sessionId, companyName, nip, companyAddress, companyPostalCode, companyCity, amount, inPostAddress, inPostCode, inPostCity];
            const query = `INSERT INTO orders VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, 'złożone', CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            values = values.map((item) => {
                if (item === "") return null;
                else return item;
            });
            con.query(query, values, (err, res) => {
                let result = 0;
                console.log(res);
                console.log(err);
                if (res) {
                    if (res.insertId) result = res.insertId;
                }
                response.send({
                    result
                });
            });
        });

        /* CHANGE PAYMENT STATUS */
        router.post("/change-payment-status", (request, response) => {
            const {id, status} = request.body;
            const values = [status, id];
            const query = 'UPDATE orders SET payment_status = ? WHERE przelewy24_id = ?';
            con.query(query, values, (err, res) => {
                let result = 0;
                if (res) result = 1;
                response.send({
                    result
                });
            });
        });

        router.post("/change-payment-id", (request, response) => {
           const { id, paymentId } = request.body;
           const values = [paymentId, id];
           const query = 'UPDATE orders SET przelewy24_id = ? WHERE id = ?';
           con.query(query, values, (err, res) => {
              if(res) {
                  response.send({
                      result: 1
                  });
              }
              else {
                  response.send({
                      result: 0
                  });
              }
           });
        });

        /* CHANGE ORDER STATUS */
        router.post("/change-order-status", (request, response) => {
            const {id, orderStatus} = request.body;

            /* Change order status in database */
            const query = 'UPDATE orders SET order_status = ? WHERE id = ?';
            const values = [orderStatus, id];
            con.query(query, values, (err, res) => {
                if(res) {
                    response.send({
                        result: 1
                    });
                }
                else {
                    response.send({
                        result: 0
                    });
                }
                // if(res) {
                //     /* Get order info */
                //     const query = 'SELECT * FROM orders o JOIN users u ON o.user = u.id WHERE o.id = ?';
                //     const values = [id];
                //
                //     con.query(query, values, (err, res) => {
                //        if(res) {
                //            const firstName = res[0].first_name;
                //            const lastName = res[0].last_name;
                //            const email = res[0].email;
                //            const fullName = firstName + " " + lastName;
                //            /* Send email based on order status */
                //            if(orderStatus === "przyjęte do realizacji") {
                //                sendStatus2Email(id, email, fullName, response);
                //            }
                //            else if(orderStatus === "zrealizowane") {
                //                sendStatus3Email(id, email, fullName, letterNumber, response);
                //            }
                //            else {
                //                response.send({
                //                    result: 1
                //                });
                //            }
                //        }
                //        else {
                //            response.send({
                //                result: 0
                //            });
                //        }
                //     });
                // }
                // else {
                //     response.send({
                //         result: 0
                //     });
                // }
            });
        });

        /* REMOVE ORDER */
        router.post("/delete", (request, response) => {
            const {id} = request.body;
            const values = [id];
            const query = 'DELETE FROM orders WHERE id = ?';
            con.query(query, values, (err, res) => {
                let result = 0;
                if (res) result = 1;
                response.send({
                    result
                });
            });
        });

        /* GET ORDER DETAILS */
        router.post("/get-order", (request, response) => {
            const {id} = request.body;
            const values = [id];
            const query = 'SELECT o.id, o.payment_status, o.order_status, o.order_comment, u.full_name, u.email, u.phone_number, o.date, o.order_status, pm.name as payment, sm.name as shipping, o.order_comment, o.address, o.postal_code, o.city, o.company_name, o.nip, o.company_address, o.company_postal_code, o.company_city, s.quantity, p.price, p.name, o.inpost_address, o.inpost_postal_code, inpost_city FROM orders o ' +
                'JOIN sells s ON o.id = s.order_id ' +
                'LEFT OUTER JOIN products p ON p.id = s.product_id ' +
                'JOIN shipping_methods sm ON o.shipping_method = sm.id ' +
                'JOIN payment_methods pm ON o.payment_method = pm.id ' +
                'JOIN users u ON u.id = o.user ' +
                'WHERE o.id = ?;';
            con.query(query, values, (err, res) => {
                console.log(err);
                console.log(res);
                if(res) {
                    response.send({
                        result: res
                    });
                } else {
                    response.send({
                        result: null
                    });
                }
            });
        });
});

module.exports = router;
