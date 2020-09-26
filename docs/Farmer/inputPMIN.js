//const { json } = require("mathjs");

class linearAcceleration extends tucana.minion.Pmin {
    

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
	    this.result = null;
    }

	
    /**
    * Tiggered to activate the minion   
    */
    async activate() {
        //await this.initialize();
        var _this = this;
        this.running = true;
        //this.accelerator.start();
        //this.temp =""
        // Replace ./data.json with your JSON feed
        //console.log('[FetchSmartServiceConfigurationPmin] Running.');
        const id = "ProductionForcastingService";
        const databaseQuery = new tucana.model.DatabaseQuery(tucana.model.QUERY_TYPE.STATIC, id, []);
        console.log("farmer pmin to cmin: 1 ",databaseQuery); //query  the data

        const crudOperation = new tucana.model.CRUDOperation(tucana.model.CRUD_OPERATION_TYPE.READ, tucana.model.OBJECT_TYPE.SMART_SERVICE, null, databaseQuery, null);
        console.log("crudOperation",crudOperation); // read the data
        const response = await this.dataAccessService.requestCRUDOperation(crudOperation); // get the request feedback
        console.log("response",response);
        const ssc = response.response.res;
        console.log("farmer pmin to cmin: ",ssc);
        //console.log("farmer pmin to cmin: ", typeof ssc);
        this.minionController.notify(this, ssc);

        /**
        * Setting time interval for data collection as per required window   
        */
	
    }

    notify(newData) {
        if (this.created) {
            console.log("test");
        }
        /*
        if(this.temp != newData.object || this.temp ==""){
            alert(newData.object)
            //alert(newData.id)
            console.log("TP Pmin Farmer:",newData);
            this.temp=newData.object

        }*/
    }

    terminate() {
        clearInterval(this.loop);
        this.running = false;
    }
}
