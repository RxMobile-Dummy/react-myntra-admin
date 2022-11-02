import React from "react";

export default function CategoryRow({
  category,
  index,
  id,
  deleteCategory,
  updateCategory,
  openCategoryToBagModal,
  deleteCategoryToBag,
}: any) {
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td className="text-capitalize">{category.mainCategory.mainCategory}</td>
      <td className="text-capitalize">{category.Categoryname}</td>
      <td>
        {category.inCategoriesToBag === false ? (
          <button
            type="button"
            className="btn btn-sm btn-success"
            style={{ width: "80px" }}
            onClick={() =>
              openCategoryToBagModal(category.Categoryname, category._id)
            }
          >
            Add
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-sm btn-danger"
            style={{ width: "80px" }}
            onClick={() => deleteCategoryToBag(category._id)}
          >
            Remove
          </button>
        )}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => updateCategory({ category })}
        >
          Update
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => deleteCategory(category._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
