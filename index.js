var async = require('async');
var ipify = require('ipify');
var AWS   = require('aws-sdk'),
  route53 = new AWS.Route53({ apiVersion: '2013-04-01' });

var HostedZoneId = ''; /* XXX SET THIS */

function getIpAddress(next) {
  ipify(next);
}

function ipAddressReceived(ipAddress, data, next) {
  var params = {
    HostedZoneId: HostedZoneId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'UPSERT',
          ResourceRecordSet: {
            Name: '', /* XXX AND THIS and whatever else in here is wanted */
            Type: 'A',
            ResourceRecords: [
              {
                Value: ipAddress
              }
            ],
            TTL: 60
          }
        }
      ]
    }
  };

  route53.changeResourceRecordSets(params, next);
}

async.waterfall(
  [
    getIpAddress,
    ipAddressReceived
  ],
  function(error, result) {
    if (error) console.error(error, error.stack);
  }
);


