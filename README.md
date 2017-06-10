# Google Image Search Api
freecodecamp Image Search Abstraction Layer api

[Demo](https://image-search-qbumbvrxmb.now.sh/)
(might take some time for inactive instance to start)

Setup

Get a free MongoDB on [https://mlab.com](https://mlab.com) and create a new DB.

Then

```
yarn dev
```

Put your own credentials into `now.json`

```
touch now.json
```

```
{
  "env": {
    "MONGODB_URI": "mongodb://$user:$password@$databaseId.mlab.com:41401/$dbName"
  }
}
```


Deploy

```
now
```
