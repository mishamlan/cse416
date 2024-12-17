import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { getBoxWhiskerData } from '@/app/api/utils'

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, });

const BoxNWhisker = ({tab, state}) => {

  const generalData = {
    "democratic": {
        "smd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        3.022891660883516,
                        5.18620860312616,
                        7.687414875491365,
                        8.005542410786633,
                        16.61482527460121
                    ]
                },
                "enacted": 7.799587855665941
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        4.88581387074119,
                        5.2926387469184055,
                        7.9253918239895995,
                        13.642257380229493,
                        26.708602257697812
                    ]
                },
                "enacted": 7.799587855665941
            },
            {
                "box": {
                    "district": 3,
                    "y": [
                        5.062065369492464,
                        7.799587855665941,
                        13.360793742075398,
                        17.27183202801522,
                        23.016823267929787
                    ]
                },
                "enacted": 7.799587855665941
            },
            {
                "box": {
                    "district": 4,
                    "y": [
                        0.0,
                        5.456129530203604,
                        10.592254940592888,
                        15.684030535962174,
                        21.023013740594426
                    ]
                },
                "enacted": 7.799587855665941
            },
            {
                "box": {
                    "district": 5,
                    "y": [
                        0.8267405734052555,
                        3.2562580252306637,
                        3.5143595413174267,
                        5.855359502949158,
                        18.62283431163903
                    ]
                },
                "enacted": 7.799587855665941
            },
            {
                "box": {
                    "district": 6,
                    "y": [
                        0.0,
                        4.626302867134529,
                        8.197055795648396,
                        15.592512403715595,
                        19.733520384713007
                    ]
                },
                "enacted": 7.799587855665941
            }
        ],
        "mmd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        4.403200741013553,
                        7.818043531174895,
                        8.992580804231856,
                        11.543035082751336,
                        13.145809446714276
                    ]
                },
                "enacted": 5.6910163916395415
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        4.913009043032942,
                        6.522108789979823,
                        9.190726098335096,
                        10.282816228631361,
                        13.590335086320609
                    ]
                },
                "enacted": 5.6910163916395415
            }
        ]
    },
    "republican": {
        "smd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        21.08223470931489,
                        29.97439471040093,
                        30.33207588392937,
                        31.497882899602704,
                        33.20949644115851
                    ]
                },
                "enacted": 30.434631263097067
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        7.945859845714411,
                        23.3663830339721,
                        30.30093711864797,
                        31.884848505381846,
                        32.38718357284589
                    ]
                },
                "enacted": 30.434631263097067
            },
            {
                "box": {
                    "district": 3,
                    "y": [
                        12.479038253341281,
                        19.64386822250749,
                        27.026966167575473,
                        30.434631263097067,
                        30.78086462841454
                    ]
                },
                "enacted": 30.434631263097067
            },
            {
                "box": {
                    "district": 4,
                    "y": [
                        14.510112388234017,
                        21.979182045188647,
                        28.0252060641146,
                        31.340768377805418,
                        36.901885425092175
                    ]
                },
                "enacted": 30.434631263097067
            },
            {
                "box": {
                    "district": 5,
                    "y": [
                        16.692729180015938,
                        31.57749619588725,
                        33.28121070119005,
                        33.28823211806448,
                        35.03944351391121
                    ]
                },
                "enacted": 30.434631263097067
            },
            {
                "box": {
                    "district": 6,
                    "y": [
                        18.37316750245248,
                        23.622697367197638,
                        29.8933648670065,
                        31.294062767698342,
                        35.3057722067205
                    ]
                },
                "enacted": 30.434631263097067
            }
        ],
        "mmd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        23.668411688934004,
                        26.418374241927857,
                        27.850002241448873,
                        29.081905132513974,
                        32.29064301660473
                    ]
                },
                "enacted": 32.00923898659866
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        24.224634154926232,
                        27.330879625448144,
                        28.513094641498228,
                        29.996083958945903,
                        32.81780351087901
                    ]
                },
                "enacted": 32.00923898659866
            }
        ]
    },
    "black": {
        "smd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        12.075522863631742,
                        27.07202668244289,
                        28.467446460661762,
                        34.36512807747883,
                        38.373488810769096
                    ]
                },
                "enacted": 23.264572992014703
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        19.907289098671157,
                        24.47713273434005,
                        27.585577830794385,
                        29.004493338921034,
                        56.19752068768064
                    ]
                },
                "enacted": 23.264572992014703
            },
            {
                "box": {
                    "district": 3,
                    "y": [
                        21.470044135274268,
                        23.264572992014703,
                        31.647527510843187,
                        32.06666418369718,
                        40.918893463063014
                    ]
                },
                "enacted": 23.264572992014703
            },
            {
                "box": {
                    "district": 4,
                    "y": [
                        17.75077651047894,
                        27.470944825847873,
                        30.692482263703464,
                        32.33634385735772,
                        38.262060961653155
                    ]
                },
                "enacted": 23.264572992014703
            },
            {
                "box": {
                    "district": 5,
                    "y": [
                        23.120029259954542,
                        32.64833945349961,
                        35.282719775492104,
                        35.41307785262509,
                        43.46605986272362
                    ]
                },
                "enacted": 23.264572992014703
            },
            {
                "box": {
                    "district": 6,
                    "y": [
                        19.965323576874866,
                        24.90268730186332,
                        26.430273464541084,
                        32.82507407281372,
                        36.424768986972715
                    ]
                },
                "enacted": 23.264572992014703
            }
        ],
        "mmd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        28.509065139489863,
                        29.12365794106572,
                        30.63754945372839,
                        30.882918103366656,
                        31.69827046328565
                    ]
                },
                "enacted": 29.169717113320797
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        28.014649566222445,
                        28.708094163251523,
                        28.968460325504246,
                        30.5063240741288,
                        31.065977539489705
                    ]
                },
                "enacted": 29.169717113320797
            }
        ]
    },
    "white": {
        "smd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        50.38577912254161,
                        56.342580624770406,
                        61.60942871597879,
                        62.59278901807943,
                        70.06660791159621
                    ]
                },
                "enacted": 67.2843030096283
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        30.104101388637865,
                        57.93778904046153,
                        61.91766604144859,
                        65.78908719224358,
                        69.9659145571523
                    ]
                },
                "enacted": 67.2843030096283
            },
            {
                "box": {
                    "district": 3,
                    "y": [
                        42.49956121525129,
                        51.96275346042444,
                        56.57364580688604,
                        65.9881304298338,
                        67.2843030096283
                    ]
                },
                "enacted": 67.2843030096283
            },
            {
                "box": {
                    "district": 4,
                    "y": [
                        44.85541422818449,
                        54.052299807835965,
                        58.340159605982386,
                        58.56390530331944,
                        67.18539464444993
                    ]
                },
                "enacted": 67.2843030096283
            },
            {
                "box": {
                    "district": 5,
                    "y": [
                        42.12631059534353,
                        56.33976675535788,
                        56.34063094564714,
                        58.04735537571474,
                        67.73828762087459
                    ]
                },
                "enacted": 67.2843030096283
            },
            {
                "box": {
                    "district": 6,
                    "y": [
                        48.21878151346976,
                        56.31268493088657,
                        58.42559980957836,
                        63.73346352947471,
                        66.92929602396515
                    ]
                },
                "enacted": 67.2843030096283
            }
        ],
        "mmd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        54.648333727503505,
                        55.64298963860612,
                        57.85106692966333,
                        59.881451758076906,
                        61.51826322621336
                    ]
                },
                "enacted": 62.015494550441495
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        55.621915674477364,
                        57.15574856052311,
                        59.19264018041094,
                        61.29495021362241,
                        62.487525404784336
                    ]
                },
                "enacted": 62.015494550441495
            }
        ]
    },
    "hispanic": {
        "smd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        3.503640826799534,
                        3.783010606555125,
                        4.382906297437785,
                        5.20164707665038,
                        11.129227284416018
                    ]
                },
                "enacted": 4.60755783596377
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        4.254994765533153,
                        4.454740042362225,
                        4.986134393929088,
                        7.14593405974804,
                        10.70509063590462
                    ]
                },
                "enacted": 4.60755783596377
            },
            {
                "box": {
                    "district": 3,
                    "y": [
                        4.60755783596377,
                        4.778446712826702,
                        7.814613423770874,
                        9.639712031443388,
                        12.166163576254133
                    ]
                },
                "enacted": 4.60755783596377
            },
            {
                "box": {
                    "district": 4,
                    "y": [
                        3.5092441851093668,
                        5.3102181659343515,
                        7.880201631160778,
                        10.018973627851347,
                        12.17922125994805
                    ]
                },
                "enacted": 4.60755783596377
            },
            {
                "box": {
                    "district": 5,
                    "y": [
                        3.529464698925284,
                        3.542168168085325,
                        3.5805766252333107,
                        4.152543809902422,
                        8.289772325418411
                    ]
                },
                "enacted": 4.60755783596377
            },
            {
                "box": {
                    "district": 6,
                    "y": [
                        5.224254890139675,
                        5.68526959987498,
                        6.201627507781753,
                        8.94901713521384,
                        10.879273437290077
                    ]
                },
                "enacted": 4.60755783596377
            }
        ],
        "mmd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        4.86098141240581,
                        5.739239085057153,
                        6.091190032313802,
                        7.117094864043858,
                        8.318084513816961
                    ]
                },
                "enacted": 4.065486358631705
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        4.065486358631705,
                        5.291506897380578,
                        6.317788561413353,
                        6.6457691826825185,
                        7.490263406218347
                    ]
                },
                "enacted": 4.065486358631705
            }
        ]
    },
    "asian": {
        "smd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        0.8772598372186814,
                        1.1391508349050095,
                        1.1659793665726939,
                        2.1945164399322703,
                        3.096902769982934
                    ]
                },
                "enacted": 1.6990510933660077
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        1.114314657523572,
                        1.17846717300144,
                        1.868559970382676,
                        2.2318336955347386,
                        2.8110517741474457
                    ]
                },
                "enacted": 1.6990510933660077
            },
            {
                "box": {
                    "district": 3,
                    "y": [
                        1.5993479708721072,
                        1.6990510933660077,
                        2.2984417151217027,
                        2.570069769509492,
                        3.597730597197913
                    ]
                },
                "enacted": 1.6990510933660077
            },
            {
                "box": {
                    "district": 4,
                    "y": [
                        0.8850884121278552,
                        1.5740249045905332,
                        2.141580522862267,
                        2.691883138396991,
                        3.4266923651309282
                    ]
                },
                "enacted": 1.6990510933660077
            },
            {
                "box": {
                    "district": 5,
                    "y": [
                        0.9808400746627354,
                        1.1939502236848871,
                        1.2159944532264173,
                        1.2262883390916433,
                        3.0701669785056165
                    ]
                },
                "enacted": 1.6990510933660077
            },
            {
                "box": {
                    "district": 6,
                    "y": [
                        1.5267807234856736,
                        1.6662726731349846,
                        2.245716234834602,
                        2.4021710897544986,
                        2.985333159544765
                    ]
                },
                "enacted": 1.6990510933660077
            }
        ],
        "mmd": [
            {
                "box": {
                    "district": 1,
                    "y": [
                        1.6388537640919698,
                        1.8013014298363679,
                        1.8597301295557447,
                        2.129429067835941,
                        2.518012136283039
                    ]
                },
                "enacted": 1.2412596826618914
            },
            {
                "box": {
                    "district": 2,
                    "y": [
                        1.2412596826618914,
                        1.6363581662115072,
                        1.9066577574846408,
                        1.9620398870712952,
                        2.1131383537711947
                    ]
                },
                "enacted": 1.2412596826618914
            }
        ]
    }
};

  const [basis, setBasis] = useState('white');

  const [smdData, setSmdData] = useState([]);

  const [mmdData, setMmdData] = useState([]);

  const [enacted, setEnacted] = useState([]);

  // Prepare data for the box plot
  const smdBoxTraces = smdData.map((districtData, index) => ({
    y: districtData.y, // Values for the box plot
    x: Array(districtData.y.length).fill(districtData.district), // Align with the x-axis
    type: "box",
    name: districtData.district, // Legend entry
    marker: {color: '#636EFA'},
    showlegend: false,
  }));
  const mmdBoxTraces = mmdData.map((districtData, index) => ({
    y: districtData.y, // Values for the box plot
    x: Array(districtData.y.length).fill(districtData.district), // Align with the x-axis
    type: "box",
    name: districtData.district, // Legend entry
    marker: {color: '#636EFA'},
    showlegend: false,
  }));

  // Prepare data for the enacted plan as dots
  const scatterTrace = {
    x: smdData.map((d) => d.district), // X-axis: district names
    y: enacted, // Y-axis: enacted plan values
    mode: "markers", // Use markers for the dots
    name: "Enacted Plan",
    marker: {
      size: 10,
      color: "purple",
      symbol: "circle",
    },
  };

  const selectBasis = (e) => {
    setBasis(e.target.value);
  }

  useEffect(() => {
    const changeBasis = (basis) => {
      const smdData1 = generalData[basis].smd;
      const mmdData1 = generalData[basis].mmd;
      let smdBox = [];
      let enactedPlan = [];
      smdData1.forEach((d) => {
        smdBox.push(d.box);
        enactedPlan.push(d.enacted);
      })
      let mmdBox = [];
      mmdData1.forEach(d => {
        mmdBox.push(d.box);
      })
      setSmdData(smdBox);
      setEnacted(enactedPlan);
      setMmdData(mmdBox);
    }
    changeBasis(basis);
  },[state, basis]);

  return (
    <div className={tab == 'box&whisker' ? 'px-4 py-2' : 'hidden'} >
      <div className="panel">
        <div className='w-48 h-16 flex flex-col text-sm'>
          <span>Select Basis</span>
          <select name="basis" id="basis" className='dropdown-menu w-full h-full' onChange={selectBasis}>
            <option value="white">White Population</option>
            <option value="black">Black Population</option>
            <option value="asian">Asian Population</option>
            <option value="hispanic">Hispanic Population</option>
            <option value="democratic">Democratic Population</option>
            <option value="republican">Republican Population</option>
          </select>
        </div>
      </div>
      <div className='flex mt-2'>
        <div>
          <Plot
            data={[...smdBoxTraces, scatterTrace]}
            layout={{
              title: "SMD",
              width: 450,
              xaxis: {
                title: 'Districts',
              },
              yaxis: { 
                title: 'Percentage (%)', 
                range: [0, 100],
                dtick: 10        
              }, 
              showlegend: true
            }}
            config={{responsive: true}}
          />
        </div>
        <div>
          <Plot
            data={mmdBoxTraces}
            layout={{
              title: 'MMD',
              width: 400,
              xaxis: {
                title: 'Districts',
              },
              yaxis: { 
                title: 'Percentage (%)', 
                range: [0, 100],
                dtick: 10        
              }, 
              showlegend: true
            }}
            config={{responsive: true}}
          />
        </div>
      </div>
    </div>
  )
}

export default BoxNWhisker