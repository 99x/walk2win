# walk2win

### Milestones

- [x] Create initial project files
- [ ] Add html template to the client folder
- [x] Create mongo models (Team, Player, SyncRecord)
- [x] Create required controllers 
- [x] Add method to accept date + steps and update accordingly 
- [x] Google Auth and extract daily steps 
- [ ] API integration testing
- [ ] Implement frontend according to the design
- [ ] Create Dockerfile
- [ ] Deploy into a AWS vm
- [ ] User testing

### REST API

- `GET /api/v1/leaderboard/topteams`
- `GET /api/v1/leaderboard/topplayers`
- `GET /api/v1/leaderboard/topmaleplayers`
- `GET /api/v1/leaderboard/topfemaleplayers`
- `POST /api/v1/sync`

```json
{
    "steps": "12002",
    "syncDate": "2019-07-25",
    "playerGmail": "user1@gmail.com"
}
```
### Developer Setup

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

... TODO: Fill this after Dockerfiles 
