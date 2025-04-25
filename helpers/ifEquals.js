
const handlebars = require('handlebars');

// Helper personalizado
handlebars.registerHelper('ifEqual', function (value1, value2, options){    
    return (value1 === value2) ? options.fn(this) : options.inverse(this);
});

module.exports = handlebars;