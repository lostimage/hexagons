import React, {useEffect, useState} from 'react';
import {
    Player,
    ControlBar,
} from 'video-react'
import 'video-react/dist/video-react.css';
import classes from './Intro.module.css';

const quotes = [
    {cite: '"All ideas grow out of other ideas.”' , author : 'Anish Kapoor, Artist'},
    {cite: '“I write because I don’t know what I think until I read what I say.”' , author : 'Flannery O’Connor, Author'},
    {cite: '“What we call chaos is just patterns we haven’t recognized. What we call random is just patterns we can’t decipher.”' , author : 'Chuck Palahniuk, Journalist'},
    {cite: '“As soon as a thought darts, I write it down.”' , author : 'Thomas Hobbs, Philosopher'},
]

const Intro = (props) => {
    const [currentQuote, setCurrentQuote] = useState('')
    const [currentAuthor, setCurrentAuthor] = useState('')

    useEffect(() => {
            const quoteNumber = Math.floor(Math.random() * quotes.length);
            setCurrentQuote(quotes[quoteNumber]['cite'])
            setCurrentAuthor(quotes[quoteNumber]['author'])
        }
    )

    return (
        <div className={classes.intro}>
            <h1 className={classes.quote}>
                {currentQuote}
                <p>  {currentAuthor}</p>
            </h1>
            <div className={classes.videoWrapper}>
                <Player className={classes.video} autoPlay playsInline muted>
                    <source src={require('../../../assets/thinkfully.mp4')}/>
                    <ControlBar disabled>
                    </ControlBar>
                </Player>
            </div>
        </div>
    );
};

export default Intro;