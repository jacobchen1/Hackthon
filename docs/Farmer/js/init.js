// TODO
const uiAdapter = new tucana.adapter.DOMUIAdapter(document.getElementById("main-place"));

const database = new tucana.adapter.IndexedDBDatabaseHandler();
const identificationHandler = new tucana.adapter.BrowserFingerprintIdentificationHandler('id01', 'logoutButton');
const baasCommunicationHandler = new tucana.adapter.RESTAPIBaaSCommunicationHandler();
const uPeerCommunicationHandler = new tucana.adapter.WebRTCUPeerCommunicationHandler({
    myId: identificationHandler.getLocalID(),
    myLocalId: identificationHandler.getLocalID(),
    rtcConfig: {
        "iceServers": [{
            "url": "stun:stun2.1.google.com:19302"
        }]
    }
});

const tucanaPlatform = new tucana.TucanaCoreService(database, uPeerCommunicationHandler, baasCommunicationHandler, identificationHandler, uiAdapter);

//function startCallback(id) {
//    tucanaPlatform.startService(id);
//}

var startCallback = function (id){
    tucanaPlatform.startService(id);
}


fetch('farmer_service.json')
    .then((response) => {
        return response.json();
    }).then(json => {
        var sscItem = tucana.model.SmartServiceConfigurationItem.fromJSON(json);
        
        tucanaPlatform.createSmartServiceConfiguration(sscItem)
    })
    .then(() => {
        return fetch('../service/forecasting.json')
    })
    .then((response) => {
        console.log("TP3:",response);
        return response.json();
    })
    .then((json) => {
        var sscItem = tucana.model.SmartServiceConfigurationItem.fromJSON(json);
        tucanaPlatform.createSmartServiceConfiguration(sscItem);
        console.log("TP4:",sscItem);
    })
    .then(() => {
        tucanaPlatform.getSmartServiceConfigurationItemIds().then((ids) => {
            uiAdapter.showServiceSelection(ids, startCallback);
        }, () => {
            console.log("service id fetch error");
        });
    });
