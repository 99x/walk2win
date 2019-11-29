<div align="center">
   <img src="w2w-logo.png">
</div>
<br/>

[![GitHub license](https://img.shields.io/github/license/99xt/walk2win)](https://github.com/99xt/walk2win/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/99xt/walk2win)](https://github.com/99xt/walk2win/issues)
[![GitHub stars](https://img.shields.io/github/stars/99xt/walk2win)](https://github.com/99xt/walk2win/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/99xt/walk2win)](https://github.com/99xt/walk2win/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/99xt/walk2win)](https://img.shields.io/github/last-commit/99xt/walk2win)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/99xt/walk2win?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2F99xt%2Fwalk2win)

### Milestones

- [x] Create initial project files
- [x] Add html template to the client folder
- [x] Create mongo models (Team, Player, SyncRecord)
- [x] Create required controllers 
- [x] Add method to accept date + steps and update accordingly 
- [x] Google Auth and extract daily steps 
- [x] API integration testing
- [x] Implement frontend according to the design
- [x] Create Dockerfile and docker-compose.yml
- [x] Deploy into a AWS vm
- [x] User testing

### REST API

- `GET /api/v1/leaderboard/topteams`
- `GET /api/v1/leaderboard/topteams/{teamId}`
- `GET /api/v1/leaderboard/topplayers`
- `GET /api/v1/leaderboard/topplayers/{playerId}`
- `GET /api/v1/leaderboard/topmaleplayers`
- `GET /api/v1/leaderboard/topfemaleplayers`
- `POST /api/v1/sync` - Replaces steps data, recalculates team/solo scores

```json
{
    "stepCounts": [
        {
            "date": "2018-10-12",
            "steps": 7500
        },
    {
            "date": "2018-12-12",
            "steps": 8500
        }    
    ]
}
```

- `POST /api/v1/syncmanual` - Update/Add single data point, recalculates team/solo scores

```json
{
    "stepCounts": 
        {
            "date": "2018-10-12",
            "steps": 7500
        }
}
```
- `GET /api/v1/playersync` - Retrive scores/steps for a specific player

```json
//Sample output
{
    "total_steps": [
        {
            "_id": "5d31f96c936e5360eaa83c94",
            "steps": 5500,
            "points": 25,
            "date": "2018-11-12T00:00:00.000Z"
        },
        {
            "_id": "5d31ec3d41f5763bf038d9ae",
            "date": "2018-10-12T00:00:00.000Z",
            "steps": 5500,
            "points": 25
        }
    ],
    "steps": 11000,
    "points": 50
}
```

### Developer Setup

Fork and clone `https://github.com/99xt/walk2win.git`

Install dependencies 

```bash
$ cd client
$ npm i
$ cd ../server
$ npm i
```
### Setup enviroment configuration

#### server

- Setup mongo connection string and the server port from `./server/.env`

```
MONGO_STR=<database_string>
PORT=3003
```

- Add your contest rules into `./server/constants.js`

#### client

- Follow steps mentioned [here](https://developers.google.com/fit/rest/v1/get-started) to request an OAuth 2.0 client ID and API key.

- Add the keys to the relevant `environment.ts` file in location `client/src/environments`. You can select either prod or dev.

```
export const environment = {
	production: true,
	baseApi: '<add_base_api_here>',
	client_id: '<add_client_id_here>',
	apiKey: '<add_apiKey_here>'
};
```

Install mongodb and then import sample data

```bash
$ cd server
// Enter some rows into data/data.csv
$ npm run initdb
```

Start the REST API

```
$ cd server
$ npm run dev
```

Start the Angular app

```
$ cd client
$ ng serve -o
```

Submit a pull request with the new feature


### Deployment guidelines

Login to your vm or machine via `ssh`

```
$ ssh -i <key-file>.pem <username>@<domain>
```

Remove existing directory and get a clone from deployment repository

```
$ sudo rm -rf <repo-name>
$ git clone <repo-url>
```

Create containers 

```
$ cd <repo-name>
$ sudo docker-compose up --build -d
```

### Initialize db from data.csv
if you are using external mongodb service directly execute `intialize.sh` from the host. Otherwise(If you are using dockerized mongo instance), Log in to the container and execute `initialize.sh` 

```
$ sudo docker exec -it --user=root <container_id> /bin/bash -d
$ cd data
$ ./initialize.sh
```

## License

[MIT](LICENSE)

<a href="https://github.com/99xt/walk2win/graphs/contributors">
  <img src="https://contributors-img.firebaseapp.com/image?repo=99xt/walk2win" />
</a>

Made with [contributors-img](https://contributors-img.firebaseapp.com).
