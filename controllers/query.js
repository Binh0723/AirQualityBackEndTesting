const queryRouter = require("express").Router()
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const { json } = require("body-parser");



queryRouter.get("/allData", async (req,res) =>{
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
queryRouter.post("/sendData" , (req,res)=>{
    console.log("receiving data")
    const token = "uemxS_Jdd4etaqTFp0lf6UKhrWWUF5H5POyzgzPbmop5-GmTXZrnleY5dSLypAa9jCB0ElE3Bp3gCoCq1D1Pmg=="; 
    const org = 'Local org';
    const bucket = 'firstBucket'; 
    const url = 'http://localhost:8086';

    const client = new InfluxDB({ url, token });
    const writeApi = client.getWriteApi(org, bucket, 'ns'); 
    let jsonString = req.body;
    let measurement = jsonString.measurement;
    let tagKey = jsonString.tag_key;
    let tagValue = jsonString.tag_value;
    let field_key = jsonString.field_key;
    let field_value = parseFloat(jsonString.field_value);
    console.log("Received a raw JSON string ", jsonString)
    if (isNaN(field_value)) {
        console.error("Field value is not a valid number.");
        res.status(400).json({ status: "error", message: "Invalid field value received." });
    }
    try{
        const point = new Point(measurement)
        .tag(tagKey, tagValue)
        .floatField(field_key, field_value);
        writeApi.writePoint(point);
        writeApi.close().then(() => {
            console.log('Data written successfully!');
          }).catch(e => {
            console.error(e);
          });

        res.status(200).json({ status: "success", message: "JSON parsed successfully!"});
    }catch(error)
    {
        console.log("Invalid JSON String ", error.message)
        res.status(400).json({ status: "error", message: "Invalid JSON string received." });
    }
})

module.exports = queryRouter;