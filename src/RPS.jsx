import { useState, useEffect } from 'react';

const game = [
    {
        link: "https://em-content.zobj.net/thumbs/240/apple/354/raised-fist_270a.png",
        name: "ROCK"
    },
    {
        link: "https://em-content.zobj.net/thumbs/240/apple/354/raised-hand_270b.png",
        name: "PAPER"
    },
    {
        link: "https://em-content.zobj.net/thumbs/240/apple/354/victory-hand_270c-fe0f.png",
        name: "SCISSORS"
    }
];

export default function RPS() {
    const [wins, setWins] = useState(() => JSON.parse(localStorage.getItem("wins")) || 0);
    const [losses, setLosses] = useState(() => JSON.parse(localStorage.getItem("losses")) || 0);
    const [draws, setDraws] = useState(() => JSON.parse(localStorage.getItem("draws")) || 0);

    const [userMove, setUserMove] = useState(game[0].link);
    const [userMoveDetails, setUserMoveDetails] = useState("ROCK");
    const [comMove, setComputerMove] = useState(game[0].link);
    const [comMoveDetails, setComputerMoveDetails] = useState("ROCK");
    const [result, setResult] = useState("DRAW");
    const [hasPlayed, setHasPlayed] = useState(false);


    const userMoveHandler = (index) => {
        setUserMove(game[index].link);
        setUserMoveDetails(game[index].name);
        comMoveHandler();
        setHasPlayed(true);
    }

    const comMoveHandler = () => {
        let move = Math.floor(Math.random() * 3);
        setComputerMove(game[move].link);
        setComputerMoveDetails(game[move].name);
    }

    const reset = () => {
        localStorage.clear();
        setWins(0);
        setLosses(0);
        setDraws(0);
    }

    useEffect(() => {
        if (!hasPlayed) return;
        
        let outcome = "DRAW";

        if (userMoveDetails === "PAPER" && comMoveDetails === "ROCK")
            outcome = "YOU WIN";
        else if (userMoveDetails === "ROCK" && comMoveDetails === "PAPER")
            outcome = "YOU LOST";
        else if (userMoveDetails === "SCISSORS" && comMoveDetails === "PAPER")
            outcome = "YOU WIN";
        else if (userMoveDetails === "PAPER" && comMoveDetails === "SCISSORS")
            outcome = "YOU LOST";
        else if (userMoveDetails === "ROCK" && comMoveDetails === "SCISSORS")
            outcome = "YOU WIN";
        else if (userMoveDetails === "SCISSORS" && comMoveDetails === "ROCK")
            outcome = "YOU LOST";

        setResult(outcome);

        if (outcome === "DRAW") 
        {
            setDraws(prev => {
                const updated = prev + 1;
                localStorage.setItem("draws", JSON.stringify(updated));
                return updated;
            });
        } 
        else if (outcome === "YOU WIN") 
        {
            setWins(prev => {
                const updated = prev + 1;
                localStorage.setItem("wins", JSON.stringify(updated));
                return updated;
            });
        } 
        else 
        {
            setLosses(prev => {
                const updated = prev + 1;
                localStorage.setItem("losses", JSON.stringify(updated));
                return updated;
            });
        }
    }, [userMoveDetails, comMoveDetails]);

    const buttonStyle = 'p-4 w-15 border cursor-pointer duration-300 rounded-full bg-[rgba(100,100,100,0.95)] hover:bg-[rgba(100,100,100,0.80)] hover:border-white';

    return (
        <div className='h-screen flex items-center justify-center rounded-2xl'>
            <div className='space-y-4'>
                <div>
                    <p className='text-white text-center text-lg'>ROCK PAPER SCISSORS</p>
                    <p className='text-white text-center text-sm'>(React js + Tailwind CSS)</p>
                </div>

                <div className='flex gap-3 justify-center'>
                    {game.map((move, index) => (
                        <div key={index}>
                            <button
                                className={buttonStyle}
                                onClick={() => userMoveHandler(index)}
                            >
                                <img className='object-contain' src={move.link} />
                            </button>
                        </div>
                    ))}
                </div>

                <div>
                    <p className='text-center text-lg text-white underline'>RESULT</p>
                    <p className='text-center text-white text-lg font-bold'>{result}!</p>
                </div>

                <div className='border border-white rounded-2xl p-3 px-4 space-y-3'>
                    <div className='flex justify-around text-white font-semibold text-sm'>
                        <p>YourMove</p>
                        <p>ComMove</p>
                    </div>

                    <div className='flex justify-around'>
                        <div className={buttonStyle}>
                            <img src={userMove} alt={userMoveDetails} />
                        </div>
                        <div className={buttonStyle}>
                            <img src={comMove} alt={comMoveDetails} />
                        </div>
                    </div>

                    <div className='flex justify-around text-white'>
                        <p>{userMoveDetails}</p>
                        <p>{comMoveDetails}</p>
                    </div>
                </div>

                <div className='text-white flex items-center justify-around'>
                    <p>W : {wins}</p>
                    <p>L : {losses}</p>
                    <p>D : {draws}</p>
                </div>

                <div className='text-white flex items-center justify-center'>
                    <button
                        onClick={reset}
                        className='duration-300 border border-white py-1 px-5 rounded-lg cursor-pointer hover:scale-104'
                    >
                        RESET
                    </button>
                </div>
            </div>
        </div>
    );
}
