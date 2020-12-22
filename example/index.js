const getCEPInfo = require("brasilcep-api");

getCEPInfo("78550000")
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });
