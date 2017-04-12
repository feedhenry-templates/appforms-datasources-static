# Feedhenry Sample Service Using Hard Coded Data for Datasources
[![Dependency Status](https://img.shields.io/david/feedhenry-templates/appforms-datasources-static.svg?style=flat-square)](https://david-dm.org/feedhenry-templates/appforms-datasources-static)

This is a sample RESTful service to load a list of **months** that is properly formatted as a Data Source.

The endpoint can be found at `/static_ds/months`

An example of the Data Sources format is below:

You can also choose which item is to be selected by default by setting the "selected" property to true or false.


    [
        {
            "key": "some_key",
            "value": "some_value",
            "selected": false
        },
        {
            "key": "other_key",
            "value": "other_key",
            "selected": true
        }
    ]

# Build
```
npm install
```

# Test
All the tests are in the "test/" directory. The cloud app is using mocha as the test runner. 

To run:
* unit tests:
As pre-requisite, have:
* [mongoDB locally installed](https://www.mongodb.com/)
```
mongod
npm test
```
* coverage report for unit tests:
```
npm run coverage
```