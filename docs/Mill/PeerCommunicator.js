class TestPeerCommunicator extends tucana.minion.Cmin {

    constructor(dataAccessService, minionController, id, uiAdapter, dependencies=[]) {
        super(dataAccessService,minionController,id,uiAdapter,dependencies);
        this.model = tucana.model;
        this.dataId = id + Date.now();
        this.data = [];
    }

    async activate() {
        //await this.initialize();
        this.running = true;
        
        /*const _this = this ;
        var prop =[[],"false","false","false","false",["farmer"],["farmer"]];
        setTimeout(async function(){ _this.ids = await _this.dataAccessService.getFilteredPeerIds(prop)
            const broadcastConfig = new _this.model.BroadcastConfiguration(_this.dataAccessService.getLocalID(),  _this.ids,  _this.model.BROADCAST_TYPE.UPEER,BROADCAST_CONDITION.ANY,null);
            
            _this.broadcastDataCreateOperation(_this.dataId, "test broadcast From B", broadcastConfig)
                .then(function(res){
                    console.log(res);
                });    
            ; }, 10000);*/  
        
    }


    async notify(newData) {
        //await this.initialize();
        console.log("mill_cmin:", newData  );
        console.log("mill_cmin:data", newData.result.object.data[0]  );
        console.log("mill_cmin:tag", newData.result.object.sourceName );

        //let df = new dfd.Series({newData.result.object.sourceName:newData.result.object.data[0]});
        let data = {};
        data[newData.result.object.sourceName] = newData.result.object.data[0]
        let indexData = nj.arange(1, 13);
        let df = new dfd.DataFrame(data,{index: indexData.selection.data});
        var layout = {
            title: 'Smart  Service Mill History Data (' + newData.result.object.sourceName +')',
            xaxis: {
                title: 'Month',
            },
            width: 600,
            height: 400,
            yaxis: {
                title: 'Amount in ton',
            }
        }
        df.plot("plot_div").line({layout:layout});


        const _this = this;
        var prop =[[],"false","false","false","false",["farmer"],["Bob"]];
        _this.ids = await _this.dataAccessService.getFilteredPeerIds(prop);
        /*setTimeout(async function(){ _this.ids = await _this.dataAccessService.getFilteredPeerIds(prop)
            const broadcastConfig = new _this.model.BroadcastConfiguration(_this.dataAccessService.getLocalID(),  _this.ids, tucana.model.BROADCAST_TYPE.UPEER,tucana.model.BROADCAST_CONDITION.ANY,null);
            //console.log("_this.dataId:",_this.dataId);
            //console.log("newData",newData.result.object.sourceName);
            //console.log("newData",_this.dataId+"_"+newData.result.object.sourceName);
           // _this.dataId = _this.dataId+"_"+newData.result.object.sourceName;
            //console.log("_this.dataId_new:",_this.dataId);   
            const crudOperation = new tucana.model.CRUDOperation(tucana.model.CRUD_OPERATION_TYPE.CREATE, tucana.model.OBJECT_TYPE.data, newData, null, broadcastConfig);
            const res =  this.dataAccessService.requestCRUDOperation(crudOperation);
            console.log('[SmartServiceConfigurationSenderCmin_res_farmer]', res);
            _this.broadcastDataCreateOperation(_this.dataId,newData, broadcastConfig)
                .then(function(res){
                    console.log("Cmin Mill res",res);
                });    
            }, 10000);*/

            const broadcastConfig = new tucana.model.BroadcastConfiguration(this.dataAccessService.getLocalID(), _this.ids, tucana.model.BROADCAST_TYPE.UPEER, tucana.model.BROADCAST_CONDITION.ANY, null);
            const DomainItem = tucana.model.DomainItem.fromJSON(newData.result);
            console.log("newData_result",newData.result);
            console.log("DomainItem",DomainItem)
            const crudOperation = new tucana.model.CRUDOperation(tucana.model.CRUD_OPERATION_TYPE.CREATE, tucana.model.OBJECT_TYPE.DATA, DomainItem /*newData.result.object.data*/, null, broadcastConfig);//.result.object.data
            const res = await this.dataAccessService.requestCRUDOperation(crudOperation);
            console.log('[SmartServiceConfigurationSenderCmin_res]', res);
    }
    /**
     * Terminates a running minion by clearing the runtime environment.
     */
    terminate() {
        this.running = false;
        //this. data = [];
    }


}