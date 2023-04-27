import logo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
          <img src={logo} className="header__logo" alt="логотип место россия" />
        </header>
    );
  }
  
  export default Header;
  