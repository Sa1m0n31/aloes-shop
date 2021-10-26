const express = require("express");
const router = express.Router();
const con = require("../databaseConnection");
const got = require("got");

const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

/* Nodemailer */
let transporter = nodemailer.createTransport(smtpTransport ({
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD
    },
    host: 'skylo-pl.atthost24.pl',
    secureConnection: true,
    port: 465,
    tls: {
        rejectUnauthorized: false
    },
}));

const sendStatus3Email = (id, email, fullName, letterNumber, response = null) => {
    /* status = ZREALIZOWANE */
    let mailOptions = {
        from: process.env.MAIL,
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
    <img style="max-width: 100%; width: 800px; margin: 0;" src="http://caloe.pl/image?url=/media/notifications/caloe-logo.png" alt="zamowienie-zostalo-zrealizowane" />
    <table style="display: block; padding: 20px; color: #000; max-width: 100%; width: 800px; background: #f8f8f8; margin-top: -5px; font-weight: 300; font-family: 'Open Sans', sans-serif;">
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
        </tbody>
        <tfoot style="display: block; border-top: 2px solid #976c2b; margin: 20px auto;">
            <tr>
                <td style="display: block; margin-top: 20px;">
                    Pozdrawiamy
                </td>
            </tr>
            <tr>
                <td>
                    Zespół Caloe.pl
                </td>
            </tr>
            <tr>
                <td>
                    <a style="display: block; margin-top: 20px; text-decoration: none;" href="https://caloe.pl">
                        caloe.pl
                    </a>
                </td>
            </tr>
            <tr>
                <td>
                    <a style="text-decoration: none;" href="mailto:sklep@caloe.pl">
                        sklep@caloepl
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
        from: process.env.MAIL,
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
    <img style="max-width: 100%; width: 800px; margin: 0;" src="http://caloe.pl/image?url=/media/notifications/caloe-logo.png" alt="zamowienie-zostalo-zrealizowane" />
    <table style="display: block; padding: 20px; color: #000; max-width: 100%; width: 800px; background: #f8f8f8; margin-top: -5px; font-weight: 300; font-family: 'Open Sans', sans-serif;">
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
                    W przypadku pytań lub wątpliwości prosimy o kontakt pod adresem e-mail: <a href="mailto:sklep@caloe.pl" style="text-decoration: none;">sklep@caloe.pl</a>.
                </td>
            </tr>
            <tr style="display: block; width: 100%;">
                <td style="display: block; margin-top: 20px; font-weight: 700; font-size: 17px; width: 100%; text-align: center;">
                    O następnych etapach realizacji zamówienia poinformujemy Ciebie w kolejnym mailu.
                </td>
            </tr>
        </tbody>
        <tfoot style="display: block; border-top: 2px solid #976c2b; margin: 20px auto;">
            <tr>
                <td style="display: block; margin-top: 20px;">
                    Pozdrawiamy
                </td>
            </tr>
            <tr>
                <td>
                    Zespół Caloe.pl
                </td>
            </tr>
            <tr>
                <td>
                    <a style="display: block; margin-top: 20px; text-decoration: none;" href="https://caloe.pl">
                        caloe.pl
                    </a>
                </td>
            </tr>
            <tr>
                <td>
                    <a style="text-decoration: none;" href="mailto:sklep@caloe.pl">
                        sklep@caloepl
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

const sendStatus1Email = (orderInfo, response = null) => {
    let sells = ``;
    let sum = 0;
    for(let i=0; i<orderInfo.length; i++) {
        sells += `<tr>
            <td>
                ${orderInfo[i].name}
            </td>
            <td style="font-weight: 700; font-size: 15px; text-align: center; width: 110px;">${orderInfo[i].quantity}</td>
            <td style="font-weight: 700; font-size: 15px; text-align: center; width: 110px;">${orderInfo[i].price} PLN</td>
        </tr>`;

        sum += parseInt(orderInfo[i].quantity) * parseFloat(orderInfo[i].price);
    }

    /* status = ZŁOŻONE */
    let mailOptions = {
        from: process.env.MAIL,
        to: orderInfo[0].email,
        subject: 'Dziękujemy za złożenie zamówienia w sklepie Caloe',
        html: `<head>
    <meta charSet="UTF-8">
        <title>Title</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;700;1,300&display=swap"
                      rel="stylesheet">
</head>
<body>
<main style="width: 100%;">
    <img style="max-width: 100%; width: 800px; margin: 0;" src="https://caloe.pl/image?url=/media/notifications/caloe-logo.png" alt="zamowienie-zostalo-zlozone"/>
    <table
        style="display: block; padding: 20px; color: #000; max-width: 100%; width: 800px; background: #f8f8f8; margin-top: -5px; font-weight: 300; font-family: 'Open Sans', sans-serif;">
        <thead style="display: block;">
        <tr style="display: block;">
            <th style="font-weight: 300; font-size: 21px; display: block; margin-top: 20px; text-align: center;">
                Dziękujemy za zamówienie w sklepie Caloe.pl
            </th>
        </tr>
        <tr style="display: block;">
            <th style="font-weight: 300; display: block; font-size: 21px; text-align: center;">
                Poniżej znajdują się szczegóły Twojego zamówienia.
            </th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td style="display: block; margin-top: 25px; font-weight: 700;">
                Kupione przedmioty:
            </td>
        </tr>
        <tr></tr>
        <tr></tr>
        ${sells}
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr style="display: block; margin-top: 15px;">
            <td style="font-size: 14px; width: 150px;">
                Wartość produktów:
            </td>
            <td style="font-size: 14px;">
                ${sum} PLN
            </td>
        </tr>
        <tr style="display: block; margin-top: 5px;">
            <td style="font-size: 14px; width: 150px;">
                Koszt dostawy:
            </td>
            <td style="font-size: 14px;">
                ${orderInfo[0].shipping_method_price} PLN
            </td>
        </tr>
        <tr style="display: block; margin-top: 5px; border-bottom: 3px solid #976C2B; padding-bottom: 15px;">
            <td style="font-weight: 700; font-size: 15px; width: 150px;">
                Razem
            </td>
            <td style="font-weight: 700; font-size: 15px;">
                ${orderInfo[0].order_price} PLN
            </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr>
            <td colSpan="5" style="font-size: 14px;">
                Drogi kliencie, realizacja Twojego zamówienia nr: ${orderInfo[0].id} rozpocznie się po zaksięgowaniu płatności na
                naszym koncie. W następnych mailach będziemy Cię informować o kolejnych etapach zamówienia.
            </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        </tbody>
        <tfoot style="display: block; border-top: 2px solid #976c2b; margin: 20px auto;">
            <tr>
                <td style="display: block; margin-top: 20px;">
                    Pozdrawiamy
                </td>
            </tr>
            <tr>
                <td>
                    Zespół Caloe.pl
                </td>
            </tr>
            <tr>
                <td>
                    <a style="display: block; margin-top: 20px; text-decoration: none;" href="https://caloe.pl">
                        caloe.pl
                    </a>
                </td>
            </tr>
            <tr>
                <td>
                    <a style="text-decoration: none;" href="mailto:sklep@caloe.pl">
                        sklep@caloepl
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

con.connect(err => {
    router.post("/send-order-info", (request, response) => {
        const { orderId } = request.body;

        const query = 'SELECT o.id, o.order_price, p.name, p.price, s.quantity, s.size, pm.name as payment_method, sm.name as shipping_method, sm.price as shipping_method_price, o.inpost_address, o.inpost_postal_code, o.inpost_city, o.nip, o.company_name, u.email, u.full_name, u.address, u.city, u.postal_code FROM orders o JOIN users u ON u.id = o.user JOIN payment_methods pm ON pm.id = o.payment_method JOIN shipping_methods sm ON sm.id = o.shipping_method JOIN sells s ON s.order_id = o.id JOIN products p ON p.id = s.product_id WHERE o.id = ?';
        const values = [orderId];
        con.query(query, values, (err, res) => {
            if(res) {
                sendStatus1Email(res, response);
            }
            else {
                response.send({
                    result: 0
                });
            }
        });
    });

    /* GET ALL ORDERS */
    router.get("/get-orders", (request, response) => {
        const query = 'SELECT o.id as id, u.full_name, u.email, DATE_ADD(o.date, INTERVAL 2 HOUR) as date, o.payment_status, o.order_status, o.order_comment, o.przelewy24_id FROM orders o LEFT OUTER JOIN users u ON o.user = u.id ORDER BY o.id DESC';
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

            /* Dekrementuj stan magazynowy */
            decrementStock(productId, quantity);

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
            let {paymentMethod, shippingMethod, city, address, postalCode, sessionId, user, comment, companyName, nip, companyAddress, companyPostalCode, companyCity, amount, inPostAddress, inPostCode, inPostCity, dhlAddress, dhlPostCode, dhlCity} = request.body;

            let paymentStatus = "nieopłacone";
            if(paymentMethod === 2) {
                /* Payment method - za pobraniem */
                paymentStatus = "za pobraniem";
            }

            if(!inPostAddress) {
                if(dhlAddress) {
                    inPostAddress = dhlAddress;
                    inPostCity = dhlCity;
                    inPostCode = dhlPostCode;
                }
            }

            let values = [paymentMethod, shippingMethod, city, address, postalCode, user, paymentStatus, comment, sessionId, companyName, nip, companyAddress, companyPostalCode, companyCity, amount, inPostAddress, inPostCode, inPostCity];
            const query = `INSERT INTO orders VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, 'złożone', CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)`;

            values = values.map((item) => {
                if (item === "") return null;
                else return item;
            });
            con.query(query, values, (err, res) => {
                let result = 0;
                if (res) {
                    if (res.insertId) {
                        result = res.insertId;
                        response.send({
                            result
                        });
                    }
                }
                else {
                    response.send({
                        result: 0
                    });
                }
            });
        });

        /* CHANGE PAYMENT STATUS */
        router.post("/change-payment-status", (request, response) => {
            const {id, status} = request.body;
            const values = [status, id];
            const query = 'UPDATE orders SET payment_status = ? WHERE przelewy24_id = ?';
            console.log(values);
            con.query(query, values, (err, res) => {
                let result = 0;
                if (res) result = 1;
                console.log(err);
                console.log(res);
                response.send({
                    result
                });
            });
        });

        router.post("/change-payment-link", (request, response) => {
            const { id, link } = request.body;

            const query = 'UPDATE orders SET payment_link = ? WHERE id = ?';
            const values = [link, id];

            con.query(query, values, (err, res) => {
               if(res) {
                   response.send({
                       result: 1
                   })
               }
               else {
                   response.send({
                       result: 0
                   });
               }
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
                if(res) {
                    /* Get order info */
                    const query = 'SELECT * FROM orders o JOIN users u ON o.user = u.id WHERE o.id = ?';
                    const values = [id];

                    con.query(query, values, (err, res) => {
                       if(res) {
                           const email = res[0].email;
                           const fullName = res[0].full_name;
                           /* Send email based on order status */
                           if(orderStatus === "przyjęte do realizacji") {
                               sendStatus2Email(id, email, fullName, response);
                           }
                           else if(orderStatus === "zrealizowane") {
                               sendStatus3Email(id, email, fullName, response);
                           }
                           else {
                               response.send({
                                   result: 1
                               });
                           }
                       }
                       else {
                           response.send({
                               result: 0
                           });
                       }
                    });
                }
                else {
                    response.send({
                        result: 0
                    });
                }
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
            const query = 'SELECT o.id, o.payment_status, o.order_status, o.order_comment, u.full_name, u.email, u.phone_number, DATE_ADD(o.date, INTERVAL 2 HOUR) as date, o.order_status, pm.name as payment, sm.name as shipping, o.order_comment, o.address, o.postal_code, o.city, o.company_name, o.nip, o.company_address, o.company_postal_code, o.company_city, s.quantity, p.price, p.name, o.inpost_address, o.inpost_postal_code, inpost_city FROM orders o ' +
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

        router.get("/get-order-sells", (request, response) => {
            const id = request.query.id;

            const query = 'SELECT p.name, p.price, i.file_path, s.quantity FROM sells s JOIN orders o ON s.order_id = o.id JOIN products p ON s.product_id = p.id JOIN images i ON i.id = p.main_image WHERE o.id = ?';
            const values = [id];

            con.query(query, values, (err, res) => {
                if(res) {
                    response.send({
                        result: res
                    });
                }
                else {
                    response.send({
                        result: 0
                    });
                }
            });
        })
});

module.exports = router;
