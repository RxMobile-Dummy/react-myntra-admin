import React from "react";

export default function BrandRow({
  brand,
  index,
  updateBrand,
  deleteBrand,
}: any) {
//   console.log("brand prop:::", brand);
  return (
    <tr>
      <td>{index + 1}</td>
      <td className="text-capitalize">{brand.mainCategory.mainCategory}</td>
      <td className="text-capitalize">{brand.category.Categoryname} </td>
      <td className="text-capitalize">{brand.brandname}</td>
      <td>
        {/* {brand.category.categoryName} */}
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => updateBrand({ brand })}
        >
          Update
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => deleteBrand(brand._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
