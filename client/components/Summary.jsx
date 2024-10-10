import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js', {ssr: false}));

const Summary = ({data, layout}) => {
  return (
    <div className="summary">
          <h2>Summary</h2>
          {/* <Plot data={NV_election_res_data} layout={NV_election_res_layout} config={{displayModeBar: false}}/> */}
          <Plot data={data} layout={layout} config={{displayModeBar: false}}/>
        </div>
  )
}

export default Summary