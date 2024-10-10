import { useState } from 'react';
import Plot from 'react-plotly.js'

const Compare = () => {

  const [demographic, setDemographic] = useState('African-American');

  const boxwhisker = [
    { y: [10, 15, 20], name: 'District 1', type: 'box' },
    { y: [30, 35, 40], name: 'District 2', type: 'box' },
    { y: [45, 50, 55], name: 'District 3', type: 'box' },
    { y: [65, 70, 75], name: 'District 4', type: 'box' },
    { y: [45, 55, 65], name: 'Multi-Member District', type: 'box' }

  ];

  const compareComponent = () => {
    const [demographic, setDemographic] = useState('African-American');
  }

  return (
    <div className="Compare" >
          <h2>Compare</h2>
          <br />
          <p style={{ marginBottom: '20px' }}>This section provides graphics to compare the the results of an SMD election and MMD election </p>

          <h3>Box and Whisker Analysis</h3>

          <select
            style={{ marginBottom: '20px' }}
            value={demographic}
            onChange={(e) => setDemographic(e.target.value)}
          >
            <option value="White">White</option>
            <option value="African-American">African-American</option>
            <option value="Asian">Asian</option>
            <option value="Hispanic">Hispanic</option>
            <option value="Others">Others</option>
          </select>
            <Plot
              data={boxwhisker}
              layout={{ 
                title: 'SMDs vs MMD Distribution of Race', 
                yaxis: { 
                  title: 'Percentage (%)', 
                  range: [0, 100],
                  dtick: 10        
                }, 
                width: 380,
                showlegend: false
              }}
            />

        </div>
  )
}

export default Compare