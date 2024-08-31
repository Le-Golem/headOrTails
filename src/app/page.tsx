'use client';

import { useEffect, useState } from 'react';
import { getRandomNumber } from './utils';  // Assurez-vous que cette fonction est correctement définie et importée

const playerList = [
  { name: 'Alexis', id: 0 },
  { name: 'Cédric', id: 1 },
  { name: 'Malcolm', id: 2 },
  { name: 'Maxime', id: 3 },
  { name: 'Romane', id: 4 },
];

export default function Home() {
  const [startPlay, setStartPlay] = useState<boolean>(false);
  const [firstPerson, setFirstPerson] = useState<{ name: string; id: number } | undefined>(undefined);
  const [secondPerson, setSecondPerson] = useState<{ name: string; id: number } | undefined>(undefined);
  const [headOrTailsResult, setHeadOrTailsResult] = useState<string>("");
  const [personChoice, setPersonChoice] = useState<string>("");

  const handleFirstPersonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedPerson = playerList.find((player) => player.id === selectedId);
    setFirstPerson(selectedPerson);
    if (selectedPerson?.id === secondPerson?.id) {
      setSecondPerson(undefined);  // Réinitialiser le second choix s'il est égal au premier
    }
  };

  const handleSecondPersonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedPerson = playerList.find((player) => player.id === selectedId);
    setSecondPerson(selectedPerson);
  };

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
  };

  const checkWin = (headOrTailsNumber: number) => {
    const randomId = getRandomNumber(2);
    if (headOrTailsNumber !== randomId) {
      setHeadOrTailsResult("perdu");
    } else {
      setHeadOrTailsResult("gagné");
    }
  };

  useEffect(() => {
    setHeadOrTailsResult("");
    if (firstPerson && secondPerson) {
      const randomNumber = getRandomNumber(2);
      setPersonChoice(randomNumber === 0 ? firstPerson.name : secondPerson.name);
    }
  }, [firstPerson, secondPerson]);

  return (
    <article className='bg-sky-900 w-screen h-screen'>
      <section className='w-screen h-32 pt-4 pb-4 flex items-center justify-center'>
        <h1 className="text-7xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>Pile ou face</h1>
      </section>

      <section className='pl-4 w-screen h-32 flex gap-8 justify-center items-center'>
        <div className='flex flex-col'>
          <label htmlFor="firstPersonSelect">1ère personne :</label>
          <select className='w-36 h-14 text-black' id="firstPersonSelect" value={firstPerson?.id ?? ''} onChange={handleFirstPersonChange}>
            <option value="" disabled>Sélectionnez une personne</option>
            {playerList.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <label htmlFor="secondPersonSelect">2ème personne :</label>
          <select
            className='w-36 h-14 text-black'
            id="secondPersonSelect"
            value={secondPerson?.id ?? ''}
            onChange={handleSecondPersonChange}
            disabled={!firstPerson}
          >
            <option value="" disabled>Sélectionnez une personne</option>
            {playerList
              .filter((player) => player.id !== firstPerson?.id) // Exclure la première personne sélectionnée
              .map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
          </select>
        </div>
        <div className='border-2 p-4 rounded-xl mt-6'>
         <button onClick={startPlayFunction}>Random</button>
        </div>
      </section>

      <section className='flex w-screen justify-center items-center'>
        {firstPerson &&
              secondPerson &&
              firstPerson.name != "" &&
              secondPerson.name != "" && 
          <article className='flex w-11/12 justify-center rounded-xl border-2 flex-col items-center mt-8'>
            <p className='mt-4'>{personChoice} choisis Pile ou face</p>

            <div className='flex gap-8 mt-8 mb-8' >
              <button className='border-2 p-4 rounded-xl w-24 hover:bg-zinc-100 hover:text-black transition ease-in-out delay-50' onClick={() => checkWin(0)}>pile</button>
              <button className='border-2 p-4 rounded-xl w-24 hover:bg-zinc-100 hover:text-black transition ease-in-out delay-50' onClick={() => checkWin(1)}>face</button>
            </div>

            {headOrTailsResult != "" && <p className='flex justify-center items-center pb-8' >{headOrTailsResult}</p>} 
          </article>
        }
      </section>

            {/* 
              <section className='bg-sky-900 w-11/12 h-32  mt-8'>
                <div className='flex justify-center items-center'>
                <p style={{color : "black"}}>{personChoice} choisis pile ou face</p>
                </div>
                <div className='flex gap-8 w-screen justify-center mt-8' >
                  <button onClick={() => checkWin(0)} style={{color : "black"}}>pile</button>
                  <button onClick={() => checkWin(1)} style={{color : "black"}}>face</button>
                </div>
                {headOrTailsResult != "" && <p style={{color : "black"}} className='flex justify-center items-center' >{headOrTailsResult}</p>} 
              </section>
            } */}
    </article>
  );
}
