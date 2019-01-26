var fs = require('fs');
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints:['127.0.0.1'],localDataCenter: 'datacenter1',keyspace: 'DBLP'}); // <- contactPoints et keyspace à modifier suivant machine
/*
client.connect(function (err) {
    console.log(err);
});
*/
var file = fs.readFileSync('newDBLP.json');
var rows = String(file).split('\n');

var batchQueriesList = [];

// Clean the rows of special characters < ' > in values
// And divide the rows into batch of 10 INSERT queries to prevent instabilities
// And push them into batchQueriesList

for (var k=0;k<(rows.length-1)/10 - 1;k++)
{
    var queries = [];
    for (var i=k*10;i < k*10 + 10;i++)
    {
        
        var rowJSON = JSON.parse(rows[i]);
        rowJSON.title = rowJSON.title.replace(/'/g,' ');
        if (rowJSON.journal.series != null)
        {
            rowJSON.journal.series = rowJSON.journal.series.replace(/'/g,' ');
        }
        if (rowJSON.journal.editor + null)
        {
            rowJSON.journal.editor = rowJSON.journal.editor.replace(/'/g,' ');
        }
        if (rowJSON.booktitle != null)
        {
            rowJSON.booktitle = rowJSON.booktitle.replace(/'/g,' ');
        }
        if (rowJSON.url != null)
        {
            rowJSON.url = rowJSON.url.replace(/'/g,' ');
        }
        for (var indexAuthor=0;indexAuthor < rowJSON.authors.length;indexAuthor++)
        {
            rowJSON.authors[indexAuthor] = rowJSON.authors[indexAuthor].replace(/'/g,' ');
        }
        var query = "INSERT INTO DBLP JSON '" + JSON.stringify(rowJSON) + "';";
        queries.push({query: query});

    } 
    batchQueriesList.push(queries);
}

// Clean and add the remaining rows

queries = [];
for (var i=parseInt((rows.length-1)/10)*10;i < rows.length - 1;i++)
{
    var rowJSON = JSON.parse(rows[i]);
    rowJSON.title = rowJSON.title.replace(/'/g,' ');
    if (rowJSON.journal.series != null)
    {
        rowJSON.journal.series = rowJSON.journal.series.replace(/'/g,' ');
    }
    if (rowJSON.journal.editor + null)
    {
        rowJSON.journal.editor = rowJSON.journal.editor.replace(/'/g,' ');
    }
    if (rowJSON.booktitle != null)
    {
        rowJSON.booktitle = rowJSON.booktitle.replace(/'/g,' ');
    }
    if (rowJSON.url != null)
    {
        rowJSON.url = rowJSON.url.replace(/'/g,' ');
    }
    for (var indexAuthor=0;indexAuthor < rowJSON.authors.length;indexAuthor++)
    {
        rowJSON.authors[indexAuthor] = rowJSON.authors[indexAuthor].replace(/'/g,' ');
    }
    var query = "INSERT INTO DBLP JSON '" + JSON.stringify(rowJSON) + "';";
    queries.push({query: query});
}
batchQueriesList.push(queries);

// Insert batches to the server with an interval of 0.1s every 30 batches to avoid too many connections.

var iteration = 0;
var maxIteration = 30;
function insertBatch()
{
    while (iteration < batchQueriesList.length && iteration < maxIteration)
    {
        client.batch(batchQueriesList[iteration]);
        iteration = iteration + 1;
    }
    if (iteration >= maxIteration)
    {
        maxIteration = iteration + 30;
        console.log('Operation in progress... ' + iteration + ' / ' + batchQueriesList.length);
        setTimeout(insertBatch,100);
    }
    else
    {
        console.log('Done !');
    }
}
insertBatch();