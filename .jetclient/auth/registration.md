```toml
name = 'registration'
method = 'POST'
url = 'http://localhost:5555/auth/reg'
sortWeight = 1000000
id = '05008930-8c1e-4f23-9381-db865bac55ae'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
raw = '''
{
  "name":  "Nicka",
  "password":  "password",
  "city":  "Pskov",
  "club":  "test-club",
  "country":  "RF",
  "email":  "im.nicka.cc@gmail.com",
  "surname": "Berdashev"
}'''
```
