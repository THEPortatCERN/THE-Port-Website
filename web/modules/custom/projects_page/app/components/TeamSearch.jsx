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
    <div className='project-search-input'>
      <label htmlFor="team-search">Team name:</label>
      <input
        type="text"
        name="team-search"
        value={teamSearch}
        placeholder="e.g. 42"
        className="project-search-input-inner"
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};

export default TeamSearch;
