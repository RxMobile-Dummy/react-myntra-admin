import React from "react";

export default function MainCategoryRow({
  mainCategory,
  index,
  id,
  deleteCategory,
  updateCategory,
}: any) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td className="text-capitalize">{mainCategory}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            updateCategory(id, mainCategory)
          }
        >
          Update
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => deleteCategory(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
