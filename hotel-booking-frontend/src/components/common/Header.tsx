type HeaderProps = {
    title: string;
};

const Header = ({title}: HeaderProps) => {
    return (
        <header className="header">
            <div className="overlay"></div>
            <h1>
                Welcome to <span className="hotel-color">Hotel Booking System</span>
            </h1>
            <div className="container">
                <h1 className="header-title text-center">{title}</h1>
            </div>
        </header>
    );
};

export default Header;
