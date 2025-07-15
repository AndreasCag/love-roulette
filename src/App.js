import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import PrizeScroll from './components/PrizeScroll';

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [prizeForWinning, setPrizeForWinning] = useState([
    { name: "Плюшевая игрушка", imageUrl: "https://img.joomcdn.net/0ff9658dee9c3aea07a854c812620c4351995f49_400_400.jpeg" },
    { name: "Бомбочки для ванны", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEqPhLov4dYVu50n1LmEUoF475_HPOtzAzDw&s" },
    { name: "Чашка Starbucks", imageUrl: "https://images.prom.ua/2641837820_2641837820.jpg?PIMAGE_ID=2641837820" },
    // { name: "Iphone 16 Pro Max", imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
    { name: "Секретный приз", imageUrl: "https://images.steamusercontent.com/ugc/44574410608361952/CA6BAE070B97065FD8C4E835C6A471BDC2E32515/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" },
  ])
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  // Load prizeForWinning from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedPrizes = localStorage.getItem('prizeForWinning');
      if (savedPrizes) {
        try {
          const parsedPrizes = JSON.parse(savedPrizes);
          setPrizeForWinning(parsedPrizes);
        } catch (error) {
          console.error('Error parsing saved prizes from localStorage:', error);
        }
      }
    }
  }, []);

  // Save prizeForWinning to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage && prizeForWinning.length < 4) {
      localStorage.setItem('prizeForWinning', JSON.stringify(prizeForWinning));
    }
  }, [prizeForWinning]);

  // Sample prizes - you can customize this list
  const prizes = [
    { name: "Подарочная карта", imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop" },
    { name: "Игровая консоль", imageUrl: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=200&h=200&fit=crop" },
    { name: "Кофеварка", imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=200&h=200&fit=crop" },
    { name: "Чайник", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBJJiLLm2vI_48i2GB04C-HwGc4r_gK-yDwg&s" },
    { name: "AirPods Pro", imageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop" },
    { name: "Стул", imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&h=200&fit=crop" },
    { name: "Smart TV", imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop" },
    { name: "Spotify Premium", imageUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop" },
    { name: "Вода 17л", imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop" },
    { name: "Коллекия книг", imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop" },
    { name: "Набор для рисования", imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop" },
    { name: "5 пицц", imageUrl: "https://s1.eda.ru/StaticContent/Photos/Upscaled/120131085053/171027192707/p_O.jpg" },
    { name: "Fanta 3л", imageUrl: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop" },
    { name: "Tesla Model 3", imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200&h=200&fit=crop" },
    { name: "200 рублей", imageUrl: "https://www.hse.ru/data/2024/10/09/1885646824/3iStock-1387483791.jpg.(1000x1000x1).jpg" },
    { name: "Сертификат на маникюр", imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop" },
    { name: "Модная сумка", imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop" },
    { name: "Кепка", imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop" },
    { name: "Рюкзак", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop" },
    // { name: "Iphone 16", imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
    { name: "Колье", imageUrl: "https://static.insales-cdn.com/r/oPuyBKTQbCg/rs:fit:440:0:1/q:100/plain/images/products/1/3906/946499394/large_333.jpg@jpg" },
    { name: "Чашка", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Kaffeetasse_halbhoch_Golddekor_05%2C_KPM.jpg/960px-Kaffeetasse_halbhoch_Golddekor_05%2C_KPM.jpg" },
    { name: "Бомбочка для ванны", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEqPhLov4dYVu50n1LmEUoF475_HPOtzAzDw&s" },
    { name: "Плюшевые игрушки", imageUrl: "https://img.joomcdn.net/0ff9658dee9c3aea07a854c812620c4351995f49_400_400.jpeg" },
    { name: "Лампа", imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop" },
    { name: "Фонарик", imageUrl: "https://express72.ru/upload/resize_cache/iblock/f4f/ml1cha1xidg981oj6zmbl6re2fdpfq2q/520_520_140cd750bba9870f18aada2478b24840a/fonarik_akkumulyatornyy_s_fokusirovkoy_lucha_kirk_chernyy.jpg" },
    { name: "Зонтик", imageUrl: "https://images.prom.ua/5282139607_w600_h600_5282139607.jpg" },
    { name: "1200 рублей", imageUrl: "https://www.hse.ru/data/2024/10/09/1885646824/3iStock-1387483791.jpg.(1000x1000x1).jpg" },
    { name: "Фен-стайлер", imageUrl: "https://basket-15.wbbasket.ru/vol2366/part236654/236654935/images/big/1.webp" },
    { name: "Наушники Apple", imageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop" },
    { name: "Samsung Galaxy S24", imageUrl: "https://www.smartech.com.cy/wp-content/uploads/2023/02/1676673058_s23black.jpg" },
    { name: "50 рублей", imageUrl: "https://www.hse.ru/data/2024/10/09/1885646824/3iStock-1387483791.jpg.(1000x1000x1).jpg" },
    { name: "Скидка 20% на шуруповерт", imageUrl: "https://machtz.com.ua/files/resized/products/11114_800h800_1.1.800x850.jpg" },
    { name: "Стиральная машина", imageUrl: "https://siemens-centre.ru/upload/resize_cache/iblock/ad5/pnr5zzxj1w7mmvptek680t300is4lysm/553_440_1/192375.jpg" },
    { name: "Умная лампочка", imageUrl: "https://loft-concept.ru/upload/iblock/d81/lamochka-loft-edison-retro-bulb-_5.jpg" },
    { name: "Стиральный порошок 10кг", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8yrKW16okyTr5ZpurqwM_vZlLxEKiSUXnrw&s" },
    { name: "Косметичка", imageUrl: "https://images.prom.ua/5226651031_w600_h600_5226651031.jpg" },
    { name: "Уход для волос", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFhdS831mg3H-wUrifARO-SZEwSlPGxWdsTA&s" },
    { name: "Премиальный шампунь", imageUrl: "https://cdn.davines.ru/wp-content/uploads/2019/04/davines-71212-purifying-shampoo-250ml-8004608236580-1.jpg" },
    { name: "Поход в Novikov School", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxWx21eelKT2Agd5chVPSVWWkabV58feHEPA&s" },
    { name: "Билеты в кино", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=200&fit=crop" },
    { name: "Билеты в театр", imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=200&h=200&fit=crop" },
    { name: "Ланчбокс", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROaoztfTPMxhMxjqgkP63ZatU5fzUUgIEBfw&s" },
    { name: "Скидка 50% на парфюмерию", imageUrl: "https://faberlic.com/images/belarus/Bonus-12-2018.jpg" },
    { name: "Духи", imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop" },
    { name: "Секретный приз", imageUrl: "https://images.steamusercontent.com/ugc/44574410608361952/CA6BAE070B97065FD8C4E835C6A471BDC2E32515/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" },
  ];

  // Duplicate prizes for seamless scrolling
  const scrollingPrizes = [...prizes, ...prizes, ...prizes];

  const startSpin = () => {
    setIsSpinning(true);
    setShowResult(false);
    setSelectedPrize(null);
    
    // Start the scrolling animation
    if (scrollRef.current) {
      scrollRef.current.style.animation = 'scrollPrizes 0.5s linear infinite';
    }
  };

  const stopSpin = () => {
    setShowResult(false);
    
    // Stop the scrolling animation
    if (scrollRef.current) {
      scrollRef.current.style.animation = 'none';
    }

    // Select a random prize
    // const randomIndex = Math.floor(Math.random() * prizes.length);
    // const prize = prizes[randomIndex];
    setSelectedPrize(prizeForWinning[0]);
    setPrizeForWinning(prizeForWinning.slice(1));

    // setShowResult(true);
  };

  useEffect(() => {
    if (isSpinning) {
      // Spin for 3-5 seconds then stop
      const spinDuration = Math.random() * 10000 + 3000; // 3-5 seconds
      animationRef.current = setTimeout(stopSpin, spinDuration);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isSpinning]);

  const onPrizeGot = () => {
    setIsSpinning(false);
  }

  return (
    <div className="App">
      <div className="wheel-container">
        <h1 className="title">🎰 Любовное колесо призов 💖</h1>
        
        <div className="prize-display">
          <PrizeScroll
            prizes={scrollingPrizes}
            isSpinning={isSpinning}
            prizeWeGot={selectedPrize}
            onPrizeGot={onPrizeGot}
          />
          {/* <div className="prize-window">
            <div className="prize-list" ref={scrollRef}>
              {scrollingPrizes.map((prize, index) => (
                <div key={index} className="prize-item">
                  {prize}
                </div>
              ))}
            </div>
            <div className="selection-indicator"></div>
          </div> */}
        </div>

        <div className="spins-remaining">
          осталось спинов: {prizeForWinning.length}
        </div>

        <button 
          className={`spin-button ${isSpinning ? 'spinning' : ''}`}
          onClick={startSpin}
          disabled={isSpinning || prizeForWinning.length === 0}
        >
          {prizeForWinning.length === 0 ? 'Призы разыграны!' : isSpinning ? '🎲 Ищем самый крутой приз...' : '🎲 КРУТИТЬ!!!'}
        </button>

        {/* {showResult && selectedPrize && (
          <div className="result-modal">
            <div className="result-content">
              <h2>🎉 Congratulations! 🎉</h2>
              <p className="selected-prize">You won:</p>
              <h3 className="prize-text">{selectedPrize}</h3>
              <button 
                className="spin-again-button"
                onClick={() => setShowResult(false)}
              >
                Spin Again
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default App;
