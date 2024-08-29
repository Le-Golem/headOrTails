'use client';

import { useEffect, useState } from 'react';
import { getRandomNumber } from './utils';

const playerList: { name: string; id: number }[] = [
  { name: 'Alexis', id: 0 },
  { name: 'Cédric', id: 1 },
  { name: 'Malcolm', id: 2 },
  { name: 'Maxime', id: 3 },
  { name: 'Romane', id: 4 },
];

export default function Home() {
  const [firstPage , setFirstPage] = useState(false)
  const [startPlay , setStartPlay] = useState<boolean>(false)
  const [firstPerson, setFirstPerson] = useState<{ name: string; id: number } | undefined>(undefined);
  const [secondPerson, setSecondPerson] = useState<{ name: string; id: number } | undefined>(undefined);
  const [headOrTailsResult , setHeadOrTailsResult] = useState<string>("")
  const [personChoice , setPersonChoice]= useState<string>("")

  const startPlayFunction = () => {
    const randomId = getRandomNumber(playerList.length);
    let randomId2 = getRandomNumber(playerList.length);
    while (randomId2 === randomId) {
      randomId2 = getRandomNumber(playerList.length);
    }
    const firstPerson = playerList.find((player) => player.id === randomId);
    const secondPerson = playerList.find((player) => player.id === randomId2);
    setFirstPerson(firstPerson);
    setSecondPerson(secondPerson);
    setStartPlay(true)
  };

  const checkWin = (headOrTailsNumber : number) => {
    const randomId = getRandomNumber(2);
    if (headOrTailsNumber != randomId) {
      setHeadOrTailsResult("perdu")
    } else {
      setHeadOrTailsResult("gagné")
    }
  } 

  useEffect(() => { 
    setHeadOrTailsResult("")
    if (firstPerson && secondPerson) {
      const randomNumber = getRandomNumber(2);
      setPersonChoice(randomNumber === 0 ? firstPerson.name : secondPerson.name);
    }
  }, [firstPerson, secondPerson]);
  

  return (
    <article>
    {firstPage ?
      <>
      <div className='flex justify-center items-center h-screen' >
        <button onClick={() => setFirstPage(false)} className='bg-slate-700'>Start</button>
      </div>
      </>
    : <>
      <div className='h-screen'>
      <section className='flex gap-8 justify-center h-12 w-screen mt-24'>
        <div className='bg-slate-50 h-8 w-32 flex justify-center'>
          <p style={{color : "black"}}>
            {firstPerson ? firstPerson.name : ''}
          </p>
        </div>
        <p>X</p> 
        <div className='bg-slate-50 h-8 w-32 flex justify-center'>
        <p style={{color : "black"}}>
            {secondPerson ? secondPerson.name : ''}
          </p>
        </div>
      </section>
        <div className='w-screen flex justify-center'>
          <button onClick={startPlayFunction}>Random</button>
        </div>
        {firstPerson &&
        secondPerson &&
        firstPerson.name != "" &&
        secondPerson.name != "" && 
          <section className='bg-slate-50 w-screen h-32  mt-8'>
            <div className='flex justify-center items-center'>
            <p style={{color : "black"}}>{personChoice} choisis pile ou face</p>
            </div>
            <div className='flex gap-8 w-screen justify-center mt-8' >
              <button onClick={() => checkWin(0)} style={{color : "black"}}>pile</button>
              <button onClick={() => checkWin(1)} style={{color : "black"}}>face</button>
            </div>
            {headOrTailsResult != "" && <p style={{color : "black"}} className='flex justify-center items-center' >{headOrTailsResult}</p>} 
          </section>
        }
      </div>
    </> }

      
      
      
      
      
      
      {/* <p>ceci est un test</p>
      <p>{firstPerson ? firstPerson.name : 'Aucun joueur sélectionné'}</p>
      <p>{secondPerson ? secondPerson.name : 'Aucun joueur sélectionné'}</p>

    <div className='bg-slate-700 flex flex-col'>
      <button onClick={startPlayFunction}>Play</button>
      {startPlay && 
      <>
        <button onClick={headOrTailsFunction}>Pile ou face</button> 
        <p>{headOrTails != "" && headOrTails}</p> 
      </>
      }
    </div>  */}
    </article>
  );
}
