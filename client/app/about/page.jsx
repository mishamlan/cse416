import React from 'react'

const about = () => {
  return (
    <div className="panel h-full">
      <h2 className="panel-title mb-2">References</h2>
      <div className="w-full mt-2 shadow-md sm:rounded-lg">
          <table className="w-full text-xs text-left rtl:text-right text-gray-500">
            <thead className="text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-2">Data</th>
                <th scope="col" className="px-6 py-2">Source</th>
              </tr>
            </thead>
            <tbody>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">2021 Nevada Final Approved Congressional Districts</th>
                  <td className="px-6 py-2">https://redistrictingdatahub.org/dataset/2021-nevada-congressional-districts/</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Nevada 2022 General Election Precinct Boundaries and Election Results</th>
                  <td className="px-6 py-2">https://redistrictingdatahub.org/dataset/nevada-2022-general-election-precinct-boundaries-and-election-results/</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Nevada Block Group CVAP Data (2022)</th>
                  <td className="px-6 py-2">https://redistrictingdatahub.org/dataset/nevada-block-group-cvap-data-2022/</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Nevada 2022 Select Race Data from the American Community Survey (2018-2022) at the Block Group level</th>
                  <td className="px-6 py-2">https://redistrictingdatahub.org/dataset/nevada-2022-select-race-data-from-the-american-community-survey-20182022-at-the-block-group-level/</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Nevada 2022 Select Income Data from the American Community Survey (2018-2022) at the Block Group level</th>
                  <td className="px-6 py-2">https://redistrictingdatahub.org/dataset/nevada-2022-select-income-data-from-the-american-community-survey-20182022-at-the-block-group-level/</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Louisiana 2022 General Election Precinct-Level Results and Boundaries</th>
                  <td className="px-6 py-2">https://redistrictingdatahub.org/dataset/louisiana-2022-general-election-precinct-level-results/</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Louisiana 118th Congressional District CVAP Data (2022)</th>
                  <td className="px-6 py-2">https://redistrictingdatahub.org/dataset/louisiana-118th-congressional-district-cvap-data-2022/</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Louisiana block PL 94-171 2020 (by table)</th>
                  <td className="px-6 py-2">https://redistrictingdatahub.org/dataset/louisiana-block-pl-94171-2020-by-table/</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">2022 United States House of Representatives elections in Louisiana</th>
                  <td className="px-6 py-2">https://en.wikipedia.org/wiki/2022_United_States_House_of_Representatives_elections_in_Louisiana</td>
                </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default about