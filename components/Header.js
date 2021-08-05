import headerStyles from '../styles/Header.module.css';


const Header = () => {
    return (
        <div>
            <h1 className={headerStyles.title}>
                <span>Anime List</span>
            </h1>
            <p className={headerStyles.description}>Check out my anime list</p>
        </div>
    )
}

export default Header
