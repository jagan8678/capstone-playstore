function Home() {
  const backgroundImageStyle = {
    backgroundImage: 'url("https://tse4.mm.bing.net/th?id=OIP.ouV2A9nPjOySzT6OcHGv4AHaHa&pid=Api&P=0&h=180")',
    backgroundSize: 'cover',
    padding: '50px 0' // Optional: Adds some padding to the top and bottom
  };

  return (
    <>
      <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1" aria-current="true"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://images.anandtech.com/doci/5632/PlayStore.png" height={600} className="d-block w-100" alt="PlayStore" />
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Welcome to PlayStore</h1>
                <p>Discover the latest and greatest applications across diverse categories tailored to fit your needs and interests.</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://static.wetest.net/1/wetest-ied-ads-picture/ads-picture/bdeaeda2dc5d0af2db97587814d347b0.jpg" height={600} className="d-block w-100" alt="App Hub" />
            <div className="container">
              <div className="carousel-caption">
                <h1>Your App Hub</h1>
                <p>Find, review, and enjoy the best apps available, curated just for you, with easy navigation and detailed insights.</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://www.apple.com/in/app-store/images/meta/og__c59t0pflacq6_developers.png" height={600} className="d-block w-100" alt="Explore Apps" />
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>Explore Apps</h1>
                <p>Browse and explore a wide range of applications, from games and fashion to health and beauty, all in one place.</p>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div style={backgroundImageStyle}>
        <div className="container marketing mt-5">
          <div className="row">
            <div className="col-lg-4">
              <img src="https://motion4lifefitness.com/wp-content/uploads/2018/05/videogameadultsenior-1080x675.jpg" height={500} className="d-block w-100" alt="Games" />
              <h2 className="fw-normal">Games</h2>
              <p>All games contain the idea of death</p>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                View apps
              </button>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Games</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      Go to the Application List page to find the apps.
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKbhWIfU0bXWY-5iGsV_IioZ30-ALi4O9oBw&s" height={500} className="d-block w-100" alt="Beauty" />
              <h2 className="fw-normal">Beauty</h2>
              <p>Another exciting bit of representative</p>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#gamesModal">
                View Apps
              </button>
              <div className="modal fade" id="gamesModal" tabIndex="-1" aria-labelledby="gamesModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <p>Go to Applicationlist page you will find apps.</p>
                    </div>
                    <div className="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <div className="col-lg-4">
              <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_TAtD02XUnxjNtVFzzwVxD82te732AMfKauPEeAFFzLS2GBTIDQjFbw9BO4QqshoQIaopO5Z99lOZRRLsB0yY_WxprU2bgukfVj4XjfGiqjGDU8G9sbLNiJPxPmLvo-SEztEqCXVTzyo/w1600/sustainable+fashion+terms+and+glossary.PNG" height={500} className="d-block w-100" alt="Fashion" />
              <h2 className="fw-normal">Fashion</h2>
              <p>Fashion is part of our culture, and it's about more than just a pretty dress.</p>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#gamesModal">
                View Apps
              </button>
              <div className="modal fade" id="gamesModal" tabIndex="-1" aria-labelledby="gamesModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <p>Go to Applicationlist page you will find apps.</p>
                    </div>
                    <div className="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb6JPB7DjAAFKsxvZQ8P8D98zbiDy8FK_F8tp8d738rK7hNSVKfO-41rr6DnvJXj7Bcc0&usqp=CAU" height={500} className="d-block w-100" alt="Health" />
              <h2 className="fw-normal">Health</h2>
              <p>Health is like money; we never have a true idea of its value until we lose it.</p>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#gamesModal">
                View Apps
              </button>
              <div className="modal fade" id="gamesModal" tabIndex="-1" aria-labelledby="gamesModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <p>Go to Applicationlist page you will find apps.</p>
                    </div>
                    <div className="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              
              </div>
            </div>
            <div className="col-lg-4">
              <img src="https://media.assettype.com/newindianexpress%2F2024-02%2Feaff5232-daaa-489a-bf3f-7a20fc249036%2FWomen_empowerment.jpg" height={500} className="d-block w-100" alt="Women Empowerment" />
              <h2 className="fw-normal">Women</h2>
              <p>Empowering women is key to building a future we want.</p>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#gamesModal">
                View Apps
              </button>
              <div className="modal fade" id="gamesModal" tabIndex="-1" aria-labelledby="gamesModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <p>Go to Applicationlist page you will find apps.</p>
                    </div>
                    <div className="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
