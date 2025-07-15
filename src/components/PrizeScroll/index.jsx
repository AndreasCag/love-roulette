import { useSpringValue, animated } from "@react-spring/web";
import React, { useEffect, useState, useRef } from "react";

const prizeAmount = 40;
const topStartFrom = -3000;
const prizeSize = 220;

const PrizeScroll = ({ prizes, isSpinning, prizeWeGot, onPrizeGot }) => {
    const containerRef = useRef();
    const [containerHeight, setContainerHeight] = useState(0);
    const [spinningPrizes, setSpinningPrizes] = useState([]);
    const [randomPlaceOfSelector, setRandomPlaceOfSelector] = useState(0);
    const [time, setTime] = useState(0);
    const [oldTime, setOldTime] = useState(0);
    const speed = useSpringValue(100, {
        config: {
          mass: 1,
          friction: 5,
          tension: 40,
        },
      })

    useEffect(() => {
        // set setRandomPlaceOfSelector as random from -150 to 150
        setRandomPlaceOfSelector(Math.floor(Math.random() * 180) - 90);
    }, [prizeWeGot])
    
    useEffect(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.offsetHeight);
        }
    }, [containerRef.current]);

    useEffect(() => {
        if (isSpinning && !prizeWeGot) {
            speed.start(-200);
            setTimeout(() => {
                speed.start(2000);
            }, 500);
        } else if (prizeWeGot) {
            //
            // speed.start(500);
        } else {
            speed.start(50);
        }
    }, [isSpinning, speed])

    useEffect(() => {
        const formInitialPrizes = () => {
            const newPrizes = [];
            for (let i = 0; i < prizeAmount; i++) {
                const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
                newPrizes.push({
                    id: Math.random(),
                    prize: randomPrize,
                    top: topStartFrom + (i * prizeSize),
                })
            }
            setSpinningPrizes(newPrizes);
        }

        formInitialPrizes();
    }, [])

    useEffect(() => {
        setOldTime(Date.now());

        const intervalId = setInterval(() => {
            setTime(Date.now());
        }, 1);

        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        if (spinningPrizes.length === 0) {
            return;
        }

        const timeDiff = (time - oldTime) / 1000;
        const currentSpeed = speed.get();
        const newPrizes = spinningPrizes.map((prize, index) => {
            return {
                ...prize,
                top: prize.top + (timeDiff * currentSpeed)
            }
        })

        if (newPrizes[0].top > topStartFrom + prizeSize) {
            const isPrizeWeGotInArray = spinningPrizes.find(prize => prize.prize === prizeWeGot);
            
            let randomPrize;
            if (!!prizeWeGot && !isPrizeWeGotInArray) {
                randomPrize = prizeWeGot
                console.log('Adding prize we got', prizeWeGot);
            } else {
                randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
            }
            newPrizes.unshift({
                id: Math.random(),
                prize: randomPrize,
                top: topStartFrom,
            })
            newPrizes.pop();
        }

        setSpinningPrizes(newPrizes);
        setOldTime(time);
    }, [time, speed])

    useEffect(() => {
        const prizeWeGotInArray = spinningPrizes.find(prize => prize.prize === prizeWeGot);

        if (!prizeWeGotInArray) {
            return;
        }

        const topBoundary = containerHeight / 2 - prizeSize / 2 - 15 + randomPlaceOfSelector;
        const bottomBoundary = topStartFrom;

        const maxSpeed = 1000;
        const minSpeed = 100;

        const currentTop = Math.min(prizeWeGotInArray.top, topBoundary);

        const speedToUse = maxSpeed - (currentTop - bottomBoundary) / (topBoundary - bottomBoundary) * (maxSpeed - minSpeed);

        if (currentTop < topBoundary) {
            speed.set(speedToUse);
        } else {
            speed.start(0);
            onPrizeGot();
        }
    }, [time]);

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100vw', height: '100%' }}>
            {/* Triangle indicator at center */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '15%',
                transform: 'translate(-50%, -50%)',

                width: 0,
                height: 0,
                borderTop: '15px solid transparent',
                borderBottom: '15px solid transparent',
                borderLeft: '20px solid rgba(255, 255, 255, 0.8)',
                zIndex: 10,
                pointerEvents: 'none',
            }} />

            <div style={{
                position: 'absolute',
                top: '50%',
                left: '85%',
                transform: 'translate(-50%, -50%)',
                width: 0,
                height: 0,
                borderTop: '15px solid transparent',
                borderBottom: '15px solid transparent',
                borderRight: '20px solid rgba(255, 255, 255, 0.8)',
                zIndex: 10,
                pointerEvents: 'none',
            }} />
            
            {spinningPrizes.map((prize, index) => (
                <animated.div key={prize.id} style={{
                    position: 'absolute',
                    top: prize.top,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200px',
                    height: '200px',
                    backgroundColor: 'white',
                    marginTop: '10px',
                    marginBottom: '10px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    border: '2px solid #f0f0f0',
                }}>
                    <img 
                        src={prize.prize.imageUrl} 
                        alt={prize.prize.name}
                        style={{
                            width: '120px',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '8px'
                        }}
                    />
                    <div style={{
                        fontSize: '12px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#333',
                        padding: '0 8px'
                    }}>
                        {prize.prize.name}
                    </div>
                </animated.div>
            ))}
        </div>
    )
}

export default PrizeScroll;