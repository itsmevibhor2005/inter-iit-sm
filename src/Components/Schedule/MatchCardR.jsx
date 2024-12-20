import React from "react";
import { Link } from "react-router-dom";
import "../../css/MatchCardR.css";
import { SiGooglemaps, SiYoutube } from "react-icons/si";
import { HiClock, HiCalendarDays } from "react-icons/hi2";
import { SportName, TeamLogo } from "./utils/SportCardUtils";
import { BasketScore, CricketScore, HockeyScore, LawnTennisScore, TableTennisScore, VolleyballScore } from "./utils/ScoreUI";

function MatchCardR({ match }) {
  let d = new Date(match.date);
  let date = d.toDateString().split(" ");
console.log(match)
  return (
    <>
      <div className={"match-card " + match.status}>
        <div className="card-info">
          <SportName match={match}/>
          <TeamLogo team={match.team1} />

          <div className="match-info">
            <div className="vs">
            {match.status != "upcoming" ? (
              <>
                {match.sport == "cricket" && <CricketScore match={match} />}
                {match.sport == "hockey" && <HockeyScore match={match} />}
                {match.sport == "basketball" && <BasketScore match={match} />}
                {match.sport == "lawn tennis" && <LawnTennisScore match={match} />}
                {match.sport == "volleyball" && <LawnTennisScore match={match} />}
                {match.sport == "table tennis" && <LawnTennisScore match={match} />}
              </>
              ) : <div>V/S</div>}
              </div>

            <div className="match-time-format">
              {match.status != "live" && (
                <>
                  <span>
                    <HiCalendarDays style={{ display: "inline-block" }} />
                    &nbsp; {date[2] + " " + date[1]}&nbsp;
                  </span>
                  &nbsp;
                </>
              )}
              <div className="match-details">
                {match.status == "live" && (
                  <Link
                    target="_blank"
                    to={
                      match.liveStreamUrl ||
                      "https://youtu.be/7d186s14Jg4?si=3L65E1MjTroqv1yJ"
                    }
                    className="extra-button livebtn"
                  >
                    <SiYoutube
                      style={{ display: "inline-block", marginRight: "2px" }}
                    />{" "}
                    Live
                  </Link>
                )}
                {match.status != "completed" ? (
                  <Link
                    target="_blank"
                    to={
                      match.locationUrl ||
                      "https://maps.app.goo.gl/Y438GM3RJka7UE5MA"
                    }
                    className="extra-button location"
                  >
                    <SiGooglemaps
                      style={{ display: "inline-block", marginRight: "2px" }}
                    />
                    {match.venue}
                  </Link>
                ) : (
                  <span>
                    &nbsp;&nbsp;
                    <SiGooglemaps
                      style={{ display: "inline-block", marginRight: "2px" }}
                    />{" "}
                    {match.venue}&nbsp;&nbsp;
                  </span>
                )}
              </div>
              {match.status != "live" && (
                <>
                  &nbsp;
                  <span>
                    <HiClock style={{ display: "inline-block" }} /> &nbsp;
                    {match.time.split(":").splice(0, 2).join(":")}&nbsp;
                  </span>
                </>
              )}
            </div>
          </div>
          <TeamLogo team={match.team2} />
        </div>

        {match.status != "upcoming" && (
          <div className={"tag " + (match.status == "completed" && "disabled")}>
            {match.status == "live" && "Live"}
            {match.status == "completed" && "Ended"}
          </div>
        )}
      </div>
    </>
  );
}

export default MatchCardR;
