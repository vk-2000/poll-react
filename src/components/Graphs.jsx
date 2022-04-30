import React, { Component } from 'react';
import "../components/style/graphs.css"

import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie, VictoryTheme } from 'victory';

function Graphs(props) {
    return (
        <div className='graphContainer'>
            <div style={{touchAction: "auto"}} className="w-100 d-flex flex-column flex-sm-row">
                <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                    <VictoryAxis  tickValues={props.chartData.map((data) => data.index)}/>
                    <VictoryAxis dependentAxis />
                    <VictoryBar
                        theme={VictoryTheme.material}
                        x="index"
                        y="votes"
                        data={props.chartData}
                        labels={props.chartData.map((data) => data.votes)}
                    />
                </VictoryChart>
                <hr />
                <VictoryPie theme={VictoryTheme.material} data={props.chartData} x="index" y="votes"></VictoryPie>
            </div>
        </div>
    );
}

export default Graphs;