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
        //this.data = [];
        //this.dataId = id + Date.now();
        //this.created = false;
        //this.result = null;
        this.running = false;
    }

	
    /**
    * Tiggered to activate the minion   
    */
    async activate() {
        var  _this = this;
        this.running = true;
        console.log("Pmin Mill");

    
       
    
    }

    notify(newData) {
        var _this = this;
        const id = "ProductionForcastingService";
        const databaseQuery = new tucana.model.DatabaseQuery(tucana.model.QUERY_TYPE.STATIC, id, []);
        console.log("mill pmin to cmin: 1 ",databaseQuery);

        const crudOperation = new tucana.model.CRUDOperation(tucana.model.CRUD_OPERATION_TYPE.READ, tucana.model.OBJECT_TYPE.SMART_SERVICE, null, databaseQuery, null);
        console.log("crudOperation",crudOperation);
        setTimeout(function(){ newData = _this.dataAccessService.requestCRUDOperation(crudOperation)},100);
        var response = newData;
        console.log("mill response",response);
        //const ssc = response.response.res;
        //console.log("mill pmin to cmin: ",ssc);
        //console.log("farmer pmin to cmin: ", typeof ssc);
        //console.log("ssc-id",this, ssc.id);
        
        setTimeout(function (){ _this.minionController.notify(_this, response)},1000);
        
        return  null;

    }

    terminate() {
        //clearInterval(this.loop);
        this.running = false;
    }
}
