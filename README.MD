# APIs
```
{get} /lesson/v1
{get} /lesson/v2
{get} /lesson/v3

{get} /lesson/v1/channel
{get} /lesson/v2/channel
{get} /lesson/v3/channel

```

## ERROR HANDLE
- /lesson/{version}/channel

### v1
```json
{
    "message": "channelIndex is required, query must contain at least one of [index, sequence]",
    "code": "ValidationError",
    "asdf": "this is error handler in app"
}
```

### v2
```json
{
    "message": [
        "channelIndex is required",
        "query must contain at least one of [index, sequence]"
    ],
    "code": "ValidationError",
    "asdf": "this is error handler in app"
}
```

### v3
```json
{
    "message": "channelIndex is required, query must contain at least one of [index, sequence]",
    "code": "ValidationError",
    "asdf": "this is error handler in api"
}
```

## 차이

### v1 VS v2
- 에러 메세지 포맷 차이

### v1 VS v3
- 에러 핸들 방식 차이