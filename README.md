# Is It Loud In Here? (Work In Progress)

Hearing damage can be truly devestating but it’s difficult to know, quantifiably, just how loud your surroundings are at any given moment. “Is It Loud In Here?” is a combined web-app/Internet of Things (IoT) solution that allows the user to use wi-fi connected microphones to monitor the ambient volume in a space instantaneously and track the ambient volume over time. 


## Technologies used: 
- Particle Photon
- React.js
- Material-UI 
- Chart.js 
- Node.js 
- NodeCron 
- Express
- PostgreSQL
- Passport

## Screenshots: 
This is a work in progress, screens will benefit from  additional styling and are subject to change

![Devices screen](documentation/images/devices_screen2.png =100x250)

![Instant reading screen](documentation/images/instant_screen2.png =100x250)

![Graph display screen](documentation/images/graph_screen2.png =100x250)

## Getting Started: 

Required: 
- Node.js
- Postico and PostgreSQL
- Particle Photon core flashed with custom code + wired to external microphone (to be included) 

To Run: 
- npm install
- npm run server
- npm run client


SQL: 
```
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE person_device (
	id SERIAL UNIQUE, 
	person_id INT REFERENCES "person" NOT NULL,
	device_id VARCHAR (200) PRIMARY KEY UNIQUE NOT NULL,
	auth_token VARCHAR (200) NOT NULL,
	device_name VARCHAR (200),
	selected BOOLEAN DEFAULT FALSE  
);

CREATE TABLE spl_data (
	id SERIAL PRIMARY KEY, 
	device_id VARCHAR (200) REFERENCES "person_device" NOT NULL,
	spl INT, 
	stamp timestamp with time zone
);

```

### Next Steps:
- Instructions for connecting a new Photon & code to flash
- Incorperating Twilio's text message API to notify users of dangerous SPL readings
- Additional styling on some mobile pages
- Additional styling so the app is more accessible on desktop displays



### Hand-crafted by R. Atticus Pomerantz

Special thanks to Davide Gironi for his 2014 Particle Spark library from which I based my Photon code: 
http://github.com/davidegironi/spark-audiogetaveragelib
