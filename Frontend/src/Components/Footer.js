import { Link } from 'react-router-dom';
function Footer() {
    return (
      <div style={{backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxHYYBq947ym1ZAMdDnEsrnxSt12885z_HQltExCX20O6ksPugGIkdyUem4RI4xip7RWM&usqp=CAU")'}}>
      <div className="container-fluid"  > 
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="foot-item">
              <Link className="nav-link " to="/" exact>Home</Link>
            </li>
            <li className="foot-item">
              <Link className="nav-link " to="/applicationlist">Applicationlist</Link>
            </li>
          </ul>
          <div data-testid="footer-content">
            <p className="text-center">2024 Playstore</p>
          </div>
        </footer>
      </div>
      </div>
    );
  }
  
  export default Footer;