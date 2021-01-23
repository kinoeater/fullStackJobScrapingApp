var myArray = [
  {
    job: "Sw Developer",
    location: "Sivas",
    company: "Zolando",
    Summary:
      "Konzeptionieren, Entwickeln und Einführen von webbasierten Anwendungen, Schnittstellen und ServicesKontinuierliches Weiterentwickeln bestehender Frontend- und Backend-Anwendungen sowie der einges",
    postDate: "3 days ago",
    readMore: "https://dennis-sourcecode.herokuapp.com/12/",
  },

  {
    job: "Python Developer",
    location: "Hamburg",
    company: "Imdb",
    Summary:
      "Konzeptionieren, Entwickeln und Einführen von webbasierten Anwendungen, Schnittstellen und ServicesKontinuierliches Weiterentwickeln bestehender Frontend- und Backend-Anwendungen sowie der einges",
    postDate: "8 days ago",
    readMore: "https://dennis-sourcecode.herokuapp.com/12/",
  },
  {
    job: "Software QA Eng",
    location: "Munchen",
    company: "Imdb",
    Summary:
      "Konzeptionieren, Entwickeln und Einführen von webbasierten Anwendungen, Schnittstellen und ServicesKontinuierliches Weiterentwickeln bestehender Frontend- und Backend-Anwendungen sowie der einges",
    postDate: "8 days ago",
    readMore: "https://dennis-sourcecode.herokuapp.com/12/",
  },
];

async function submitSearch()  {
  const channelURL = document.querySelector('.channel-input').value;
  const res = await fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "position": "developerrr",
        "location": "ankararrr"})
  })    
  const jobs = await res.json();
  console.log(jobs);
}

function buildTable(data) {
  var table = document.getElementById("myTable");

  for (var i = 0; i < data.length; i++) {
    var row = `                     
  
      <div class="card">
        <div class="card-body">
        <div class="row">  <h5 class="card-title col-sm">${data[i].job}</h5>
        
         <h5 class="card-title col-sm">${data[i].location}</h5>
          <h5 class="card-title col-sm">${data[i].company} </h5>
        </div>       
          <p class="card-text">${data[i].Summary}...</p>
          
          <div class="d-flex justify-content-between" >
              <a target="_blank"  href="${data[i].readMore}" class="btn btn-primary">İlana Git...</a>
          <p class="card-text">${data[i].postDate}...</p>
          </div>
        </div>
      </div>
    
                        `;
    table.innerHTML += row;
  }
}

function submitSearch() {
  const position = document.querySelector(".position").value;
  const location = document.querySelector(".location").value;
}
