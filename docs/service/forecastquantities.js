class ProductQuantitiesForecastingTmin extends tucana.minion.Tmin {

    constructor(dataAccessService, minionController, id, uiAdapter, dependencies=[]) {
        super(dataAccessService, minionController, id, uiAdapter, dependencies);
        this.result = {};
        this.dataId = id + Date.now();
        this.created = false;
        this.running = false;
        console.log('[ProductQuantitiesForecastingTmin] Initialized.')
    }

    /**
     * Tiggered to activate the minion
     */
    async activate() {
        this.running = true;
        console.log('[ProductQuantitiesForecastingTmin] Running.')
    }

    async notify(newData) {
        console.log('[ProductQuantitiesForecastingTmin]', newData);
        const _this = this;
        //let average = (array) => array.reduce((a, b) => a + b) / array.length;
        //console.log(average([1,2,3,4,5]));
        console.log(typeof  newData)
        console.log(Object.keys(newData.data));
        console.log(Object.values(newData.data));
        const  years = Object.keys(newData.data);
        console.log("years",years)
        let df = new dfd.DataFrame(newData.data)
        //df.print()
        console.log(df.index);
        console.log(df.columns);
        //console.log("2019,",df['2019']);
        //console.log("values",df.values);
        //df.mean(0).print() //defaults to column axis
        //console.log("mean:json",df.mean(0).tojson);

        let json = await df.mean(0).to_json();
        let myJson = JSON.parse(json)
        console.log("TP1");
        console.log(typeof myJson); 


        console.log("obj json",myJson);
        console.log("obj value",Object.values(myJson));

        //const _this = this;
        //const data = newData.data;

        /*
        const means = {
            1 : [],
            2 : [],
            3 : [],
            4 : [],
            5 : [],
            6 : [],
            7 : [],
            8 : [],
            9 : [],
            10 : [],
            11 : [],
            12 : []
        }
        for (let year of Object.keys(data)) {
            for (let i = 1; i < 13; i++) {
                means[i].push(data[year][i-1]);
            }
        }
        for (let i = 1; i < 13; i++) {
            means[i] = means[i].reduce((a,b) => a + b, 0) / means[i].length
        }
        */

        this.result = {
            type : "quantity_forecast",
            metric : "t",
            format : "monthly",
            sourceId : this.dataAccessService.getLocalID(),
            sourceName : this.dataAccessService.getProperties().name,
            data : myJson
        };
        // Updating data, into data stream
        if (this.created) {
            this.updateData(this.dataId, this.result)
        }
        // Saving data, if it is first data stream
        else {
            this.saveData(this.dataId, this.result)
                .then(() => {
                    _this.created = true;
                });
        }
        // Notifying the next minion
        //this.minionController.notify(this, this.result);
        console.log('[ProductQuantitiesForecastingTmin]', this.result);
    }

    terminate() {
        this.running = false;
    }
}