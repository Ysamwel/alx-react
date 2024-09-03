import React from "react";
import PropTypes from "prop-types";

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  // Define the styles as constants
  const rowStyle = { backgroundColor: "#f5f5f5ab" };
  const headerStyle = { backgroundColor: "#deb5b545" };

  return (
    <tr style={isHeader ? headerStyle : rowStyle}>
      {isHeader ? (
        textSecondCell ? (
          <>
            <th>{textFirstCell}</th>
            <th>{textSecondCell}</th>
          </>
        ) : (
          <th colSpan="2">{textFirstCell}</th>
        )
      ) : (
        <>
          <td>{textFirstCell}</td>
          <td>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.string,
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

export default CourseListRow;
