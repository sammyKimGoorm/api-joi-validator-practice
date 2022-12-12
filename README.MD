# APIs

```
{get} /lesson/v1
{get} /lesson/v2
{get} /lesson/v3

{get} /lesson/v1/channel
{get} /lesson/v2/channel
{get} /lesson/v3/channel

```

# 예시1

## {get} /lesson/v1/channel

```json
{
    "message": "channelIndex is required, query must contain at least one of [index, sequence]",
    "code": "ValidationError",
    "asdf": "this is error handler in app"
}
```

## {get} /lesson/v2/channel

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

## {get} /lesson/v3/channel

```json
{
    "message": "channelIndex is required, query must contain at least one of [index, sequence]",
    "code": "ValidationError",
    "asdf": "this is error handler in api"
}
```

## 차이

### v1 VS v2

-   에러 메세지 포맷 차이

### v1 VS v3

-   에러 핸들 방식 차이

# 예시2

```javascript
router.post("/v1", validate(postLesson, { convert: false }), (req, res) => {
    return res.json(req.body);
});

router.post("/v2", validate(postLesson), (req, res) => {
    return res.json(req.body);
});

// ------- postLesson
exports.postLesson = {
    body: commonJoi.keys({
        subject: Joi.string().required(),
        count: Joi.number(),
    }),
};
```

```json
// body
{
    "subject": "aaa",
    "index": "123123",
    "count": "123"  // v1 - 에러 발생, v2 - 에러 X
}
```
- [any.validate(value, [options])](https://joi.dev/api/?v=17.7.0#anyvalidatevalue-options)
    - convert - when true, attempts to cast values to the required types (e.g. a string to a number). Defaults to true.

