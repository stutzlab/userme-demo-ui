# userme-demo-ui
Example application that uses Userme for account operations (registration, password reset, social login etc) and a separate container for backend for APIs.

### New Account with local password
<img src="docs/userme-new-account.gif" width="360" />

### Facebook signin support
<img src="docs/userme-facebook.gif" width="360" />

### Google signin support
<img src="docs/userme-google.gif" width="360" />

Backend services for this demo is at http://github.com/stutzlab/userme-demo-api
See more at http://github.com/stutzlab/userme

## Usage

* Run demo

```sh
git clone http://github.com/stutzlab/userme-demo-api
cd userme-demo-api
docker-compose up -d
cd ..

git clone http://github.com/stutzlab/userme-demo-ui
cd userme-demo-ui
docker-compose up -d
```

* Open browser at http://localhost:3000

* Create a new Account

* Open http://localhost:8080 to get the account activation link (this is an email trapper)

* 

