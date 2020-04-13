import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import slugify from "react-slugify";

const Overview = ({
  data: { loading, error, blueprints },
  phases,
  callbackFromParent,
  toggleView
}) => {
  if (error) return <h1>Error fetching data!</h1>;
  if (!loading) {
    callbackFromParent(blueprints[0].timelineOption);

    return (
      <div id="overview" className="overview">
        <h1 className="bluePrintTitle">{blueprints[0].overviewTitle}</h1>
        <p className="bluePrintDescription">
          {blueprints[0].overviewDescription}
        </p>
        <div className="phasesOverviewWrap">
          {phases.map(phase => (
            <a
              className="phasesOverviewItem"
              key={phase.phaseTitle}
              href={"#" + slugify(phase.phaseTitle)}
              onClick={toggleView}
            >
              <h2>{phase.phaseTitle}</h2>
              <h3>Purpose</h3>
              <p>{phase.purpose}</p>
              <h3>Objectives</h3>
              <ul>
                {phase.objectives.map(objective => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return <h2>Loading data...</h2>;
};

export const blueprints = gql`
  query blueprints {
    blueprints {
      overviewTitle
      overviewDescription
      timelineOption
    }
  }
`;

// export default Navigation
export default graphql(blueprints)(Overview);
