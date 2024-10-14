# AirQualityBackEndTesting

How to setup InfluxDB

1) Follow the steps to install InfluxDB(https://docs.influxdata.com/influxdb/v2/install/?t=Windows)

2) After installing influxDB. Checking if influxDB server is available.

    Open terminal and type "influxd". If there is error, remember to include the bin directory of influxDB in the enviroment variable.

    Type "influxd" again to see if the server is running. If the server is running then it should appear in the bottom the port number: 8086(default)

3) Install influx CLI

    Follow the steps here to install influx CLI (https://docs.influxdata.com/influxdb/v2/tools/influx-cli/?t=Windows)

    Test if influx cli is installed by trying "influx ping"


4) How to run a server
    After pulling the code, remember to do "npm i" to intall all the missing packages

    After that in package.json file, change the script to this:
        "scripts": {
            "start": "node backend/index.js",
            "dev": "nodemon backend/index.js"
        },

    Run the server by doing "npm run dev"

