import Search from "./component/Search";
import { Skeleton } from "./component/Skeleton";
import { useState, useEffect } from "react";

import "./App.css";
import { useFetchData } from "./api/features/useFetchData";
import Navbarr from "./component/Navbar";
import { useDeleteData } from "./api/features/useDeleteData";
import OnSearch from "./component/OnSearch";

function App() {
  const [totalPost, setTotalPost] = useState(0);
  const [post, setPost] = useState([]);

  const { data, isLoading, isError, refetch: refetchData } = useFetchData();
  isError && console.log(Error);

  const { mutate: deleteData } = useDeleteData({
    onSuccess: () => {
      refetchData();
    },
  });

  const onSearchChange = (value) => {
    const filteredPosts = data.data.filter((item) =>
      item.title.includes(value)
    );

    setTotalPost(filteredPosts.length);
    setPost(filteredPosts);
    console.log(filteredPosts);
  };

  const confirmDelete = (dataId) => {
    const shouldDelete = confirm("Are You Sure To Delete This Data");
    if (shouldDelete) {
      deleteData(dataId);
    }
  };
  const renderProducts = () => {
    return data?.data.map((data) => {
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

  if (isLoading) return <Skeleton />;
  return (
    <>
      <Navbarr />
      <Search onSearchChange={onSearchChange} totalPosts={totalPost} />
      {!post.length ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="">
              <tr className="text-white">
                <th>ID</th>
                <th>TITLE</th>
                <th>POST / ARTIKEL</th>
                <th>USER ID</th>
                <th colSpan={2}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {renderProducts()}
              {/* {productsIsLoading ? "LOADING . . . " : ""} */}
            </tbody>
          </table>
        </div>
      ) : (
        <OnSearch post={post} confirmDelete={confirmDelete} />
      )}
    </>
  );
}

export default App;
