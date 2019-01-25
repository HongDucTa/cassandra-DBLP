var fs = require('fs');
var uuidv1 = require('uuid/v4');

var doc = fs.readFileSync('./DBLP_clean.json');
var rows = String(doc).split('\n');

var newDoc = '';

for (var i=0;i<rows.length - 1;i++)
{
    rows[i] = rows[i].replace('"_id"','"id" : "' + uuidv1() + '", "path"');
    newDoc = newDoc + rows[i];
}

fs.writeFileSync('./newDBLP.json',newDoc);
