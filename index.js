const http = require("http");
const cheerio = require("cheerio");

module.exports = getCEPInfo = (cep) => {
    return new Promise((resolve, reject) => {
        const CEP_BEAUTIFUL = cep.replace(/[^\w\s]/gi, "");
        const optionsRedirect = {
            hostname: "brasilcep.com.br",
            path: `/pesquisa.php?consulta=${CEP_BEAUTIFUL}`,
            method: "GET",
        };

        const requestRedirect = http.request(optionsRedirect, (response) => {
            const optionsCEPInfo = {
                hostname: "brasilcep.com.br",
                path: response.headers.location.slice(
                    response.headers.location.indexOf("br/") + 2
                ),
                method: "GET",
            };

            const requestCEPInfo = http.request(
                optionsCEPInfo,
                (responseCEPInfo) => {
                    let data = "";

                    responseCEPInfo.on("data", (chunk) => {
                        data += chunk;
                    });

                    responseCEPInfo.on("end", () => {
                        const $ = cheerio.load(data);

                        const address = $(
                            "body > div.container > div:nth-child(2) > div.ac_box > div.ac_box_cont > ul > li:nth-child(1)"
                        ).text();
                        const neighborhood = $(
                            "body > div.container > div:nth-child(2) > div.ac_box > div.ac_box_cont > ul > li:nth-child(2)"
                        ).text();
                        const city = $(
                            "body > div.container > div:nth-child(2) > div.ac_box > div.ac_box_cont > ul > li:nth-child(3)"
                        ).text();
                        const state = $(
                            "body > div.container > div:nth-child(2) > div.ac_box > div.ac_box_cont > ul > li:nth-child(4)"
                        ).text();

                        const CEPINFO = {
                            address: address.slice(address.indexOf(":") + 2),
                            neighborhood: neighborhood.slice(
                                neighborhood.indexOf(":") + 2
                            ),
                            city: city.slice(city.indexOf(":") + 2),
                            state: state.slice(state.indexOf(":") + 2),
                        };

                        resolve(CEPINFO);
                    });
                }
            );

            requestCEPInfo.on("error", (error) => {
                reject(error);
            });

            requestCEPInfo.end();
        });

        requestRedirect.on("error", (error) => {
            reject(error);
        });

        requestRedirect.end();
    });
};
