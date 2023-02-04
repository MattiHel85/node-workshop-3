const PORT = process.env.PORT || 3000;
const http = require('http');
const axios = require('axios');
const apikey = process.env.API || "a1a170f0"; // Not added a .env file yet but will do at some point instead of hardcoding the API key


// Create server
const server = http.createServer(function(request, response) {
    
    // Define page Content-Type
    response.writeHead(200, {'Content-Type': 'text/html'}); 

    // So far this is a SPA listing Spider-Man movies when the URL is "/". I will add a search function later.
    if (request.url === "/"){
        // HTTP request to the OMDB API using Axios
        const promise = axios({
            method: 'get',
            url: `http://www.omdbapi.com/?s=Spider-Man&apikey=${apikey}`
        }).then(res => {
            // Put the response into a variable
            let movies = res.data.Search;

            // Build an HTML table using response write
            response.write("<div style='text-align:center;'><h1>Spider-Man</h1></div><br>")
            response.write("<table style=' width:100%;margin:2;' cellpadding='5' cellspacing='0' border='solid black 2px'>")     
            response.write("<tr style='height:40px; width:450px; margin:0;'>")
            response.write("<th>Title</th><th>Released</th><th>IMDB ID</th><th>Poster</th>")
            response.write("</tr>")
            // Loop through the data adding each movie to the HTML table. I decided to leave out the data type "Type" since each of them just said "Movie" and it was repetitive and obvious
            for (movie of movies){
                response.write("<tr style='height:40px; width:450px; margin:0;'>")
                response.write(`<td>${movie.Title}</td>`)
                response.write(`<td>${movie.Year}</td>`)
                response.write(`<td>${movie.imdbID}</td>`)
                response.write(`<td style="text-align:center;"><img src="${movie.Poster}" alt="${movie.Title} movie poster" style="width=100px;margin:2;display:block"></td>`)
                response.write("</tr>")
            }
            response.write("</table>") 
        }).catch(function (error) {
            // Console log any potential error
            console.log(error)
        })
        console.log(promise);
    }
});

// Listen to the server using the port number defined in the variable PORT
server.listen(PORT);
console.log(`Server running on port ${PORT}`);