import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAppSelector } from '../../hooks/hooks';

const CoinChart = (): JSX.Element => {
    const {coins} = useAppSelector(state => state)

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 15
                    },
                    color: '#EAEBED',
                    useBorderRadius: true,
                    borderRadius: 2,
                    boxHeight: 3
                }
            },
            title: {
                display: false,
                text: 'Title',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#EAEBED'
                }
            },
            y: {
                ticks: {
                    color: '#EAEBED'
                }
            }
        }
    };
    
    const labels = coins.map(item => item.symbol);
    
    const data = {
        labels,
        datasets: [
        {
            label: 'Volume $ (x10 million)',
            data: coins.map(item => String(Number(item.quoteVolume) / 10000000)),
            backgroundColor: '#DAA320',
            borderRadius: 50,
        },
        {
            label: 'Change %',
            data: coins.map(item => item.priceChangePercent),
            backgroundColor: '#96E5D1',
            borderRadius: 50
        },
        ],
    };

    return(
            <Bar options={options} data={data} />
    )
}

export default CoinChart;