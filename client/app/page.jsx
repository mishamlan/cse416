import Map from "@/components/Map"

const Home = () => {

  return (
    <div>
      <Map />
      <div className="legend">
        <div><div id="black-line"></div> : State</div>
        <div><div id="green-line"></div> : District</div>
        <div><div id="purple-line"></div> : Precinct</div>
      </div>
    </div>
  )
}

export default Home
