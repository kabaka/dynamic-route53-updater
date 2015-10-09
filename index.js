var async = require('async');
var ipify = require('ipify');
var opts  = require('commander');
var AWS   = require('aws-sdk'),
  route53 = new AWS.Route53({ apiVersion: '2013-04-01' });

function getIpAddress(opts, next) {
  ipify(function(err, ip, data) {
    next(err, opts, ip, data);
  });
}

function ipAddressReceived(opts, ipAddress, data, next) {
  var params = {
    HostedZoneId: opts.hostedZoneId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'UPSERT',
          ResourceRecordSet: {
            Name: opts.name,
            Type: opts.type || 'A',
            ResourceRecords: [
              {
                Value: ipAddress
              }
            ],
            TTL: opts.ttl || 300
          }
        }
      ]
    }
  };

  console.log(params);

  route53.changeResourceRecordSets(params, next);
}

opts
  .version('1.0.0')
  .option('-z, --hosted-zone-id <zoneId>', 'Route53 Hosted Zone ID')
  .option('-n, --name <name>', 'Resource Record Set Name')
  .option('-t, --type <type>', 'Resource Record Set Type (default: A)')
  .option('-T, --ttl <seconds>', 'Record Time-To-Live (default: 300)')
  .parse(process.argv);

async.waterfall(
  [
    function(next) {
      next(null, opts);
    },
    getIpAddress,
    ipAddressReceived
  ],
  function(error, result) {
    if (error) console.error(error, error.stack);
  }
);


