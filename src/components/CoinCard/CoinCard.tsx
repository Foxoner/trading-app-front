
import { ICoin } from "../../models/ICoin";
import "./CoinCard.scss";

interface CoinCardProps {
    coin: ICoin;
}

const CoinCard = ({ coin }: CoinCardProps): JSX.Element => {
    return(
        <div className="coin-card">
            <div className="coin-card__symbol"><a href={`https://www.binance.com/uk-UA/trade/${coin.symbol}_BUSD?theme=dark&type=spot`} target="_blank">{coin.symbol}</a></div>
            <div className="coin-card__percent">{coin.priceChangePercent}</div>
            <div className="coin-card__price">{Number(coin.bidPrice).toFixed(4)}</div>
        </div>
    )
}

export default CoinCard;