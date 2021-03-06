import React from "react";

const AddEditForm = ({ setPost, post, setFile }) => {
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">Image</label>
        <input
          type="file"
          className="form-control"
          id="file"
          required
          onChange={selectFile}
          name="file"
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={post.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={post.description}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default AddEditForm;
