# RestAPIs
## Simple RestAPI interface supporting 5 HTTP Methods.

```
Article {title:String,content:String}
```

### API Reference
Endpoint | Description 
:--|:--
```GET    \articles``` | Returns all articles
```POST   \articles```| Creates and article expects urlencoded body 
```DELETE \articles``` | Deletes all articles
```GET    \articles\:title``` | Returns a specific article
```PUT    \articles\:title``` | Updates existing article expects complete article
```PATCH  \articles\:title``` | Updates existing article expects updated fields
```DELETE \articles\:title``` | Deletes specific article
