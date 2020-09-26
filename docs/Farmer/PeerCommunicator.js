class TestPeerCommunicator extends tucana.minion.Cmin {

    constructor(dataAccessService, minionController, id, uiAdapter, dependencies=[]) {
        super(dataAccessService,minionController,id,uiAdapter,dependencies);
        //this.model = tucana.model;
        //this.dataId = id + Date.now();
        //this.data = [];
        this.running = false;
    }

    async activate() {
        //await this.initialize();
        this.running = true;
        console.log('[SmartServiceConfigurationSenderCmin] Running.')


        /*var prop =[[],"false","false","false","false",["mill"],["mill"]];      
        this.ids = await this.dataAccessService.getFilteredPeerIds(prop);
        console.log("TP1 : ", this.ids)
        this.data = [];
        const broadcastConfig = new this.model.BroadcastConfiguration(this.dataAccessService.getLocalID(),  this.ids,  this.model.BROADCAST_TYPE.UPEER,BROADCAST_CONDITION.ANY,null);
            //console.log(this.ids  ,"test broadcast");
            console.log("TP2:",broadcastConfig);
            this.broadcastDataCreateOperation(this.dataId, "test broadcast from A", broadcastConfig)
                .then(function(res){
                    console.log("TP3:",res);
                });*/
        
    }



    async notify(newData) {
           
            //this.data.push(newData);
        console.log("TP4:",newData);
        const _this = this;
        console.log('[SmartServiceConfigurationSenderCmin_newData]', newData);
        var prop = [[], "false", "false", "false", "false", ["mill"], ["Woda", "Cerea"]];
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
        return null;
            
    }
    
    /**
     * Terminates a running minion by clearing the runtime environment.
     */
    terminate() {
        this.running = false;
        //this.data = [];
    }
}