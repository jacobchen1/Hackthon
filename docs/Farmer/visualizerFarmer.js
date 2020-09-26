class VisualizerFarmer extends tucana.minion.Tmin {

    constructor(dataAccessService, minionController, id, uiAdapter, dependencies=[]) {
        super(dataAccessService,minionController,id,uiAdapter,dependencies);
        this.running = true;
    }

    async activate() {
        //await this.initialize();
        //this.running = true;
        //this.uiAdapter.showBarChart(this.instanceId,["My number"],{});
        console.log("Cmin ist runnning");
        
    }


    async notify(newData) {
        console.log("visualizer Farmer:", newData);
        console.log("visualizer Farmer data:", newData.data);
        console.log("visualizer Farmer data type:", typeof newData.data);
        console.log("visualizer Farmer data keys:",  Object.keys(newData.data));
        var obj = JSON.stringify(newData.data)
        console.log("visualizer Farmer json keys:",  Object.values(obj));

        console.log("visualizer Farmer data values:", Object.values(newData.data));
        console.log("get owned propeties",typeof Object.getOwnPropertyNames(newData.data));


        
        var data = {};
        //var cols = []
        console.log(Object.keys(newData.data).length);
        for (let step = 0; step < Object.keys(newData.data).length; step++) {
            // Runs 5 times, with values of step 0 through 4.
            console.log('Walking east one key',Object.keys(newData.data)[step]);
            console.log('Walking east one value',Object.values(newData.data)[step][0]);
            let  name = Object.keys(newData.data)[step];
            let value = Object.values(newData.data)[step][0];
            data[name] = value;
          }
        var indexData = nj.arange(1, 13);
        console.log("indexData",indexData);
        console.log("indexData type",typeof indexData)

        let df = new dfd.DataFrame(data,{index: indexData.selection.data});
        df.print();
        var layout = {
            title: 'Smart  Service Farmer Prediction',
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
        



        
    }


    /**
     * Terminates a running minion by clearing the runtime environment.
     */
    terminate() {
        this.running = false;
    }


}