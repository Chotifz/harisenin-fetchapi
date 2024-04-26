import { useState } from "react";
import { Formik, useFormik } from "formik";
import { useFetchData } from "./api/features/useFetchData";
import { useCreateData } from "./api/features/useCreateData";
import { useDeleteData } from "./api/features/useDeleteData";
import { useEditData } from "./api/features/useEditData";

import Navbarr from "./component/Navbar";
import Search from "./component/Search";
import { Skeleton } from "./component/Skeleton";
import OnSearch from "./component/OnSearch";

function App() {
  const [totalPost, setTotalPost] = useState(0);
  const [post, setPost] = useState([]);

  const { data, isLoading, isError, refetch: refetchData } = useFetchData();
  if (isError) {
    alert("Database Not Responding");
  }
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      userId: 0,
      id: 0,
    },
    onSubmit: () => {
      const { title, body, userId, id } = formik.values;
      console.log(formik.values);

      if (id) {
        // Melakukaan PATCH data /posts
        editData({
          id,
          title,
          body,
          userId: parseInt(userId),
        });
      } else {
        //Melakukan POST data /posts
        createData({
          title,
          body,
          userId: parseInt(userId),
        });

        formik.setFieldValue("title", "");
        formik.setFieldValue("body", "");
        formik.setFieldValue("userId", 0);
        formik.setFieldValue("id", 0);
        alert("Add Sukses");
      }
    },
  });

  const { mutate: createData, isLoading: createProductsIsLoading } =
    useCreateData({
      onSuccess: () => {
        refetchData();
      },
    });

  const { mutate: deleteData } = useDeleteData({
    onSuccess: () => {
      refetchData();
    },
  });

  const { mutate: editData } = useEditData({
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

  const handleFormInput = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const onEdit = (data) => {
    formik.setFieldValue("id", data.id);
    formik.setFieldValue("title", data.title);
    formik.setFieldValue("body", data.body);
    formik.setFieldValue("userId", data.userId);
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
            <button onClick={() => onEdit(data)}>Edit</button>
          </td>
          <td>
            <button
              className="bg-pink-900"
              onClick={() => confirmDelete(data.id)}
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
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 p-3 w-52"
      >
        <div className="flex flex-col ">
          <label htmlFor="Title">ID: </label>
          <input
            onChange={handleFormInput}
            name="id"
            value={formik.values.id}
            type="text"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="Title">Title: </label>
          <input
            onChange={handleFormInput}
            name="title"
            value={formik.values.title}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="Title">Body: </label>
          <input
            onChange={handleFormInput}
            name="body"
            value={formik.values.body}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="Title">UserId: </label>
          <input
            onChange={handleFormInput}
            name="userId"
            value={formik.values.userId}
            type="text"
          />
        </div>
        <div>
          <button type="submit" className="p-1.5 bg-slate-800">
            Sumbit Posts
          </button>
        </div>
      </form>
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
            <tbody>{renderProducts()}</tbody>
          </table>
        </div>
      ) : (
        <OnSearch post={post} confirmDelete={confirmDelete} />
      )}
    </>
  );
}

export default App;
