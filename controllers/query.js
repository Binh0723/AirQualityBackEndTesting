const queryRouter = require("express").Router()
const { InfluxDB, Point } = require('@influxdata/influxdb-client');



queryRouter.get("/", async (req,res) =>{
    console.log("in getting data");
    const url = 'http://localhost:8086';
    const token = "uemxS_Jdd4etaqTFp0lf6UKhrWWUF5H5POyzgzPbmop5-GmTXZrnleY5dSLypAa9jCB0ElE3Bp3gCoCq1D1Pmg==";  // Replace with your actual token
    const org = 'Local org';

    const queryAPI = new InfluxDB({url, token}).getQueryApi(org);

    const query = `
                    from(bucket: "firstBucket")
                    |> range(start: 0)`;

    let s = [];
    const myQuery = async ()=>{
        for await (const {values,tableMeta} of queryAPI.iterateRows(query))
        {
            const o = tableMeta.toObject(values);
            console.log(`time is ${o._time}, value is ${o._value}, field is ${o._field}, measurement is ${o._measurement} and tag_key is ${o.tag_key}`);
            s.push(o);
        }
    }
    await myQuery();
    console.log(s);
    res.json(s);
})
module.exports = queryRouter;