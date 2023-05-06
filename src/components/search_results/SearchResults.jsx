import "./SearchResults.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import constants from "../../common/constants";

export const SearchResults = ({
  input,
  tags,
  categories,
  width = "52.8% ",
}) => {
  const navigate = useNavigate();
  tags = tags.slice(0, 4);
  categories = categories.slice(0, 4);

  const StyledSuggestion = ({ suggestion, typedInput }) => {
    if (!suggestion.toLowerCase().startsWith(typedInput)) {
      return <span>{suggestion}</span>;
    }
    const typedInputLength = typedInput.length;
    return (
      <span>
        <span style={{ fontWeight: "700" }}>
          {suggestion.substring(0, typedInputLength)}
        </span>
        {suggestion.substring(typedInputLength)}
      </span>
    );
  };

  return (
    <div className="results-list" style={{ width: width }}>
      {tags.map((tag, index) => {
        return (
          <div
            className="search-result"
            key={index}
            onClick={() => navigate(`${constants.ROUTES.GIGS}?search=${tag}`)}
          >
            <StyledSuggestion suggestion={tag} typedInput={input} />
          </div>
        );
      })}
      {categories.map(({ category, name }, index) => {
        return (
          <div
            className="search-result"
            key={index}
            onClick={() => navigate(`${constants.ROUTES.GIGS}?cat=${category}`)}
          >
            <span> ↳ in </span>
            <StyledSuggestion suggestion={name} typedInput={input} />
          </div>
        );
      })}
    </div>
  );
};
