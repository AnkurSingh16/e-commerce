'use strict';

const Hapi = require('@hapi/hapi');

const productDetails = require('./resources/product-details.json');

const init = async () => {

    const server = Hapi.server({
        port: 8001,
        host: 'localhost',
        routes: {
          cors: {
            origin: ['*'] // an array of origins or 'ignore'           
          }
        }
    });

    server.route({
        method: 'GET',
        path:'/product-details',
        handler: (req, resp) => {

          return productDetails ;
        }

    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();