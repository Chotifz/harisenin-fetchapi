import { useState } from "react";

const OnSearch = ({ post, confirmDelete }) => {
  const renderProductsPost = () => {
    return post.map((data) => {
      return (
        <tr className="hover" key={data.id}>
          <td>{data.id}</td>
          <td>{data.title}</td>
          <td>{data.body}</td>
          <td>{data.userId}</td>
          <td>
            <button
            // onClick={() => onEdit(data.id)}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="bg-pink-900"
              onClick={() => confirmDelete(data.id)}
              // colorScheme="orange"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  console.log(post);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="">
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>Body</th>
              <th>User ID</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {renderProductsPost()}
            {/* {productsIsLoading ? "LOADING . . . " : ""} */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OnSearch;
