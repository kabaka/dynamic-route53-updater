# Dynamic Route53 Updater

Super simple script to update a hosted zone with the IP found using ipify.

The hosted zone ID and record set name are hard-coded, but easy to update.

I'm using this in places where IPs change often. It works "well enough" for me.

_Note that this currently submits an UPSERT whether or not a change is needed.
If I get some spare time, I'll have it poll (via regular DNS query) before
doing this._
