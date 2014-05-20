# JumpZone

Is a simple nodejs proxy that uses [seaport]
and [bouncy] to service traffic.

## Usage

``` sh
npm install jumpzone -g
jumpzone --seaport=HOST:PORT --domain=*.foo.com --port=8000
```

## Options

- seaport [required]
- domain  [required]
- port [defaults to 8000]
- debug
- health [path]

## Support

see Github Issues


## LICENST

MIT
