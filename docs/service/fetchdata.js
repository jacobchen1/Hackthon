class ProductionHistoryPmin extends tucana.minion.Pmin {

    constructor(dataAccessService, minionController, id, uiAdapter, dependencies=[]) {
        super(dataAccessService, minionController, id, uiAdapter, dependencies);
        this.result = {};
        this.dataId = id + Date.now();
        this.created = false;
        this.running = false;
    }


    /**
     * Tiggered to activate the minion
     */
    async activate() {
        var _this = this;
        this.running = true;
        console.log('[ProductionHistoryPmin] Running.')
        // Step 1: create random data for production quantities.
        const years = [2015,2016,2017,2018,2019];
        const data = {};
        for (let year of years) {
            data[year] = [];
            for (let i = 1; i < 13; i++) {
                data[year].push(this.getRandomArbitrary(50, 200));
            }
        }
        this.result = {
            type : "production_quantities",
            metric : "t",
            format : "monthly",
            sourceId : this.dataAccessService.getLocalID(),
            sourceName : this.dataAccessService.getProperties().name,
            data : data
        };
        console.log("this_result",this.result);
        // Updating data, into data stream
        if (this.created) {
            await this.updateData(this.dataId, this.result)
        }
        // Saving data, if it is first data stream
        else {
            await this.saveData(this.dataId, this.result);
            this.created = true;
        }
        // Notifying the next minion
        console.log("fetchdata_result",this.result)
        this.minionController.notify(this, this.result);
    }


    notify(newData) {
        return null;
    }

    terminate() {
        this.running = false;
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}
