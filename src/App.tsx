import React, { useRef } from 'react';
import './App.scss';
import CoinCard from './components/CoinCard/CoinCard';
import CoinChart from './components/CoinChart/CoinChart';
import Placeholder from './components/Placeholder/Placeholder';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { mainSlice } from './store/reducers/mainSlice';

import logoTelegram from './assets/telegram.png';


function App() {
  const { coins, btcPrice, btcPercent, coinsPercent, connected, username } = useAppSelector(state => state)
  const { fetchingCoins, setBtcPrice, setBtcPercent, setCoinsPercent, onConnecting } = mainSlice.actions
  const dispatch = useAppDispatch()
  const socket: any = useRef()

  // -------------- WebSocket connection --------------
  const connect = (): void => {
    
    socket.current = new WebSocket('https://13.40.118.96:8000')

    socket.current.onopen = () => {
        dispatch(onConnecting(username))
        console.log(`Connected ${username}`)
    }
    socket.current.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data)
        dispatch(fetchingCoins(data.data.coins))
        dispatch(setBtcPrice(Number(data.data.btc.bidPrice).toFixed(2)))
        dispatch(setBtcPercent(data.data.btc.priceChangePercent))
        dispatch(setCoinsPercent(data.coinchange))
    }
    socket.current.onclose = () => {
        console.log('Socket close')
    }
    socket.current.onerror = () => {
        console.log('Socket errror!')
    }
  }

  // ---------------------------------------------------

  const onSetCoinPercent = (): void => {
    const newPercent: string = prompt('Set new coin % Change: ') || '';
    dispatch(setCoinsPercent(newPercent))
    socket.current.send(JSON.stringify(newPercent))
  }

  if (!connected) {
    return (
      <div className="auth-container" onClick={connect}>
        <p>START</p>
      </div>
    )
  }

  return (
    <div className="App">
      <div className='app-container'>
        <div className="app-block block1">
          <div className="block1__user-conteiner">
            <div className="block1__user-conteiner__connection">
              {connected ? 
              <p className='connected'>Connected</p> : 
              <p className='disconnected'>Disconnected</p> 
              }
            </div>
            <div className="block1__user-conteiner__user">
              <div className="user-avatar">
                <img src="https://images.unsplash.com/photo-1675610157936-3f1c23c00432?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80" alt="User logo" />
              </div>
              <div className="user-name">
                <p>{username}</p>
              </div>
            </div>
            <div className="block1__telegram">
              <img src={logoTelegram} alt="telegram-logo" />
              <a href='http://t.me/MyPerspectiveCoinsBot' className="telegram-link" target="_blank">Join to Telegram Bot</a>
            </div>
          </div>
        </div>
        <div className="app-block block2">
          <div className="block2__info">
            <p className="title">BTC</p>
            <p className="price">Price: {btcPrice}$</p>
            <p className="change">Change: {btcPercent}%</p>
          </div>
          <div className="block2__update">
            <p>Set coins change percent</p>
            <div className="block2__update__coins" onClick={onSetCoinPercent}>
              <p>{coinsPercent}</p>
            </div>
          </div>
        </div>
        <div className="app-block block3">
          <div className="block3__title">
            <p className='coin'>Coin</p>
            <p>% Change</p>
            <p>Price</p>
          </div>
          <div className="block3__coins-list">
            {coins.length ? 
            coins.map(coin => 
              <CoinCard key={coin.symbol} coin={coin} />
            ) 
            : 
            <Placeholder />
            }
          </div>
        </div>
        <div className="app-block block4">
          <div className="block4__chart">
            {coins.length ? 
            <CoinChart /> 
            : <Placeholder />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
