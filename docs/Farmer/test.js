console.log('test1')
fetch('../broker/forecasting.json').then(response => {
    return response.json();
}).then(data => {
    // Work with JSON data here
    console.log('fetch service start:',data);
    //this.minionController.notify(this, data);
}).catch(err => {
    // Do something for an error here
    console.log(err);
});




/*
fetch('rainbow.jpg')
    .then(response => {
        console.log(response);
        return response.blob();
    })
    .then(blob => {
        console.log(blob);
        document.getElementById('rainbow').src = URL.createObjectURL(blob);
    })
    .catch(error =>{
        console.log(error);
    }); */