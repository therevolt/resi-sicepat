const fetch = require('node-fetch');
const FormData = require('form-data');
const cheerio = require('cheerio');
const chalk = require('chalk');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Silahkan Input Resi => ', resi => {
const form = new FormData();
    form.append('awb[]', `${resi}`);
    //form.append('awb[]', '000366912345');



const options = {
    method: 'POST',
    body: form,
    headers: form.getHeaders()
    }



const ayo = () => new Promise((resolve, reject) => {
    fetch('http://sicepat.com/checkAwb/doSearch', options)
        .then(res => res.text())
        .then(result => {
            const $ = cheerio.load(result);
            var abis = $("#awb-list > tbody > tr.res-detail > td > div.row > div.col-md-5.col-md-offset-2.col-sm-6 > table > tbody > tr").length
            console.log("\nNama Penerima : " + $("#awb-list > tbody > tr.res-item > td:nth-child(5)").text())
            console.log("\nTanggal Pengiriman : " + $("#awb-list > tbody > tr.res-detail > td > div.row > div:nth-child(1) > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(1)").text())
            console.log("\nLAYANAN : " + $("#awb-list > tbody > tr.res-item > td:nth-child(2)").text().slice(12, 40))
            var stats = $("#awb-list > tbody > tr.res-item > td:nth-child(8)").text()
            if (stats == "DELIVERED") {
                console.log(chalk.green("\nStatus Pengiriman : " + stats))
            } else {
                console.log(chalk.yellow("\nStatus Pengiriman : " + stats))
            }
            console.log("\nHistori Pengiriman :\n")
            for (var i = 2; i <= abis; i++) {
                //const lacak = $(".res-detail").map((i, Element) => ({
                //})).get()
                //const lacak = $('td').text();
                //resolve(lacak);
                console.log($(`#awb-list > tbody > tr.res-detail > td > div.row > div.col-md-5.col-md-offset-2.col-sm-6 > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text() + " || " + $(`#awb-list > tbody > tr.res-detail > td > div.row > div.col-md-5.col-md-offset-2.col-sm-6 > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text());
            }
        })
        .catch(err => reject(err))
});

(async () => {
    const ini = await ayo();
    console.log(ini);
    })();
    readline.close();
});
    //.then(text => console.log(text));