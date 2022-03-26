const request = require(`request`)
const cron = require(`node-cron`);

cron.schedule(`0 0 * * *`, () => {
    console.log(`running a task every day at 12:00 AM`);
    request(`http://localhost:3000/external-file-sources/work-sample-mk?path=2021/04/events.csv`, function(error, response, body) {
        console.log('error', error)
        console.log('response', response)
        console.log('body', body)
    });
});
