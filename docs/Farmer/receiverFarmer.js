//const { json } = require("mathjs");

class receiverFarmer extends tucana.minion.Pmin {
    

    /**
    * Predefining variables in constructor
    * Saves the result of Tmin in IndexedDB
    * @var {Array} data: Data stream
    * @var {boolean} created: To check existence 
    * @var {Array} result: 2D Array of timestamp, accelerationX, accelerationY, accelerationZ 
    */
    constructor(dataAccessService, minionController, id, dependencies=[]) {
        super(dataAccessService, minionController, id, dependencies);
        this.data = [];
        this.dataId = id + Date.now();
        this.created = false;
	    this.result = {};
    }

	
    /**
    * Tiggered to activate the minion   
    */
    async activate() {
        //await this.initialize();
        //var _this = this;
        this.running = true;
        //this.accelerator.start();
        //this.temp =""
        // Replace ./data.json with your JSON feed
        //console.log('[FetchSmartServiceConfigurationPmin] Running.');
        

        /**
        * Setting time interval for data collection as per required window   
        */
	
    }

    async notify(newData) {
        console.log("receiverFarmer:",newData);
        console.log("receiverFarmer:",newData.id);
        console.log("receiverFarmer:",newData.object.data);
        console.log("receiverFarmer:",newData.object.sourceName);
        /*
        this.result = {
            type : "production_quantities",
            metric : "t",
            format : "monthly",
            sourceId : this.dataAccessService.getLocalID(),
            sourceName : newData.object.sourceName,
            data : newData.object.data
        };


        // Updating data, into data stream
        if (this.created) {
            this.updateData(this.dataId, this.result)
        }
        // Saving data, if it is first data stream
        else {
            this.saveData(this.dataId, this.result);
            this.created = true;
        }
        */
        this.minionController.notify(this, newData);


        /*
        const ids = await _this.dataAccessService.getFilteredPeerIds(prop);
        if (typeof ids == "string") {
            return null;
        } else {
            console.log('[SmartServiceConfigurationSenderCmin_ids]', ids);
            const broadcastConfig = new tucana.model.BroadcastConfiguration(this.dataAccessService.getLocalID(), ids, tucana.model.BROADCAST_TYPE.UPEER, tucana.model.BROADCAST_CONDITION.ANY, null);
            const smartServiceConfigurationItem = tucana.model.SmartServiceConfigurationItem.fromJSON(newData);
            console.log("smartServiceConfigurationItem:",smartServiceConfigurationItem)
            const crudOperation = new tucana.model.CRUDOperation(tucana.model.CRUD_OPERATION_TYPE.CREATE, tucana.model.OBJECT_TYPE.SMART_SERVICE, smartServiceConfigurationItem, null, broadcastConfig);
            const res = await this.dataAccessService.requestCRUDOperation(crudOperation);
            console.log('[SmartServiceConfigurationSenderCmin_res]', res);
        }
        return null;*/

        
    }

    terminate() {
        //clearInterval(this.loop);
        this.running = false;
    }
}
