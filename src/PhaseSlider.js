import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Swiper from "react-id-swiper";
import slugify from "react-slugify";
import { HashLink as Link } from "react-router-hash-link";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import Overview from "./Overview";
import Checklist from "./Checklist";

const PhaseSlider = ({ data: { loading, error, blueprintPhases } }) => {
  const [timeFrameOptions, setTimeFrameOption] = useState([]);
  const [detailview, setDetailview] = useState("false");
  const [swiper, updateSwiper] = useState(null);
  const [currentSlide, updateCurrentSlide] = useState(0);

  useEffect(() => {});

  // const updateSwiper = (swiper) => {
  //   console.log(swiper);
  // }

  const getTimeFrames = timeFrames => {
    setTimeFrameOption(timeFrames);
  };

  const moveSlidesInView = e => {
    updateCurrentView(e);
    setDetailview("true");
  };

  const toOverview = e => {
    updateCurrentView(e);
    setDetailview("false");
  };

  const updateCurrentView = e => {
    console.log();
  };

  if (error) return <h1>Error fetching data! </h1>;
  if (!loading) {
    const params = {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 400,
      centeredSlides: true,
      shouldSwiperUpdate: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      hashNavigation: {
        watchState: true
      },
      on: {
        slideChangeTransitionEnd: () => {
          updateCurrentView();
        }
      }
    };

    return (
      <div className="appContent" detailview={detailview}>
        <div className="overviewWrap">
          <Overview
            phases={blueprintPhases}
            callbackFromParent={getTimeFrames}
            toggleView={moveSlidesInView}
          />
        </div>
        <div className="slides-outer">
          <div className="mainNavigation">
            <Router>
              <ul>
                <li>
                  <Link
                    className="phaseNavigation"
                    onClick={toOverview}
                    to="/#overview"
                  >
                    Overview
                  </Link>
                </li>
                {blueprintPhases.map(phase => (
                  <li
                    className="phaseNavigationItem"
                    key={phase.phaseTitle}
                    phaseid={phase.id}
                  >
                    <a
                      className="phaseNavigation"
                      onClick={moveSlidesInView}
                      href={"#" + slugify(phase.phaseTitle)}
                    >
                      {phase.phaseTitle}
                    </a>
                  </li>
                ))}
              </ul>
            </Router>
          </div>
          <Swiper {...params} getSwiper={updateSwiper}>
            {blueprintPhases.map(phase => (
              <div
                key={phase.id}
                phaseid={phase.id}
                data-hash={slugify(phase.phaseTitle)}
              >
                <div className="phaseTitle">
                  <h2>{phase.phaseTitle}</h2>
                </div>
                <div className="phaseContentWrap">
                  <div className="phaseObjectives">
                    <h3>Overview</h3>
                    <ul>
                      {phase.objectives.map(objective => (
                        <li key={objective}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="phaseDataWrap">
                    <Checklist
                      phase={phase.phaseTitle}
                      tasks={phase.measureOfSuccessDefaults}
                    />
                    <div className="phaseOutcomes">
                      <h3>Anticipated Outcomes</h3>
                      <ul>
                        {phase.anticipatedOutcomes.map(anticipatedOutcome => (
                          <li key={anticipatedOutcome}>{anticipatedOutcome}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }

  return <h2>Loading blueprint data...</h2>;
};

export const blueprintPhases = gql`
  query blueprintPhases {
    blueprintPhases {
      phaseTitle
      purpose
      objectives
      anticipatedOutcomes
      actualOutcomes
      measureOfSuccessDefaults
      id
    }
  }
`;

// export default Navigation
export default graphql(blueprintPhases)(PhaseSlider);
