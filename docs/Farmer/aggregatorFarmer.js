class AggregatorFarmer extends tucana.minion.Tmin {

    constructor(dataAccessService, minionController, id, uiAdapter, dependencies=[]) {
        super(dataAccessService, minionController, id, uiAdapter, dependencies);
        this.result = {};
        //this.dataId = id + Date.now();
        //this.created = false;
        this.running = true;
        console.log('[AggregatorFarmer] Initialized.')
    }

    /**
     * Tiggered to activate the minion
     */
    async activate() {
        //this.running = true;
        console.log('[AggregatorFarmer] Running.')
    }

    async notify(newData) {
        const _this = this;
        function Sleep(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
           }
        await Sleep(1000); // Pausiert die Funktion für 3 Sekunden

        let ids = await _this.dataAccessService.getDomainItemIds();
       
        console.log("ids",ids);
        var data = {};
        //var dataArray = {};
        var nameArray = [];
        //var targetItem = await ids.filter(item=>item.id.toLowerCase().includes(idTag));
        for (let id of ids) {
            console.log("id",id);
            const databaseQuery = new tucana.model.DatabaseQuery(tucana.model.QUERY_TYPE.STATIC, id.id, []);
            console.log("TP: 1 databaseQuery ",databaseQuery);

            const crudOperation = new tucana.model.CRUDOperation(tucana.model.CRUD_OPERATION_TYPE.READ, tucana.model.OBJECT_TYPE.data, null, databaseQuery, null);
            const response = await _this.dataAccessService.requestCRUDOperation(crudOperation);
            console.log("TP: 2 response ",response);
            console.log("data",response.response.res.object.data);
            let name = response.response.res.object.sourceName;
            data[name] = response.response.res.object.data;
            //only for test
            //data["test"] = response.response.res.object.data;

            //nameArray =  nameArray.concat(response.response.res.object.sourceName)
            //console.log("dataArray",dataArray);
            console.log("nameArray",data);

            // code block to be executed
          }        
        //const databaseQuery = new tucana.model.DatabaseQuery(tucana.model.QUERY_TYPE.STATIC, targetItem[0].id, []);
       

        this.result = {
            type : "quantity_forecast",
            metric : "t",
            format : "monthly",
            sourceId : this.dataAccessService.getLocalID(),
            sourceName : this.dataAccessService.getProperties().name,
            data : data
        };

        console.log('[AggregatorFarmer]', this.result);
        this.minionController.notify(this, this.result);
    }

    terminate() {
        this.running = false;
    }
}