import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import axios from 'axios';

const CardList = () => {
    const [cards, setCards] = useState([]);
    const [remaining, setRemaining] = useState(52);
    const [isShuffling, setIsShuffling] = useState(false);
    const deckIdRef = useRef(null);
  
    // Create a new deck when the component mounts
    useEffect(() => {
      async function createDeck() {
        const res = await axios.get('https://deckofcardsapi.com/api/deck/new/?deck_count=1');
        deckIdRef.current = res.data.deck_id;
      }
      createDeck();
    }, []);
  
    // Draw a card from the deck
    const drawCard = async () => {
      if (remaining === 0) {
        alert("Error: no cards remaining!");
        return;
      }
  
      const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/draw/?count=1`);
      if (res.data.success) {
        const card = res.data.cards[0];
        setCards(cards => [...cards, card]);
        setRemaining(res.data.remaining);
      } else {
        alert("Error: no cards remaining!");
      }
    };
  
    // Shuffle the deck and reset the state
    const shuffleDeck = async () => {
      setIsShuffling(true);
      const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/shuffle/`);
      if (res.data.success) {
        setCards([]);
        setRemaining(52);
      } else {
        alert("Error: could not shuffle the deck!");
      }
      setIsShuffling(false);
    };
  
    return (
      <div>
        <button onClick={drawCard} >
          Draw a Card
        </button>
        <button onClick={shuffleDeck} disabled={isShuffling}>
          {isShuffling ? "Shuffling..." : "Shuffle Deck"}
        </button>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {cards.map(card => (
            <Card key={card.code} image={card.image} />
          ))}
        </div>
      </div>
    );
};

export default CardList;
