import React from "react";

const TeamSearch = ({ searchObj, setSearchObj, setTeamSearch, teamSearch }) => {
  const onChange = (e) => {
    const search = e.target.value.toLowerCase();
    setTeamSearch(search);

    if (search.length > 0) {
      setSearchObj({ ...searchObj, team_filter: search });
    } else {
      const newSearchObj = Object.assign({}, searchObj);
      delete newSearchObj.team_filter;
      setSearchObj(newSearchObj);
    }
  };

  return (
    <>
      <label for="team-search">Team name:</label>
      <input
        type="text"
        name="team-search"
        value={teamSearch}
        className="project-search-input"
        onChange={onChange}
        autoComplete="off"
      />
    </>
  );
};

export default TeamSearch;
