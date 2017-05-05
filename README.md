# Hold My Beer

Hold My Beer is a sample application for AWS CloudSearch. It's a static web app for
querying a dataset of beers.

## AWS Setup

### CloudSearch

0. Go to the CloudSearch Dashboard.
0. Click Create a Domain.
0. Give it a name (e.g. hold-my-beer).
0. In the Access Policies, set policy to "Search and Suggester service: Allow all. Document Service: Account owner only."
0. Wait until access policies are done processing.

#### Suggester

0. Suggesters > Add Suggester
0. Give it a name. Set "Source Field" to "name", and "Fuzzy Matching" to "high".
0. Re-index your domain. This can take a while.

### API Gateway

0. Create a resource for `/search`.
0. Create a `GET` for `/search`.
0. Select the integration type HTTP.
0. Specify the Endpoint URL as https://<search-url>.us-east-1.cloudsearch.amazonaws.com/2013-01-01/search
0. Method Request > URL Query String Parameters add `q`, `q.parser`, `q.options`.
0. Actions > Deploy API
0. Create new stage, give it a name.
0. Click Deploy

## Running the app

Export the url of your API gateway domain.

```
export REACT_APP_SEARCH_URL='https://abc123defg.execute-api.us-east-1.amazonaws.com/stage-name'
```

Install dependencies and start the project.

```
npm install
npm start
```
