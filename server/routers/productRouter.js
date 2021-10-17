const express = require("express");
const router = express.Router();
const multer = require("multer");
const got = require("got");
const con = require("../databaseConnection");
const path = require("path");

con.connect(err => {
   /* GET NEW ID */
   router.get("/last-product", (request, response) => {
      const query = 'SELECT id FROM products ORDER BY date DESC LIMIT 1';
      con.query(query, (err, res) => {
         if(res[0]) {
            response.send({
               result: res[0].id
            });
         }
         else {
            response.send({
               result: 0
            });
         }
      })
   });

   /* ADD PRODUCT */
   router.post("/add-product", (request, response) => {
      let filenames = [];
      let categories = [];

      /* Modify IMAGES table */
      const storage = multer.diskStorage({
         destination: "media/products/",
         filename: function(req, file, cb){
            const fName = file.fieldname + Date.now() + path.extname(file.originalname);
            filenames.push(fName);
            cb(null, fName);
         }
      });

      const upload = multer({
         storage: storage
      }).fields([{ name: 'gallery', maxCount: 10 }]);

      upload(request, response, (err, res) => {
         if (err) throw err;

         /* Prepare */
         let { id, mainImageIndex, name, subtitle, price, discount, shortDescription, details, recommendation, hidden, stock, displayOrder } = request.body;
         hidden = hidden === "hidden";
         recommendation = recommendation === "true";
         filenames.reverse();

         /* Get categories */
         Object.entries(request.body).forEach(item => {
            if(item[0].split("-")[0] === 'category') {
               if(item[1] === 'true') {
                  categories.push(parseInt(item[0].split("-")[1]));
               }
            }
         });

         if(!categories.length) categories.push(0);

         /* Set main image as the last one in filenames */
         let tmp = filenames[filenames.length-1];
         filenames[filenames.length-1] = filenames[mainImageIndex];
         filenames[mainImageIndex] = tmp;

         /* 1 - ADD PRODUCT TO PRODUCTS TABLE */
         const values = [id, name, subtitle, price, discount, shortDescription, details, null, recommendation, hidden, stock, displayOrder];
         const query = 'INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?)';
         con.query(query, values, (err, res) => {
            if(res) {
               /* 2nd - ADD CATEGORIES */
               const productId = res.insertId;
               categories.forEach((item, index, array) => {
                  if(item) {
                     const values = [productId, item];
                     const query = 'INSERT INTO product_categories VALUES (NULL, ?, ?)';
                     con.query(query, values, (err, res) => {
                        if(index === array.length-1) {
                           /* 3rd - ADD IMAGES TO IMAGES TABLE */
                           filenames.forEach((item, index, array) => {
                              const values = ["products/" + item, productId];
                              const query = 'INSERT INTO images VALUES (NULL, ?, ?)';
                              console.log(item);

                              con.query(query, values, (err, res) => {
                                 if(index === array.length-1) {
                                    /* 4th - MODIFY MAIN_IMAGE COLUMN IN PRODUCTS TABLE */
                                    if(res) {
                                       console.log(res.insertId);
                                       const mainImageId = res.insertId;
                                       const values = [mainImageId, productId];
                                       const query = 'UPDATE products SET main_image = ? WHERE id = ?';
                                       con.query(query, values, (err, res) => {
                                          if(res) response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=1");
                                          else response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=0");
                                       });
                                    }
                                    else {
                                       response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=0");
                                    }
                                 }
                              })
                           });
                        }
                     });
                  }
                  else {
                     /* 4th - ADD IMAGES TO IMAGES TABLE */
                     filenames.forEach((item, index, array) => {
                        const values = ["products/" + item, productId];
                        const query = 'INSERT INTO images VALUES (NULL, ?, ?)';
                        console.log(item);

                        con.query(query, values, (err, res) => {
                           if(index === array.length-1) {
                              /* 4 - MODIFY MAIN_IMAGE COLUMN IN PRODUCTS TABLE */
                              if(res) {
                                 console.log(res.insertId);
                                 const mainImageId = res.insertId;
                                 const values = [mainImageId, productId];
                                 const query = 'UPDATE products SET main_image = ? WHERE id = ?';
                                 con.query(query, values, (err, res) => {
                                    if(res) response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=1");
                                    else response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=0");
                                 });
                              }
                              else {
                                 response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=0");
                              }
                           }
                        })
                     });
                  }
               });
            }
            else {
               response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=0");
            }
         });
      });
   });

   /* UPDATE PRODUCT */
   router.post("/update-product", (request, response) => {
      let filenames = [];
      let categories = [];

      /* Modify IMAGES table */
      const storage = multer.diskStorage({
         destination: "media/products/",
         filename: function(req, file, cb){
            const fName = file.fieldname + Date.now() + path.extname(file.originalname);
            filenames.push(fName);
            cb(null, fName);
         }
      });

      const upload = multer({
         storage: storage
      }).fields([{ name: 'gallery', maxCount: 10 }]);

      upload(request, response, (err, res) => {
         if (err) throw err;

         /* Prepare */
         let { id, mainImageId, name, subtitle, price, discount, shortDescription, details, recommendation, hidden, stock, displayOrder } = request.body;
         hidden = hidden === "hidden";
         recommendation = recommendation === "true";
         filenames.reverse();

         /* Get categories */
         Object.entries(request.body).forEach(item => {
            if(item[0].split("-")[0] === 'category') {
               if(item[1] === 'true') {
                  categories.push(parseInt(item[0].split("-")[1]));
               }
            }
         });

         if(!categories.length) categories.push(0);

         /* 1 - ADD PRODUCT TO PRODUCTS TABLE */
         const values = [name, subtitle, price, discount, shortDescription, details, recommendation, hidden, stock, displayOrder, id];
         const query = 'UPDATE products SET name = ?, subtitle = ?, price = ?, discount = ?, description = ?, details = ?, recommendation = ?, hidden = ?, stock = ?, display_order = ? WHERE id = ?';
         con.query(query, values, (err, res) => {
            if(res) {
               /* 2 - ADD CATEGORIES */
               categories.forEach((item, index, array) => {
                  const valuesDelete = [id];
                  const queryDelete = 'DELETE FROM product_categories WHERE product_id = ?';
                  con.query(queryDelete, valuesDelete, (err, res) => {
                     if(item) {
                        /* THERE ARE CATEGORIES */
                        const values = [id, item];
                        const query = 'INSERT INTO product_categories VALUES (NULL, ?, ?)';
                        con.query(query, values);
                        if(index === array.length-1) {
                           /* 3 - ADD IMAGES TO IMAGES TABLE */
                           if(filenames.length) {
                              con.query('DELETE FROM images WHERE product_id = ?', [id]);

                              filenames.forEach((item, index, array) => {
                                 const values = ["products/" + item, id];
                                 const query = 'INSERT INTO images VALUES (NULL, ?, ?)';

                                 con.query(query, values, (err, res) => {
                                    if(index === array.length-1) {
                                       /* 4 - MODIFY MAIN_IMAGE COLUMN IN PRODUCTS TABLE */
                                       if(res) {
                                          console.log("I'm ready to modify mainImageId");
                                          const mainImageId = res.insertId;
                                          const values = [mainImageId, id];
                                          const query = 'UPDATE products SET main_image = ? WHERE id = ?';
                                          con.query(query, values, (err, res) => {
                                             if(res) response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=1");
                                             else response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=0");
                                          });
                                       }
                                       else {
                                          response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=0");
                                       }
                                    }
                                 })
                              });
                           }
                           else {
                              /* 4 - MODIFY MAIN_IMAGE COLUMN IN PRODUCTS TABLE */
                              const values = [mainImageId, id];
                              const query = 'UPDATE products SET main_image = ? WHERE id = ?';
                              con.query(query, values, (err, res) => {
                                 if(res) response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=1");
                                 else response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=1");
                              });
                           }
                        }
                     }
                     else {
                        /* THERE IS NO ANY CATEGORY */
                        /* 3rd - ADD IMAGES TO IMAGES TABLE */
                        if(filenames.length) {
                           console.log("no category, yes images");
                           console.log(id);
                           con.query('DELETE FROM images WHERE product_id = ?', [id]);

                           filenames.forEach((item, index, array) => {
                              const values = ["products/" + item, id];
                              const query = 'INSERT INTO images VALUES (NULL, ?, ?)';

                              con.query(query, values, (err, res) => {
                                 if(index === array.length-1) {
                                    /* 4 - MODIFY MAIN_IMAGE COLUMN IN PRODUCTS TABLE */
                                    if(res) {
                                       const mainImageId = res.insertId;
                                       const values = [mainImageId, id];
                                       const query = 'UPDATE products SET main_image = ? WHERE id = ?';
                                       con.query(query, values, (err, res) => {
                                          if(res) response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=1");
                                          else response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=1");
                                       });
                                    }
                                    else {
                                       response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=0");
                                    }
                                 }
                              })
                           });
                        }
                        else {
                           console.log("no category. no images");
                           const values = [mainImageId, id];
                           const query = 'UPDATE products SET main_image = ? WHERE id = ?';
                           con.query(query, values, (err, res) => {
                              if(res) response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=1");
                              else response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=0");
                           });
                        }
                     }
                  });
               });
            }
            else {
               response.redirect("https://aloes.skylo-test3.pl/panel/dodaj-produkt?add=0");
            }
         });
      });

   });

   /* GET RECOMMENDATIONS */
   router.get('/get-recommendations', (request, response) => {
      const query = 'SELECT *, p.id as product_id FROM products p JOIN images i ON p.main_image = i.id WHERE recommendation = 1 AND stock > 0 ORDER BY p.display_order LIMIT 5';
      con.query(query, (err, res) => {
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
      })
   });

   /* GET DISCOUNTS */
   router.get('/get-discounts', (request, response) => {
      const query = 'SELECT *, p.id as product_id FROM products p JOIN images i ON p.main_image = i.id WHERE discount IS NOT NULL and discount != 0 AND stock > 0 ORDER BY p.display_order LIMIT 5';
      con.query(query, (err, res) => {
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
      })
   });

   /* REMOVE PRODUCT */
   router.post("/delete", (request, response) => {
      const { id } = request.body;
      const values = [id];

      const query = 'DELETE FROM products WHERE id = ?';
      con.query(query, values, (err, res) => {
         let result = 0;
         if(res) result = 1;
         response.send({
            result
         });
      });
   });

   /* GET ALL PRODUCTS */
   router.get("/get-all-products", (request, response) => {
      const query = 'SELECT p.id as product_id, p.name, p.subtitle, i.file_path as image, p.price, p.discount, p.date, p.stock, COALESCE(c.name, "Brak") as category_name, p.hidden FROM products p ' +
      'LEFT OUTER JOIN product_categories pc ON pc.product_id = p.id ' +
          'LEFT OUTER JOIN categories c ON c.id = pc.category_id ' +
      'LEFT OUTER JOIN images i ON p.main_image = i.id GROUP BY p.id ORDER BY p.display_order DESC';

      con.query(query, (err, res) => {
         if(res) {
            response.send({
               result: res
            });
         }
         else {
            response.send({
               result: null
            });
         }
      });
   });

   router.get("/get-all-available-products", (request, response) => {
      const query = 'SELECT p.id as product_id, p.name, p.subtitle, i.file_path as image, p.price, p.discount, p.date, p.stock, COALESCE(c.name, "Brak") as category_name, p.hidden FROM products p ' +
          'LEFT OUTER JOIN product_categories pc ON pc.product_id = p.id ' +
          'LEFT OUTER JOIN categories c ON c.id = pc.category_id ' +
          'LEFT OUTER JOIN images i ON p.main_image = i.id WHERE p.stock > 0 GROUP BY p.id ORDER BY p.display_order DESC';

      con.query(query, (err, res) => {
         if(res) {
            response.send({
               result: res
            });
         }
         else {
            response.send({
               result: null
            });
         }
      });
   });

   /* GET SINGLE PRODUCT BY ID */
   router.post("/get-product-by-id", (request, response) => {
      const { id } = request.body;
      const values = [id];
      const query = 'SELECT name FROM products p WHERE id = ?';
      con.query(query, values, (err, res) => {
         if(res[0]) {
            response.send({
               result: res[0].name
            });
         }
         else {
            response.send({
               result: 0
            });
         }
      })
   });

   /* GET SINGLE PRODUCT BY NAME */
   router.post("/get-product-by-name", (request, response) => {
      const { name } = request.body;
      const values = [name];
      /* Query uses custom MySQL function - SPLIT_STR */
      const query = 'SELECT p.id as id, p.name, p.subtitle, p.price, p.display_order, p.stock, ' +
          'p.description, p.details, p.discount, DATE_ADD(p.date, INTERVAL 2 HOUR), i.file_path as file_path ' +
          'FROM products p LEFT OUTER JOIN images i ON i.id = p.main_image ' +
          'WHERE REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(LOWER(SPLIT_STR(p.name, "/", 1)), "ł", "l"), "ę", "e"), "ą", "a"), "ć", "c"), "ń", "n"), "ó", "o"), "ś", "s"), "ź", "z"), "ż", "z") = ?';
      con.query(query, values, (err, res) => {
         response.send({
            result: res
         });
      });
   });

   /* GET IMAGE BY ID */
   router.post("/get-image", (request, response) => {
      const { id } = request.body;
      const values = [id];
      const query = 'SELECT file_path FROM images WHERE id = ?';
      con.query(query, values, (err, res) => {
         if(res[0]) {
            response.send({
               result: res[0]
            });
         }
         else {
            response.send({
               result: 0
            });
         }
      });
   });

   /* GET PRODUCT CATEGORIES */
   router.post("/get-product-categories", (request, response) => {
      const { id } = request.body;
      const values = [id];
      const query = 'SELECT * FROM product_categories pc JOIN categories c ON pc.category_id = c.id WHERE pc.product_id = ?';
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
   });

   /* GET SINGLE PRODUCT DETAILS (CLIENT) */
   router.post("/single-product", (request, response) => {
      const { id } = request.body;
      const values = [id];
      const query = 'SELECT p.id as id, p.name, p.subtitle, p.price, p.display_order, p.stock, ' +
          'p.description, p.discount, p.stock, p.details, p.date, p.recommendation, p.hidden, ' +
          'i.file_path as file_path ' +
          'FROM products p ' +
          'LEFT OUTER JOIN images i ON i.id = p.main_image ' +
          'WHERE p.id = ?';
      con.query(query, values, (err, res) => {
         if(res) {
            response.send({
               result: res
            });
         }
         else {
            response.send({
               result: null
            });
         }
      });
   });

   /* GET PRODUCT DETAILS */
   router.post("/product-data", (request, response) => {
      const { id } = request.body;
      const values = [id];
      const query = 'SELECT * FROM products WHERE id = ?';
      con.query(query, values, (err, res) => {
         if(res) {
            response.send({
               result: res
            });
         }
         else {
            response.send({
               result: null
            });
         }
      });
   });

   /* GET PRODUCTS BY CATEGORY */
   router.post("/get-products-by-category", (request, response) => {
      const { id } = request.body;
      const values = [id];
      const query = 'SELECT *, p.id as product_id, i.file_path as image, p.display_order FROM products p JOIN images i ON p.main_image = i.id JOIN product_categories pc ON pc.product_id = p.id WHERE pc.category_id = ? AND p.stock > 0 ORDER BY p.display_order';
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
   });

   /* Get product gallery */
   router.post("/get-gallery", (request, response) => {
      const { id } = request.body;
      const values = [id];
      const query = 'SELECT * FROM images WHERE product_id = ?';
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
   });

   /* GET PRODUCTS BY CATEGORIES LIST */
   router.post("/get-products-by-categories", (request, response) => {

   });
});

module.exports = router;
