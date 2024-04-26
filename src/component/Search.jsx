import { useState } from "react";

const Search = (props) => {
  const [search, setSearch] = useState(null);

  const amountPost = props.totalPosts;
  const onSearchChanged = () => {
    props.onSearchChange(search);
  };

  return (
    <>
      <div className="search mb-3">
        Search Something :
        <input
          className=""
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ padding: "9px", marginInline: "8px", borderRadius: "6px" }}
          type="text"
          placeholder="WaY Looking For . . ."
        />
        <button onClick={onSearchChanged}>Search</button>
      </div>
      {amountPost >= 1 ? (
        <small>
          Ditemukan {props.totalPosts} data dengan kata {search}{" "}
        </small>
      ) : (
        ""
      )}
    </>
  );
};

export default Search;
