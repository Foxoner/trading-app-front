import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICoin } from "../../models/ICoin";

interface MainState {
    coins: ICoin[];
    btcPrice: string;
    btcPercent: string;
    coinsPercent: string;
    connected: boolean;
    username: string;
}

const initialState: MainState = {
    coins: [],
    btcPrice: '',
    btcPercent: '',
    coinsPercent: '',
    connected: false,
    username: 'Admin'
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setBtcPrice(state, action: PayloadAction<string>) {
            state.btcPrice = action.payload;
        },
        setBtcPercent(state, action: PayloadAction<string>) {
            state.btcPercent = action.payload;
        },
        setCoinsPercent(state, action: PayloadAction<string>) {
            state.coinsPercent = action.payload;
        },
        fetchingCoins(state, action: PayloadAction<ICoin[]>) {
            state.coins = action.payload;
        },
        onConnecting(state, action: PayloadAction<string>) {
            state.username = action.payload;
            state.connected = true;
        }
    }
})

export default mainSlice.reducer