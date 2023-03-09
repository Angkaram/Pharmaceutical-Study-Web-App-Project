import './categories.styles.scss';

const App = () => {

  const categories = [
    {
      id: 1,
      title: 'JH Hospital',
      imageURL: 'https://wallpaperaccess.com/full/4287504.jpg',
    },
    {
      id: 2,
      title: 'FDA',
      imageURL: 'https://www.fda.gov/themes/custom/preview/img/FDA-Social-Graphic.png',
    },
    {
      id: 3,
      title: 'Bavaria',
      imageURL: 'https://wallpaperaccess.com/full/4204907.jpg',
    },
  ];

  return (
    <div className='categories-container'>
      {categories.map(({title, id, imageURL}) => (
        <div key={id} className='category-container'>
          <div className='background-image' style={{
            backgroundImage: `url(${imageURL})`
          }} />
          <div className='category-body-container'>
            <h2>{title}</h2>
            <p>Login / Signup</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;