const getCEPInfo = require("../index");

getCEPInfo("87035230")
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });
