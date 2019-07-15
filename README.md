# walk2win

### Milestones

- [x] Create initial project files
- [x] Add html template to the client folder
- [x] Create mongo models (Team, Player, SyncRecord)
- [x] Create required controllers 
- [x] Add method to accept date + steps and update accordingly 
- [x] Google Auth and extract daily steps 
- [ ] API integration testing
- [ ] Implement frontend according to the design
- [x] Create Dockerfile and docker-compose.yml
- [x] Deploy into a AWS vm
- [ ] User testing

### REST API

- `GET /api/v1/leaderboard/topteams`
- `GET /api/v1/leaderboard/topteams/{teamId}`
- `GET /api/v1/leaderboard/topplayers`
- `GET /api/v1/leaderboard/topmaleplayers`
- `GET /api/v1/leaderboard/topfemaleplayers`
- `GET /api/v1/sync`

### Developer Setup

Follow steps mentioned [here](https://developers.google.com/fit/rest/v1/get-started) to request an OAuth 2.0 client ID and API key.
Add the keys to the relevant `environment.ts` file in location `client/src/environments`

Fork and clone `https://github.com/99xt-incubator/walk2win.git`

Install dependencies 

```bash
$ cd client
$ npm i
$ cd ../server
$ npm i
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
$ ng serve --open
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
