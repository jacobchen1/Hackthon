class SmartServiceRuntimeEnvironmentTmin extends tucana.minion.Tmin {
    // TODO Finish implementation (Get results and notify subsequent minions)
    constructor(dataAccessService, minionController, id, uiAdapter, dependencies=[]) {
        super(dataAccessService, minionController, id, uiAdapter, dependencies);
        this.running = false;
    }


    /**
     * Tiggered to activate the minion
     */
    async activate() {
        this.running = true;
        console.log('[SmartServiceRuntimeEnvironmentTmin] Running.')
    }

    notify(newData) {
        /*
        console.log("[SmartServiceRuntimeEnvironmentTmin_newData]", newData);
        const uiAdapter = new tucana.adapter.DOMUIAdapter(document.getElementById("main-place"));
        const database = new tucana.adapter.IndexedDBDatabaseHandler();
        const identificationHandler = new tucana.adapter.BrowserFingerprintIdentificationHandler('login', 'logoutButton');
        const baasCommunicationHandler = new tucana.adapter.RESTAPIBaaSCommunicationHandler();
        const uPeerCommunicationHandler = new tucana.adapter.WebRTCUPeerCommunicationHandler({
            myId: identificationHandler.getLocalID(),
            myLocalId: identificationHandler.getLocalID(),
            rtcConfig: {
                "iceServers": [{ 
                    "url": "stun:stun.l.google.com:19302" 
                }]
            }
        });
        let tucanaPlatform = new tucana.TucanaCoreService(database, uPeerCommunicationHandler, baasCommunicationHandler, identificationHandler, uiAdapter);
        console.log("tucanaPlatform",tucanaPlatform)
        tucanaPlatform.loadSmartServiceConfiguration(newData.id)
            .then((result) => {
                console.log("runtimeenv",result);
                if (result.success && result.state instanceof tucana.minionstate.MinionsBound) {
                    return tucanaPlatform.runSmartService();
                }
            })
            .then ((result) => {
                console.log("[SmartServiceRuntimeEnvironmentTmin_result]", result);
            })
        return null; */
        console.log("[SmartServiceRuntimeEnvironmentTmin]", newData);

        //newData = newData.response.res;


        const _this = this;
        console.log("[SmartServiceRuntimeEnvironmentTmin]", newData);
        const uiAdapter = new tucana.adapter.DOMUIAdapter(document.getElementById("main-place"));
        const database = new tucana.adapter.IndexedDBDatabaseHandler();
        const identificationHandler = new tucana.adapter.BrowserFingerprintIdentificationHandler('id01', 'logoutButton');
        const baasCommunicationHandler = new tucana.adapter.RESTAPIBaaSCommunicationHandler();
        let uPeerCommunicationHandler = new tucana.adapter.WebRTCUPeerCommunicationHandler({
            rtcConfig: {
                "iceServers": [{ 
                    "url": "stun:stun.l.google.com:19302" 
                }]            
            }
        });
        let tucanaPlatform = new tucana.TucanaCoreService(database, uPeerCommunicationHandler, baasCommunicationHandler, identificationHandler, uiAdapter);
        console.log("tucanaPlatform",tucanaPlatform);
        tucanaPlatform.loadSmartServiceConfiguration(newData.id)
            .then((result) => {
                if (result.success && result.state instanceof tucana.minionstate.MinionsBound) {
                    return tucanaPlatform.runSmartService();
                }
            })
            .then ((result) => {
                return tucanaPlatform.terminateSmartService();
            })
            .then((result) => {
                return _this.dataAccessService.getDomainItemIds();
            })
            .then((result) => {
                const potentialResults = [];
                for (let res of result) {
                    if (res.id.includes("forecastquantities.js")){
                        potentialResults.push(res);
                    }
                }
                return potentialResults.pop();
            })
            .then((res) => {
                console.log("[SmartServiceRuntimeEnvironmentTmin_rest]", res);
                uPeerCommunicationHandler = null;
                tucanaPlatform = null;
                _this.minionController.notify(_this, {result : res, source : newData.getContext().source});
            })
        return null;

    }

    terminate() {
        this.running = false;
    }
}