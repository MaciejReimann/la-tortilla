# LaTortilla

UI build with React to display culinary recipes fetched by a proxy Express server from: http://www.recipepuppy.com/about/api/

---

## Install and run locally:

Clone the repo and

```shell
 npm run locally
```

## [See live v.1.0.0](https://latortilla.herokuapp.com)

## Brief:

Build an app using React, where users are able to: \
&nbsp;&nbsp; a) Choose or type one or more ingredients in a search field; \
&nbsp;&nbsp; b) See the recipes (photo, name and list of ingredients displayed as tags); \
&nbsp;&nbsp; c) Follow the link provided;

## Challenges:

&nbsp;&nbsp; 1. The responses from the given API lack the `Access-Control-Allow-Origin` HTTP header,\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; so it was impossible to fetch the data directly from the browser. Hence the need for proxy server.\
&nbsp;&nbsp; 2. The quality and geometry of the linked images was very uneven, so they need to be displayed cropped and centered \
&nbsp;&nbsp; 3. Funny API errors;

## TODOs:

- display the Error Card
- set timeout for resending request to the server and display a message to the user
- restyle for desktop devices
