```toml
name = 'login'
method = 'POST'
url = 'http://localhost:5555/event/get'
sortWeight = 2000000
id = '281c6268-410d-45d2-8a1f-28af7edbad67'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
raw = '''
{
  "password":  "password",
  "email":  "im.nicka.cc@gmail.com",
}'''
```
