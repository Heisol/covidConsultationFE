import React, { useEffect, useState } from 'react'
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import '../App.css'

const Tips = () => {

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            //entry.target.setAttribute('style', `display: ${entry.isIntersecting ? 'block' : 'none'}`)
            //entry.target.setAttribute('visibility', entry.isIntersecting ? 'visible' : 'hidden')
            entry.target.classList.toggle('show', entry.isIntersecting)
        })
    }, {
        threshold: 0.75
    })

    const [cards, setCards] = useState('')

    useEffect(() => {
        if (!cards) {
            fetch('https://consultation19-server.herokuapp.com/covid19').then((res, err) => {
                if (err) {
                    alert(`Error fetching (${err.message})`)
                    return
                }
                else { return res.json() }
            }).then((resJson) => {
                setCards(resJson.items)
                console.log(cards)
                let cardElement = document.querySelectorAll('.card')
                cardElement.forEach(card => {
                    observer.observe(card)
                })
            })
        }
    }, [])

    return (
        <div className='container'>
            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
            <TipsComponents id='#staticBackdrop' /> */}
            {/* <div class="card" style={{ width: '18rem' }}>
                <img src="..." class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div> */}
            {cards === '' ? <Spinner size={30} color='green' /> :
                cards.map(item => {
                    return (
                        <div className="card" key={item.id + 1}>
                            <div class="card-body">
                                <h5 class="card-title">Card title: {item.title}</h5>
                                <p class="card-text">{item.text}</p>
                                {item.link !== undefined && <p>This information is from <a href={item.link} target='_blank' class="btn btn-primary">{item.linkShortHand}</a></p>}
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default Tips
