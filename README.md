# PWA workshop
Code in support of the drupalaton workshop. 

## Requirements

* Latest chrome
* A local webserver
* A local clone of this repository
* `http://localhost` pointing to this local clone of the repo

## Install
Due to serviceworker requirements, the only way it can be activated on chrome
is if the website is served through `https` or if the domain is exactly 
  `localhost`. 
 
The webserver need to be configured so that `http://localhost` serve 
`index.html` from this repository. Custom local domain names such as `pwa.local`
or any other that require changing the `hosts` file will not work. `localhost` 
is the only domain that chrome will allow to run serviceworkers without https.


### Notes

Service workers are not chrome-only but chrome provide the best tools so far for
debugging and developing. 
