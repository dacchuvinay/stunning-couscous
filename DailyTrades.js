import { useState } from 'react';
import { BarChart, Bar } from 'recharts';

export default function DailyTrades() {
  const [trades, setTrades] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleTradeSelect = (value) => {
    const updatedTrades = [...trades];
    updatedTrades[selectedCell] = value;
    setTrades(updatedTrades);
  };

  return (
    <div>
      <h2>Daily Trades</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>Trade 1</th>
            <th>Trade 2</th>
            <th>Trade 3</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) => (
            <tr key={index}>
              <td>{new Date().toLocaleDateString()}</td>
              <td>{day}</td>
              {[0, 1, 2].map((col) => (
                <td
                  key={col}
                  style={{ 
                    background: trades[index * 3 + col] === 'Target Hit' ? '#90EE90' :
                    trades[index * 3 + col] === 'Stop Loss' ? '#FFCCCB' : 'white'
                  }}
                  onClick={() => setSelectedCell(index * 3 + col)}
                >
                  {selectedCell === index * 3 + col && (
                    <div>
                      <button onClick={() => handleTradeSelect('Target Hit')}>✅</button>
                      <button onClick={() => handleTradeSelect('Stop Loss')}>❌</button>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <BarChart width={400} height={200} data={trades}>
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}