# Movie_DB

This app allows the user to interact with a limited movie database through an HTML interface using an express.js server. The user may call a full list of the movies entered into the database, enter a movie in, review a movie, or search for the reviews associated with a certain movie.
    
This app was mostly a teaching tool to help me understand the relationship between user input, the server, and the database. 

As far as real-world application, I suppose one could keep track of the movies you like or wanted to watch on it. Then the next time you can't remember which movie you wanted to watch, you'd have a reference. 

In future development goals, I'd love to actually cover edge cases for incorrect user input. There is no edge case coverage now, so it is very easy to bamboozle the server. There is also no input validation of any kind. My main focus on this project was just learning how to route through the server from a user interface and interact with a database.

## Table of Contents
* [Installation](#installation)
* [Instructions for Use](#instructions-for-use)

* [License](#license)
    
## Installation
1. This program requires the following programs be installed:<ul><li>node.js</li><li>mysql</li><li>npm express</li><li>npm mysql2</li><li>npm dotenv</li><li>nodemon may also be beneficial</li></ul>

2. Before running this program, please have the following information on hand and / or loaded into your 'asset/images' folder:<ul><li>movie titles and descriptions they want to enter</li></ul>


## Instructions for Use
<ol><li>ake sure all necessary programs are downloaded. Clo</li><li>After you have opened the repos file in your code editor and downloaded the dependencies, open your integrated terminal on the schema.sql file and log into mysql.</li><li>Run the schema file, then run the seeds file. This will initiate your local database, build the needed tables, and populate them with some seed data, so you have something to experiment with. If you would like to start with empty tables, you can forgo running the seeds.sql file and populate with your own movies once the server is deployed.</li><li>In the terminal at the level of the server.js file, run the server. I prefer to use nodemon for the auto restart.</li><li>Once your server is running, open an empty browser window and navigate to the page via your local host and PORT with "/". Once you are there, you should see the home page.</li><li>From the homepage, you can choose to list all the movies in the database, search to see if a specific movie is in there, add a new movie, review a movie in the database, and list all the reviews for a particular movie in the database.</li></ol>


## License
The files in this repository are covered by the [MIT License](https://choosealicense.com/licenses/mit/).
