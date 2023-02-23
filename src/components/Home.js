const wallpaper = new URL("./Images/Wallpaper.png", import.meta.url)
const Home = () => {
    const handleClick = () => {
        console.log('Hello friends');
    }

    return (
        <section className="home-BG">
            <div className="home">
                <h2>Welcome</h2>
               
            </div>

        </section>
        
    );
}
 
export default Home;