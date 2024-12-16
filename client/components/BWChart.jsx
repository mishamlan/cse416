import dynamic from 'next/dynamic'
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, });

const BWChart = ({data, selectBasis}) => {
  return (
    <div>
      <div className='setting-dropdown'>
        <span>Basis</span>
        <select name="basis" id="basis" className='dropdown-menu w-full h-full' onChange={selectBasis}>
          <option value="white-population">White Population</option>
          <option value="black-population">Black Population</option>
          <option value="asian-population">Asian Population</option>
          <option value="hispanic-population">Hispanic Population</option>
          <option value="democratic-population">Democratic Population</option>
          <option value="republican-population">Republican Population</option>
        </select>
      </div>
      <Plot
        data={data}
        layout={{  
          yaxis: { 
            title: 'Percentage (%)', 
            range: [0, 100],
            dtick: 10        
          }, 
          showlegend: true
        }}
      />
    </div>
  )
}

export default BWChart