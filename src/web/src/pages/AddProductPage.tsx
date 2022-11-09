import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Images from "../components/ProductImages";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { removeUserSession } from "../utils/Storage";
import {
  AddProduct,
  RootState,
  GetAllCategory,
  GetAllMainCategory,
  GetProductBrandActionCreator,
} from "core";
import { useDispatch, useSelector } from "react-redux";

export default function AddProductPage(props: any) {
  const [loading, setLoading] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mainCategoryname, setMainCategoryname] = useState<any>("");
  const [categoryname, setCategoryname] = useState("");
  const [brandname, setBrandname] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [blobImages, setBlobImages] = useState<any>([]);
  const [errors, setErrors] = useState({
    category: "",
    mainCategory: "",
    brand: "",
    productName: "",
    details: "",
    images: "",
    price: "",
    sizes: "",
    pincodes: "",
    returnable: "",
    offer: "",
  });
  const [product, setProduct] = useState({
    category: "select",
    mainCategory: "select",
    brand: "select",
    productName: "",
    details: "",
    images: [],
    price: "",
    sizes: "",
    pincodes: "",
    returnable: true,
    offer: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { data2, error2 } = useSelector(
    (state: RootState) => state.getAllMainCategoryReducer
  );

  let { getdata2, geterror2 } = useSelector(
    (state: RootState) => state.getAllCategoryReducer
  );

  let { productBrand, error3 } = useSelector(
    (state: RootState) => state.getProductBrandReducer
  );

  let { addProduct, error } = useSelector(
    (state: RootState) => state.addProductReducer
  );
  // console.log("main category state data...", data2)
  // console.log("category state data...", getdata2)
  // console.log("brand state data...", productBrand)
  // console.log("Add Product State::", addProduct);

  const validate = {
    category: (category: any) => selectionValidation("Category", category),
    mainCategory: (mainCategory: any) =>
      selectionValidation("Main Category", mainCategory),
    brand: (brand: any) => selectionValidation("Brand", brand),
    productName: (productName: any) =>
      nameValidation("Product Name", productName),
    details: (details: any) => requiredValidation("Details", details),
    images: (images: any) => arrayValidation("Images", images),
    price: (price: any) => requiredValidation("Price", price),
    sizes: (sizes: any) => requiredValidation("Sizes", sizes),
    pincodes: (pincodes: any) => requiredValidation("Pincodes", pincodes),
    returnable: () => {},
    offer: (offer: any) => requiredValidation("Offer", offer),
  };

  const {
    category,
    mainCategory,
    brand,
    productName,
    details,
    images,
    price,
    sizes,
    pincodes,
    offer,
    returnable,
  } = product;

  const allMainCategory = async () => {
    let userToken: any = {
      authToken: localStorage.getItem("token"),
    };
    let allMaincategoryResponse = await dispatch<any>(
      GetAllMainCategory(userToken)
    );
    // console.log("All main category", allMaincategoryResponse.resultData);
    setMainCategories(allMaincategoryResponse.resultData);
    // console.log(mainCategories);
  };
  const allCategory = async () => {
    let userToken: any = {
      authToken: localStorage.getItem("token"),
    };
    let CategoryResponse = await dispatch<any>(GetAllCategory(userToken));
    // console.log("All category", CategoryResponse);
    setCategories(CategoryResponse.resultData);
    // console.log(categories);
  };

  const allProductBrands = async () => {
    let userToken: any = {
      authToken: localStorage.getItem("token"),
    };
    let brandResponse = await dispatch<any>(
      GetProductBrandActionCreator(userToken)
    );
    if (brandResponse.status) {
      setBrands(brandResponse.resultData);
    }
  };

  useEffect(() => {
    allProductBrands();
    allMainCategory();
    allCategory();
  }, []);

  // ********** MAIN CATEGORY CHANGE FUNCTION **********
  const mainCategoryChange = (event: any) => {
    event.preventDefault();
    // console.log("event:", event.target.value);
    setMainCategoryname(event.target.value);
    allMainCategory();
    let value = event.target.value;

    if (value !== "select") {
      let filteredCategories = categories.filter(
        (category: any) => category.mainCategory.mainCategory === value
      );
      setFilteredCategories(filteredCategories);
      // console.log(filteredCategories);

      setFilteredBrands([]);
      setProduct({
        ...product,
        mainCategory: value,
        category: "select",
        brand: "select",
      });
    } else {
      setFilteredCategories([]);
      setFilteredBrands([]);
      setProduct({
        ...product,
        mainCategory: "select",
        category: "select",
        brand: "select",
      });
    }
  };

  // ********** CATEGORY CHANGE FUNCTION **********
  const categoryChange = (event: any) => {
    event.preventDefault();
    let value = event.target.value;
    setCategoryname(value);
    allCategory();
    if (value !== "select") {
      let filteredBrands: any =
        brands === null
          ? "Null"
          : brands.filter(
              (brand: any) => brand.category.Categoryname === value
            );
      // console.log(brands);
      setFilteredBrands(filteredBrands);
      console.log(filteredBrands);
      setProduct({
        ...product,
        category: value,
        brand: "select",
      });
    } else {
      setFilteredBrands([]);
      setProduct({
        ...product,
        category: "select",
        brand: "select",
      });
    }
  };

  // ********** BRAND CHANGE FUNCTION **********
  const brandChange = (event: any) => {
    event.preventDefault();
    // console.log("event:", event.target.value);
    let value = event.target.value;
    setBrandname(value);
    // console.log(brandname);
    allProductBrands();
    setProduct({
      ...product,
      brand: value,
    });
  };

  // ********** HANDLE CHANGE  **********
  const handleChange = (event: any) => {
    const { name, value: newValue, type } = event.target;
        // keep number fields as numbers
        const value = type === "number" ? +newValue : newValue;

        if (name === "images") {
            let images:string[] = [];
            let blobImages :any[] = [];
            for (const i of event.target.files) {
                images.push(i);
                blobImages.push(URL.createObjectURL(i));
            }
            setProduct({ ...product, [name]: images });
            setBlobImages(blobImages);
        } else {
            setProduct({ ...product, [name]: value });
        }
  };

  // ********** HANDLE SUBMIT  **********
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // console.log("handle submit event...", event.target.value);
    console.log("product value after submiting...", product);

    let isValidForm = validateForm();
    if (isValidForm) {
      const formData: any = new FormData();
      for (let i in product) {
        if (i === "images") {
          for (let j of product.images) {
            formData.append("images", j);
          }
        } else if (i === "pincodes" || i === "sizes") {
          let array1 = product[i].split(",");
          for (let j of array1) {
            formData.append(i, j);
          }
        } else {
          formData.append(i, product[i]);
        }
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      try {
        setLoading(true);
        let reqData: any = {
          maincategory: mainCategory,
          category: category,
          brand: brand,
          productname: productName,
          productdetails: details,
          productImage: images,
          productSize: sizes,
          deliverable: pincodes,
          returnable: returnable,
          authToken: localStorage.getItem("token"),
        };
        console.log("reqData...", reqData);
        const res = await dispatch<any>(AddProduct(reqData));
        console.log("res:::", res);
        setProduct({
          category: "select",
          mainCategory: "select",
          brand: "select",
          productName: "",
          details: "",
          images: [],
          price: "",
          sizes: "",
          pincodes: "",
          returnable: true,
          offer: "",
        });
        setBlobImages([]);
        setLoading(false);
        NotificationManager.success("Product added successfully", "", 2000);
        navigate("/dashboard/products/id");
      } catch (errors: any) {
        console.error(errors);
        if (errors.response.status === 403 || errors.response.status === 401) {
          navigate("/");
          removeUserSession();
        } else if (errors.response.status === 400) {
          setErrors({ ...errors, offer: errors.response.data });
        }
        setLoading(false);
      }
    } else {
      NotificationManager.error("Invalid Input", "", 2000);
    }
  };

  // ********** VALIDATION FUNCTIONS **********
  const selectionValidation = (fieldName: any, fieldValue: any) => {
    if (fieldValue === "select") {
      return `${fieldName} is required`;
    }
  };

  const nameValidation = (fieldName: any, fieldValue: any) => {
    if (fieldValue.trim() === "") {
      return `${fieldName} is required`;
    }

    if (fieldValue.trim().length < 3) {
      return `${fieldName} needs to be at least three characters`;
    }
    return null;
  };

  const requiredValidation = (fieldName: any, fieldValue: any) => {
    if (fieldValue === "") {
      return `${fieldName} is required`;
    }
  };

  const arrayValidation = (fieldName: any, fieldValue: any) => {
    if (fieldValue.length === 0) {
      return `${fieldName} is required`;
    }
  };

  // ********** FORM VALIDATION FUNCTION **********
  const validateForm = () => {
    let valid = true;
    let error = null;
    let tempErrors = errors;
    for (const item in product) {
      error = validate[item](product[item]);
      if (error) {
        valid = false;
      }
      tempErrors = { ...tempErrors, [item]: error };
    }
    setErrors({ ...tempErrors });
    return valid;
  };
  // ********** END OF VALIDATION FUNCTIONS **********

  return (
    <>
      <Navbar />

      <div>
        <Link to="/" className="text-capitalize back-btn">
          <MdKeyboardBackspace className="back-btn-arrow" />
        </Link>
      </div>

      <div className="gradient-container pb-5">
        <div className="container py-3 add-product-form-card-container">
          <div className="card add-product-card">
            <div className="card-header add-product-card-header">
              PRODUCT DETAILS
            </div>
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                {/* ********** input ********** */}
                <div className="row">
                  <div className="col-md-3">
                    <label
                      className="add-product-form-control-label"
                      htmlFor="mainCategory"
                    >
                      Select Maincategory
                    </label>
                  </div>
                  <div className="col-md-9 add-product-form-control-container">
                    <select
                      className="form-control add-product-form-control"
                      name="mainCategory"
                      id="mainCategory"
                      value={mainCategory}
                      onChange={mainCategoryChange}
                    >
                      <option value="select"> Select Maincategory</option>
                      {mainCategories.map((mainCategory: any, index) => {
                        return (
                          <option
                            value={mainCategory.mainCategory}
                            className="text-capitalize"
                            key={index}
                          >
                            {mainCategory.mainCategory}
                          </option>
                        );
                      })}
                    </select>
                    <p className="text-danger mb-0 font-weight-bold">
                      {errors.mainCategory}
                    </p>
                  </div>
                </div>
                {/* ********** end of input ********** */}

                {/* ********** input ********** */}
                <div className="row mt-4">
                  <div className="col-md-3">
                    <label
                      className="add-product-form-control-label"
                      htmlFor="category"
                    >
                      Select Category
                    </label>
                  </div>
                  <div className="col-md-9 add-product-form-control-container">
                    <select
                      className="form-control add-product-form-control"
                      name="category"
                      id="category"
                      value={category}
                      onChange={categoryChange}
                    >
                      <option value="select"> Select Category</option>
                      {filteredCategories.map((category: any, index) => {
                        return (
                          <option
                            value={category.Categoryname}
                            className="text-capitalize"
                            key={index}
                          >
                            {category.Categoryname}
                          </option>
                        );
                      })}
                    </select>
                    <p className="text-danger mb-0 font-weight-bold">
                      {errors.category}
                    </p>
                  </div>
                </div>
                {/* ********** end of input ********** */}

                {/* ********** input ********** */}
                <div className="row mt-4">
                  <div className="col-md-3">
                    <label
                      className="add-product-form-control-label"
                      htmlFor="brand"
                    >
                      Select Brand
                    </label>
                  </div>
                  <div className="col-md-9 add-product-form-control-container">
                    <select
                      className="form-control add-product-form-control"
                      name="brand"
                      id="brand"
                      value={brand}
                      onChange={brandChange}
                    >
                      <option value="select"> Select Brand</option>
                      {filteredBrands.map((brand: any, index) => {
                        return (
                          <option
                            value={brand.brandname}
                            className="text-capitalize"
                            // key={index}
                          >
                            {brand.brandname}
                          </option>
                        );
                      })}
                    </select>
                    <p className="text-danger mb-0 font-weight-bold">
                      {errors.brand}
                    </p>
                  </div>
                </div>
                {/* ********** end of input ********** */}

                {/* ********** input ********** */}
                <div className="row mt-4">
                  <div className="col-md-3">
                    <label
                      className="add-product-form-control-label"
                      htmlFor="productName"
                    >
                      Product Name
                    </label>
                  </div>
                  <div className="col-md-9 add-product-form-control-container">
                    <input
                      type="text"
                      className="form-control add-product-form-control"
                      name="productName"
                      id="productName"
                      value={productName}
                      onChange={handleChange}
                      placeholder="Product Name"
                    />
                    <p className="text-danger mb-0 font-weight-bold">
                      {errors.productName}
                    </p>
                  </div>
                </div>
                {/* ********** end of input ********** */}

                {/* ********** input ********** */}
                <div className="row mt-4">
                  <div className="col-md-3">
                    <label
                      className="add-product-form-control-label"
                      htmlFor="details"
                    >
                      Product Details
                    </label>
                  </div>
                  <div className="col-md-9 add-product-form-control-container">
                    <textarea
                      className="form-control add-product-text-area"
                      name="details"
                      id="details"
                      rows={4}
                      value={details}
                      onChange={handleChange}
                      placeholder="Product Details"
                    />
                    <p className="text-danger mb-0 font-weight-bold">
                      {errors.details}
                    </p>
                  </div>
                </div>
                {/* ********** end of input ********** */}

                {/* ********** input ********** */}
                <div className="row mt-4">
                  <div className="col-md-3">
                    <label
                      className="add-product-form-control-label"
                      htmlFor="images"
                    >
                      Product Images
                    </label>
                  </div>
                  <div className="col-md-9 add-product-form-control-container">
                    <input
                      type="file"
                      className="form-group mt-2"
                      name="images"
                      id="images"
                      onChange={handleChange}
                      multiple
                    />
                    <p className="text-danger mb-0 font-weight-bold">
                      {errors.images}
                    </p>
                  </div>
                </div>
                {/* ********** end of input ********** */}

                {/* ********** IMAGES ********** */}
                <div className="container">
                  <div className="row">
                    {blobImages.map((image, index) => {
                      return <Images image={image} key={index} />;
                    })}
                  </div>
                </div>
                {/* ********** end of IMAGES ********** */}

                {/* ********** input ********** */}
                <div className="row mt-4">
                  <div className="col-md-3">
                    <label
                      className="add-product-form-control-label"
                      htmlFor="price"
                    >
                      Product Price
                    </label>
                  </div>
                  <div className="col-md-9 add-product-form-control-container">
                    <input
                      type="number"
                      className="form-control add-product-form-control"
                      name="price"
                      id="price"
                      value={price}
                      onChange={handleChange}
                      placeholder="Product Price"
                    />
                    <p className="text-danger mb-0 font-weight-bold">
                      {errors.price}
                    </p>
                  </div>
                </div>
                {/* ********** end of input ********** */}

                {/* ********** input ********** */}
                <div className="row mt-4">
                  <div className="col-md-3">
                    <label
                      className="add-product-form-control-label"
                      htmlFor="sizes"
                    >
                      Product Sizes
                    </label>
                  </div>
                  <div className="col-md-9 add-product-form-control-container">
                    <input
                      type="text"
                      className="form-control add-product-form-control"
                      name="sizes"
                      id="sizes"
                      value={sizes}
                      onChange={handleChange}
                      placeholder="Sizes must be comma seperated list"
                    />
                    <p className="text-danger mb-0 font-weight-bold">
                      {errors.sizes}
                    </p>
                  </div>
                </div>
                {/* ********** end of input ********** */}

                {/* ********** input ********** */}
                <div className="row mt-4">
                  <div className="col-md-3">
                    <label
                      className="add-product-form-control-label"
                      htmlFor="pincodes"
                    >
                      Deliverable Pincodes
                    </label>
                  </div>
                  <div className="col-md-9 add-product-form-control-container">
                    <textarea
                      className="form-control add-product-text-area"
                      name="pincodes"
                      id="pincodes"
                      rows={4}
                      value={pincodes}
                      onChange={handleChange}
                      placeholder="Pincodes must be comma seperated list"
                    ></textarea>
                    <p className="text-danger mb-0 font-weight-bold">
                      {errors.pincodes}
                    </p>
                  </div>
                </div>
                {/* ********** end of input ********** */}

                {/* ********** input ********** */}
                <div className="row mt-4">
                  <div className="col-md-3">
                    <label
                      className="add-product-form-control-label"
                      htmlFor="returnable"
                    >
                      Returnable
                    </label>
                  </div>
                  <div className="col-md-9 add-product-form-control-container">
                    <div className="form-check form-check-inline mt-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="returnable"
                        value="true"
                        onChange={handleChange}
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="true radio">
                        True
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="returnable"
                        value="false"
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="false radio">
                        False
                      </label>
                    </div>
                  </div>
                </div>
                {/* ********** end of input ********** */}

                {/* ********** input ********** */}
                <div className="row mt-4">
                  <div className="col-md-3">
                    <label
                      className="add-product-form-control-label"
                      htmlFor="offer"
                    >
                      Offer
                    </label>
                  </div>
                  <div className="col-md-9 add-product-form-control-container">
                    <input
                      type="number"
                      className="form-control add-product-form-control"
                      name="offer"
                      id="offer"
                      value={offer}
                      onChange={handleChange}
                      placeholder="Offer"
                    />
                    <p className="text-danger mb-0 font-weight-bold">
                      {errors.offer}
                    </p>
                  </div>
                </div>
                {/* ********** end of input ********** */}

                {/* ********** input ********** */}
                <div className="row mt-5">
                  <div className="col-md-3"></div>
                  <div className="col-md-9 form-control-container">
                    <input
                      className="btn btn-pink btn-block w-50 mx-auto"
                      type="submit"
                      value="Add Product"
                    />
                  </div>
                </div>
                {/* ********** end of input ********** */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
