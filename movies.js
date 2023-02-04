const PORT = process.env.PORT || 3000;
const http = require('http');
const axios = require('axios');
const apikey = process.env.API || "a1a170f0";


// Create server
const server = http.createServer(function(request, response) {
    
    response.writeHead(200, {'Content-Type': 'text/html'}); 
    // The above content type was previously 'text/plain' and HTML tags didn't work in the text variable, now it works because the content type has been changed

    if (request.url === "/"){
        const promise = axios({
            method: 'get',
            url: `http://www.omdbapi.com/?s=Spider-Man&apikey=${apikey}`
        }).then(res => {
            let movies = res.data.Search;
            response.write("<div style='text-align:center;'><h1>Spider-Man</h1></div><br>")
            response.write("<table style=' width:100%;margin:2;' cellpadding='5' cellspacing='0' border='solid black 2px'>")     
            response.write("<tr style='height:40px; width:450px; margin:0;'>")
            response.write("<th>Title</th><th>Released</th><th>IMDB ID</th><th>Poster</th>")
            response.write("</tr>")
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
            console.log(error)
        })
        console.log(promise);
    }
});

server.listen(PORT);
console.log(`Server running on port ${PORT}`);