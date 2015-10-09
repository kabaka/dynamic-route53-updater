# Dynamic Route53 Updater

Super simple script to update a hosted zone with the IP found using ipify.

I'm using this in places where IPs change often. It works "well enough" for me.

## Installation

At the moment, this is not available via npm.

## Usage

```
    Options:

    -h, --help                     output usage information
    -V, --version                  output the version number
    -z, --hosted-zone-id <zoneId>  Route53 Hosted Zone ID
    -n, --name <name>              Resource Record Set Name
    -t, --type <type>              Resource Record Set Type (default: A)
    -T, --ttl <seconds>            Record Time-To-Live (default: 300)
```

## Notes

This currently submits an UPSERT whether or not a change is needed.  If I get
some spare time (or a pull request), I'll have it poll (via regular DNS query)
before doing this.
